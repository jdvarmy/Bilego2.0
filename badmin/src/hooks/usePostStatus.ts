import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PostStatus } from '../typings/enum';

export function usePostStatus() {
  const location = useLocation();
  const { state, pathname } = location;
  const [status, setStatus] = useState<PostStatus.create | PostStatus.edit>(PostStatus.create);

  useEffect(() => {
    // @ts-ignore
    if (state?.edit || pathname.includes(PostStatus.edit)) {
      setStatus(PostStatus.edit);
    }
  }, [location]);

  return { status, uid: status === PostStatus.edit ? pathname.split('/').at(-1) : undefined };
}
