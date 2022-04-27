import React, { useEffect } from 'react';
import { RootStoreType, ThunkDispatchType, wrapper } from '../src/store';
import Layout from '../src/layout/Layout';
import '../public/output.css';
import { Cities } from '../src/types/enums';
import App, { AppInitialProps } from 'next/app';
import { setCity } from '../src/store/global/globalSlice';
import { useTypeSelector } from '../src/hooks/useTypeSelector';
import { globalSelector } from '../src/store/selectors';
import { localStorageCityKey } from '../src/types/types';
import { useDispatch } from 'react-redux';
import { asyncGetTaxonomy } from '../src/store/taxonomy/taxonomyThunk';
import { Store } from 'redux';

const WrappedContent = ({ children }: { children?: any }) => {
  const dispatch = useDispatch();
  const { city } = useTypeSelector(globalSelector);

  useEffect(() => {
    if (localStorage) {
      if (!city) {
        const storageCity: Cities | null = localStorage.getItem(localStorageCityKey) as Cities | null;

        if (storageCity) {
          dispatch(setCity(storageCity));
        } else {
          localStorage.setItem(localStorageCityKey, Cities.moscow);
          dispatch(setCity(Cities.moscow));
        }
      } else {
        localStorage.setItem(localStorageCityKey, city);
      }
    }
  }, [city, dispatch]);

  console.log(`Это ${city} детка`);

  return <>{children}</>;
};

class WrappedApp extends App<AppInitialProps> {
  public static getInitialProps = wrapper.getInitialAppProps((store) => async ({ Component, ctx }) => {
    const dispatch = store.dispatch as ThunkDispatchType;
    const {
      taxonomy,
      global: { city },
    } = store.getState();

    if (ctx?.query?.city && !city) {
      dispatch(setCity(ctx.query.city as Cities));
    }

    if (!taxonomy.category.length) {
      await asyncGetTaxonomy(dispatch);
    }

    return {
      pageProps: {
        // Call page-level getInitialProps
        // DON'T FORGET TO PROVIDE STORE TO PAGE
        ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {}),
      },
    };
  });

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <WrappedContent>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WrappedContent>
    );
  }
}

export default wrapper.withRedux(WrappedApp);

export const getAppPropCity = async (store: Store<RootStoreType>, context): Promise<Cities | null | undefined> => {
  const dispatch = store.dispatch as ThunkDispatchType;
  const {
    global: { city },
  } = store.getState();

  if (context?.params?.city && !city) {
    dispatch(setCity(context.params.city as Cities));
    return context.params.city;
  }

  return city;
};
export const initialAppPropsToStaticProps = async (store: Store<RootStoreType>) => {
  const dispatch = store.dispatch as ThunkDispatchType;
  const { taxonomy } = store.getState();

  if (!taxonomy.category.length) {
    await asyncGetTaxonomy(dispatch);
  }
};
