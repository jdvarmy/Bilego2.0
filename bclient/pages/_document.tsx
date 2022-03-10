import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body className='text-white'>
          <Main />
          <script async data-webpack='bticket' src='http://localhost:3002/ticket.js' />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
