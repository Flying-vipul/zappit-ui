import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

const PayPalPayment = () => {
  return (
    <div className='h-96 flex justify-center items-center'>
        <Alert severity='warning'>
            <AlertTitle>Paypal Method Unavailable</AlertTitle>
            Paypal payment is unavailable. Please use another payment method.
        </Alert>
    </div>
  )
}

export default PayPalPayment