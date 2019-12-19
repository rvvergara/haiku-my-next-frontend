import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang='en-US'>
        <Head>
          <meta name='description' content='Igaku' />
          <meta charSet='UTF-8' />
          <meta name='robots' content='noindex nofollow' />
          <meta name='viewport' content='width=device-width' />
          <link
            rel='icon'
            href='https://tinyimg.io/i/pBRWCRn.png'
            type='image/png'
          />
          <link
            rel='stylesheet'
            href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
            integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
            crossOrigin='anonymous'
          />
          <link
            href='https://fonts.googleapis.com/css?family=Darker+Grotesque&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
