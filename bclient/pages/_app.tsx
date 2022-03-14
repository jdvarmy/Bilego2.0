import { wrapper } from '../src/store';
import '../public/output.css';
import Layout from '../src/layout/Layout';

const WrappedApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default wrapper.withRedux(WrappedApp);
