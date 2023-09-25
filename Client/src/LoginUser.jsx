import React from 'react';
import Bg from '../src/assets/bg.jpg';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function LoginUser() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  function LoginForm(e){
    e.preventDefault();
    fetch("http://localhost:3000/login",{
        method:"POST",
        body:JSON.stringify({phone,password}),
        credentials:'include',
        headers: { 'Content-Type': 'application/json' },
    }).then((res)=>{
      const data =res.json()
      console.log(data);
      setIsLoading(true)
      if(res.ok){
        setTimeout(() => {
          setLoginSuccess(true)
          setIsLoading(false)
        }, 2000);
        
      }
      else{
        alert("Login Failed")
      }
    })
    .catch(err=>{
        console.log(err);
    })
  }
   if(loginSuccess){
    setTimeout(() => {
      navigate('/')
    }, 2000);
  
   }
  return (
    <div className='h-screen w-full login flex flex-col justify-center items-center'>
      <div className='md:px-[32px] px-[12px] pt-[40px] w-full h-full md:w-[70%] lg:w-[40%] bg-white relative'>
        <div className='login-header relative pb-[10px] '>
          <h1 className='font-bold text-[32px]'>Login</h1>
          <p className='font-bold text-[17px]'>
            or <span className='text-orange-500'><Link to='/register'>Signup a new account</Link></span>
          </p>
          <img
            className='md:h-[80px] md:w-[80px] w-[50px] h-[50px] absolute top-[20px] right-[50px] rounded-full object-cover'
            src={Bg}
            alt='Profile'
          />
        </div>
        <form className='flex flex-col mx-[20px] mt-[30px]' onSubmit={(e) => LoginForm(e)}>
          <input
            className='py-[20px] px-[10px] border'
            type='tel'
            required
            onChange={(e) => setPhone(e.target.value)}
            placeholder='Phone Number'
          />
          <input
            className='py-[20px] px-[10px] border'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
          <button className={`mt-12 sign-button bg-orange-500 uppercase py-4 text-white ${loginSuccess ? 'login-success' : ''}`} disabled={isLoading}>
            {isLoading ? 'Processing...' : loginSuccess ? 'Signed up' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginUser