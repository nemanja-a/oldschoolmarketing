import Document, { Html, Head, Main, NextScript } from 'next/document'
import { useEffect } from 'react'
class MyDocument extends Document {
  render() {
    // TODO: Don't close AddDialog modal when select dropdown is active and ESC pressed
    const handleKeydown = (event) => { 
      console.log(event)
      if (event.keyCode === 27) {
        "Pritisnuo si ESC!"
      }
    }

    useEffect(() => {
      document.addEventListener('keydown', handleKeydown)
      return ()=>{
       document.removeEventListener('keydown', handleKeydown)
      }
  }, [])

    return (
      <Html>
        <Head>        
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap" rel="stylesheet"></link>          
          {/* <script defer src={`https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}&currency=EUR`} />  */}
          <script defer src={`https://www.paypal.com/sdk/js?client-id=sandbox&currency=EUR`} />        
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