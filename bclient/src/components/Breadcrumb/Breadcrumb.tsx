import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { citiesI18n } from '../Header/City/City';

type BreadcrumbType = {
  breadcrumb: string;
  href: string;
};

const i18n = {
  events: 'события',
  items: 'площадки',
  ...citiesI18n,
};

const Breadcrumb = ({ title }: { title?: string }) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbType[] | null>(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      if (title) {
        linkPath.splice(linkPath.length - 1, 1, title);
      }

      const pathArray = linkPath.map((path, i) => ({
        breadcrumb: Object.keys(i18n).includes(path) ? i18n[path] : path,
        href: '/' + linkPath.slice(0, i + 1).join('/'),
      }));

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav aria-label='breadcrumbs'>
      <ol className='flex text-chrome text-xs'>
        {breadcrumbs.length >= 1 &&
          breadcrumbs.map((breadcrumb, index) => {
            if (!breadcrumb || breadcrumb.breadcrumb.length === 0) {
              return;
            }
            return (
              <li
                className='mr-3 last:mr-0 after:content-[">"] after:ml-3 last:after:content-[""]'
                data-component='Breadcrumbs'
                key={breadcrumb.href}
              >
                {breadcrumbs.length - 1 === index ? (
                  convertBreadcrumb(breadcrumb.breadcrumb)
                ) : (
                  <Link href={breadcrumb.href}>{convertBreadcrumb(breadcrumb.breadcrumb)}</Link>
                )}
              </li>
            );
          })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

function convertBreadcrumb(title: string): ReactNode {
  let transformedTitle = title.split(/[?#]/)[0];

  return decodeURI(transformedTitle);
}
