import { toast } from 'react-toastify'

export const showError = (message, duration) => { 
    const toastOptions = {
     position: "top-right",
     autoClose: duration || 10000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
   }

   toast.dark(message, toastOptions)
 }