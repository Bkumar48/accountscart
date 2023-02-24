import React from 'react'
import CustomInput from '../components/CustomInput'

const Resetpassword = () => {
  return (
    <div className='py-5' style={{backgroundColor:"#ffd333", minHeight:"100vh"}}>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
        <form action="">
          <h3 className='text-center title'>Reset Password</h3>
          <p className='text-center'>Please Enter Your New Password</p>
        <CustomInput type='password' label='New password' id= "pass" />
        <CustomInput type='password' label='Confirm Password' id= "confirmpass" />
        <button className='border-0 px-3 py-2 text-white fw-bold w-100' style={{backgroundColor:"#ffd333"}} type="submit">Reset password</button>
        </form>
      </div>
    </div>
  )
}

export default Resetpassword
