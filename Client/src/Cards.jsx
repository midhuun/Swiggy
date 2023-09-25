import React from 'react'
import masaladosa from './assets/masaladosa.webp';
import pongal from './assets/pongal2.webp';
import {FcRating} from 'react-icons/fc';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import { ShopContext } from './ShopContext';
import {MdAdd} from 'react-icons/md';
function Cards({data}) {
    const {image,price,rating,food,description,id} = data;
    const {addtoCart} = useContext(ShopContext);
  return (
    <div className='w-[290px] hover:scale-[0.98] transition-scale duration-500 pt-[20px] relative' onClick={()=>addtoCart(id)}>
   <div className='relative card-img'>
 <img src={image} className='w-[270px] h-[180px] object-cover rounded-xl'/>
 <div className='btn-div'>
 </div>
 <button>Add</button>
</div>

   <h1 className='pt-3 px-4 text-[18px]'>{food}</h1>
   <p className='flex px-4  font-semibold'><span className=' pr-1'><FcRating size={24}/></span>{rating}</p>
   <p className='text-[#02060C99] text-[16px] pl-4 min-h-[100px] py-1 w-[250px]'>{description}</p>
   </div>
  )
}

export default Cards