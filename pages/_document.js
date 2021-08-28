import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  render() {

    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet"></link>
          <script defer src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}`} />
          {/* <script defer src={`https://www.paypal.com/sdk/js?client-id=sandbox`} />         */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument