import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en-US">
        <Head>
          <meta name="description" content="Igaku" />
          <meta charSet="UTF-8" />
          <meta name="robots" content="noindex nofollow" />
          <meta name="viewport" content="width=device-width" />
          <link rel="icon" href="https://tinyimg.io/i/pBRWCRn.png" type="image/png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
