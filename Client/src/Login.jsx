import { useState } from 'react';
import Bg from '../src/assets/bg.jpg';
import { Link, Navigate } from 'react-router-dom';
function Login() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  function SigninForm(e) {
    e.preventDefault();
    setIsLoading(true); 
    fetch("http://localhost:3000/post", {
      method: "POST",
      body: JSON.stringify({ name, password, email, phone }),
      headers: { 'Content-Type': 'application/json' },
      credentials:'include'
    })
      .then((res) => {
        if (res.ok) {
          setLoginSuccess(true); 
        } else {
          alert("Error Login");
        }
        setIsLoading(false); 
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        alert("User Already Registered")
      });
  }
  if(loginSuccess){

    return(
      <Navigate to='/' />
    )
  }

  return (
    <div className='h-screen w-full login flex flex-col justify-center items-center'>
      <div className='md:px-[32px] px-[12px] pt-[40px] w-full h-full md:w-[70%] lg:w-[40%] bg-white relative'>
        <div className='login-header relative pb-[10px]'>
          <h1 className='font-bold text-[32px]'>Sign up</h1>
          <p className='font-bold text-[17px]'>
            or <span className='text-orange-500'><Link to='/login'>login to your account</Link></span>
          </p>
          <img
            className='md:h-[80px] md:w-[80px] w-[50px] h-[50px] absolute top-[20px] right-[50px] rounded-full object-cover'
            src={Bg}
            alt='Profile'
          />
        </div>
        <form className='flex flex-col mx-[20px] mt-[30px]' onSubmit={(e) => SigninForm(e)}>
          <input
            className='py-[20px] px-[10px] border'
            type='tel'
            required
            onChange={(e) => setPhone(e.target.value)}
            placeholder='Phone Number'
          />
          <input
            className='py-[20px] px-[10px] border'
            type='text'
            onChange={(e) => setName(e.target.value)}
            required
            placeholder='Name'
          />
          <input
            className='py-[20px] px-[10px] border'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Email'
          />
          <input
            className='py-[20px] px-[10px] border'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
          <button className={`mt-12 sign-button bg-orange-500 uppercase py-4 text-white ${loginSuccess ? 'login-success' : ''}`} disabled={isLoading}>
            {isLoading ? 'Processing...' : loginSuccess ? 'Signed up' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
