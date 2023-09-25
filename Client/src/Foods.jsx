import React, { useContext, useEffect, useState } from 'react'
import Logo from '../src/assets/swiggy.png';
import {CiSearch} from 'react-icons/ci';
import {CiUser} from 'react-icons/ci';
import {PiUserThin} from 'react-icons/pi';
import {BsCart2} from 'react-icons/bs'
import {Link, Navigate, json,} from 'react-router-dom';
import FoodData from './FoodData';
import {FaRegUser} from 'react-icons/fa';
import { UserContext } from './UserContext';
import Rasam from './assets/rasam.webp';
import { ShopContext } from './ShopContext';
import {FoodDatas} from './assets/data';
function Foods() {
  const {cartItems,addtoCart,removeFromCart,setCartItems} = useContext(ShopContext);
  const {info,setInfo} =useContext(UserContext);
  const [isTrue,setistrue] = useState(false);
  const [cartOpen,setCartOpen] = useState(false);
  const [total,setTotal] = useState(0);
  const [openMenu,setOpenMenu] = useState(false);
  useEffect(()=>{
    function addTotal() {
      const totalPrice = FoodDatas.reduce((total, data) => total + data.price, 0);
      setTotal(totalPrice);
    }
  addTotal();
  },[])
  useEffect(() => {
    fetch("http://localhost:3000/home", {
      credentials:'include'
    })
    .then(async (res) => {
      const data = await res.json();
      setInfo(data);
    })
    .catch((error) => {
      console.log(error)
    });
  }, []);
  async function logout(e){
    e.preventDefault();
    window.location.reload();
    await fetch("http://localhost:3000/logout",{
      method:'POST',
      credentials:'include'
    }).then((res)=>{
      if(res.ok){
        setistrue(true);
        alert("Logout Successfull")
      }
      else{
        setistrue(false);
        alert("Sorry Logout Failed")
      }
    }).catch((err)=>{
      console.log(err);
    })
  }
  async function showMenuCart(){
    setCartOpen(!cartOpen);
    setOpenMenu(!openMenu);
  }
  async function showCart(e){
    e.preventDefault();
    setCartOpen(!cartOpen);
 }
 useEffect(() => async function(){
  const storedData = await JSON.parse(localStorage.getItem('data'));
  console.log(storedData);
    if (storedData && storedData?.name && info?.name === storedData.name) {
      setCartItems(storedData.cart);
    } else {
      console.log("error");
    } 
}, []);
  useEffect(()=>async function getCart() {
    try{
    const res =await fetch("http://localhost:3000/cart",{
      method:'POST',
      credentials:'include',
      body:JSON.stringify(cartItems),
      headers: {
        'Content-Type': 'application/json',
      },
     });
     const data = await res.json();
      localStorage.setItem('data',cartItems);
    }
    catch(err){
      console.log(err);
    }
    
  },[])

  return (
    <>
    <div className='w-full foods  h-screen'>
    <div className='flex md:hidden py-2 justify-between'>
  <img className='px-2 h-[30px]' src={Logo} />
  <div id='cart' className={`${cartOpen ? "w-[300px]" : "w-0"} overflow-hidden transition-width duration-500 absolute shadow-lg z-50 right-[10px] border-t-4 border-orange-500 top-[52px] bg-white`}>
  {FoodDatas.map((e) => {
    if (cartItems[e.id] > 0) {
      return (
        <div key={e.id} className='flex p-4'>
          <img src={e.image} className='h-[80px] w-[80px] object-cover ' />
          <div className=''>
            <p className='font-bold px-2 max-w-[150px] text-black'>{e.food}</p>
            <div className='flex pt-4 pl-3 justify-center items-center text-center'>
              <button onClick={() => removeFromCart(e.id)} className='py-[2px] px-3 text-white bg-red-500 font-extrabold'>-</button>
              <button className='py-[2px] px-3'>{cartItems[e.id]}</button>
              <button onClick={() => addtoCart(e.id)} className='py-[2px] px-3 font-bold text-white bg-green-500'>+</button>
              <p className='font-semibold text-[12px] ml-[20px]'>₹{e.price * cartItems[e.id]}</p>
            </div>
          </div>
        </div>
      );
    }
  })}
  <hr className='border-2'></hr>
  <div className='flex flex-col justify-start w-full items-start'>
    <h1 className='uppercase font-bold pt-5 flex'>Total : <span>₹3000</span></h1>
    <button onClick={showMenuCart} className='w-full py-2 flex justify-center items-center bg-red-500 text-white'>Clear</button>
  </div>
</div>


  <div className='pt-2 pr-4 cursor-pointer relative' onClick={() => setOpenMenu(!openMenu)}>
    <div className='h-[3px] w-[1.5rem] bg-black mb-[4px]'></div>
    <div className='h-[3px] w-[1.5rem] bg-black mb-[4px]'></div>
    <div className='h-[3px] w-[1.5rem] bg-black mb-[2px]'></div>
  </div>
</div>
      <div className={`${openMenu?"active":"hidden"}  flex nav-items flex-col pt-4 h-[400px] justify-center items-center`}>
      <h1><a href='#home'>Home</a></h1>
      {info ?<><h1>{info.name}</h1><h1><a onClick={logout}>Logout</a></h1></>:<><h1><Link to='/register'>Sign Up</Link></h1> <h1><Link to='/login'>Login</Link></h1></>}
      <h1><a onClick={showCart}>Cart</a></h1>
      </div>
      <div className='hidden md:flex lg:px-[10%] py-[20px] px-0  h-[80px] md:px-[5%] shadow-lg items-center justify-between w-full'>
      <img className='px-2 h-[40px]' src={Logo} />
      <button className='flex items-center hidden md:flex px-4'><input placeholder='Search' className='border-0 py-2 px-3 text-black rounded-md font-thin  focus:border-none active:border-none '/><CiSearch size={24} className='mx-2 text-black'/></button>
      <div className='flex items-center'>
      <div className={`flex ${info?"hidden":""} items-center`}>
      <Link to='/login' className= 'flex items-center px-4 hidden md:flex'>
      <PiUserThin size={24} className='mx-2 text-black'/>
      Login
      </Link>
      <Link to='/register' className='flex items-center px-4'><PiUserThin size={24} className='mx-2 text-black'/>Sign Up</Link>
      </div>
      {info && 
      <div className='flex items-center'>
      <h1 className='flex items-center px-4 '><PiUserThin size={24} className='mx-2 text-black'/>{info.name}</h1>
      <a onClick={((e)=>logout(e))} className='flex items-center px-4'>Logout</a>
      </div>}
      <button className='relative'>
      <div id='cart' className=' flex items-center px-4'>
      <BsCart2 size={24} className='mx-2 text-black' onClick={(e)=>showCart(e)} />
      <div className='absolute text-[12px] text-black font-bold h-5 w-5 flex justify-center items-center bg-white border -z-1 rounded-full top-0 right-3 -mt-2 ml-2'><p></p></div>
      </div>
      <div id='cart' className={`${cartOpen ? "w-[300px]" : "w-0"} overflow-hidden transition-width duration-500  absolute shadow-lg z-50  right-[10px] border-t-4 border-orange-500 top-[52px] bg-white`}>
     { FoodDatas.map((e) => {
      if (cartItems[e.id] > 0) 
        return(
        <div key={e.id} className='flex p-4'>
        <img src={e.image} className='h-[80px] w-[80px] object-cover ' />
        <div className=''>
        <p className='font-bold px-2 max-w-[150px] text-black'>{e.food}</p>
        <div className='flex  pt-4 pl-3 justify-center items-center text-center'>
        <button onClick={()=>removeFromCart(e.id)} className='py-[2px] px-3 text-white bg-red-500 font-extrabold'>-</button>
        <button className='py-[2px] px-3'>{cartItems[e.id]}</button>
        <button onClick={()=>addtoCart(e.id)} className='py-[2px] px-3 font-bold text-white bg-green-500'>+</button>
        <p className='font-semibold text-[12px] ml-[20px]'>₹{e.price*cartItems[e.id]}</p>
        </div>
        </div>
        </div>
        )
      })}
      <hr className='border-2'></hr>
       <div className='flex flex-col justify-start w-full items-start'>
         <h1 className='uppercase font-bold pt-5 flex'>Total :<span> $3000</span></h1>
        <button onClick={showCart} className='w-full py-2 flex justify-center items-center bg-red-500 text-white'>Clear</button>
       </div>
  </div>
      </button>
      </div>
      </div>
      <div className='pt-[30px]' id='home'>
        <FoodData/>
      </div>
      </div>
    </>
  )
}

export default Foods