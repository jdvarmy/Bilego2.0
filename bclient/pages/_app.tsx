import { wrapper } from '../src/store';
import Layout from '../src/layout/Layout';
import '../public/output.css';

const WrappedApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default wrapper.withRedux(WrappedApp);
