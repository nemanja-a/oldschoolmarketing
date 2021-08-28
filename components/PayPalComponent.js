

import { useEffect, useRef } from "react"

const PayPalBtn = (props) => {

  const refPayPalBtn = useRef()
  useEffect(() => {
    paypal.Buttons({
      enableStandardCardFields: true,
      createOrder: function (data, actions) {
        let amount = Number(localStorage.getItem('amount'))
        if (!amount) amount = 2
        return actions.order.create({
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              value: amount
            },
            shipping: {
              address: {
                address_line_1: '29. november 17',
                admin_area_2: 'Beograd',
                postal_code: '11224',
                country_code: 'RS'
              }
            },
          }]
        });
      },
      onApprove: async (data, actions) => {
        return actions.order.capture().then(async (details) => {
          const addWebsiteResponse = await props.addWebsite()
          if (addWebsiteResponse.error) {
            return props.onError(addWebsiteResponse.error)
          }
        })
      }
    }).render(refPayPalBtn.current);
  }, [])
  return (
    <div ref={refPayPalBtn} id='pay-pal-btn'></div>
  )
}

export default PayPalBtn