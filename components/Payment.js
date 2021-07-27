import '@reach/dialog/styles.css'
import { useState } from 'react'
import dialogStyles from "../styles/dialog.module.css"
import paymentStyles from "../styles/payment.module.css"
import { Input } from './common/Input'
import PayPalComponent from "./PayPalComponent"
import utilStyles from "../styles/utils.module.css"
import { server } from '../config'
import { showError } from '../lib/toast'

export function Payment(props) {  
    const [amount, setAmount] = useState(2)
    
    const onAmountChange = () => { 
      if (Number(event.target.value) < 2) return
      const amount = Number(event.target.value)
      localStorage.setItem('amount', amount) 
      setAmount(amount)
    }

    const addWebsite = async () => {
      props.toggleLoading(true)
      const websiteFormData = props.getFormData()
      const addWebsiteURL = `${server}/api/addwebsite`
      const websiteResponse = await fetch(addWebsiteURL, {
        body: JSON.stringify(websiteFormData),
        method: 'POST'
      })
      const data = await websiteResponse.json()
      if (data.status !== "Success") { 
        showError('Could not add website. Try again.')
      }
      props.addWebsiteCallback()
      props.toggleLoading(false)
      props.close()  
      return data  
    }

    const onError = (message) => showError(message)
    const inputClasses = {
      element: [paymentStyles.input]
    }
    
  return (
       <div id={dialogStyles.secondStep}>
            <div className={paymentStyles.content}>
                <span id={paymentStyles.amountWrapper}>
                  <Input 
                      label='Amount in EUR(€)'
                      name='amount'
                      type='number'
                      onChange={onAmountChange}
                      min={2}
                      value={amount}
                      classes={inputClasses}
                  />
                <span className={utilStyles.footnote}>Spot for website costs 2€, but feel free to change it.</span>
                </span> 
                <span id={dialogStyles.payPalComponentWrapper}>
                    <PayPalComponent addWebsite={addWebsite} onError={onError}/>
                </span>
            </div>
        </div>
  )
}