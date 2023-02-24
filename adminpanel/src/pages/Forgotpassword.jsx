import React from 'react'
import CustomInput from '../components/CustomInput'

const Forgotpassword = () => {
  return (
    <div className='py-5' style={{backgroundColor:"#ffd333", minHeight:"100vh"}}>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
        <form action="">
          <h3 className='text-center title'>Forgot Password</h3>
          <p className='text-center'>Please Enter your registered email to get reset password mail</p>
        <CustomInput type='text' label='Email Address' id= "email" />
        
        <button className='border-0 px-3 py-2 text-white fw-bold w-100' style={{backgroundColor:"#ffd333"}} type="submit">Send link</button>
        </form>
      </div>
    </div>
  )
}

export default Forgotpassword
