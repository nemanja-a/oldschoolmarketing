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
      console.log(websiteFormData)
      const addWebsiteURL = `${server}/api/addwebsite`
      const websiteResponse = await fetch(addWebsiteURL, {
        body: JSON.stringify(websiteFormData),
        method: 'POST'
      })
      const data = await websiteResponse.json()
      if (data.status !== "Success") { 
        showError('Could not add website. Try again.')
      }
      const addSuccess = true
      
      props.addWebsiteCallback()
      props.toggleLoading(false)
      props.close(addSuccess)  
      return data  
    }

    const onError = (message) => showError(message)
    const inputClasses = {
      element: [paymentStyles.input]
    }
    
  return (
       <div id={dialogStyles.secondStep}>
          <div className={paymentStyles.content}>
            <span>
              *After publishing website, it <strong>can not</strong> be modified by neither <strong> user</strong> nor <strong> admin </strong>. Website can only be <strong> removed </strong> by <strong> admin</strong>. <br/> <br/>
              <strong>*Disclaimer:</strong> Websites with <strong>inappropriate content</strong> that manage to bypass safety-content check will be <strong>removed</strong> and <strong>no refund</strong> will be provided.
            </span>
              <span id={paymentStyles.amountWrapper}>
                <Input 
                    label='Amount in RSD($)'
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