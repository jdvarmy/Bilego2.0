import Document, { Html, Head, Main, NextScript } from 'next/document';
import { modalSelector } from '../src/types/types';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body className='text-white bg-blue-900 font-body'>
          <Main />
          <div id={modalSelector} />
          <script async data-webpack='bticket' src='http://localhost:3002/ticket.js' />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
