import React, { useEffect } from 'react'
import Cards from './Cards';
import { FoodDatas } from './assets/data';
function FoodData() {
  return (
    <div className='lg:px-[10%]'>
    <h1 className='text-black px-[16px] text-[24px] font-bold'>Popular Picks for you</h1>
    <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:grid-cols-4 pt-[50px] place-items-center'>
    {FoodDatas.map((data)=>{
        return(
            <Cards key={data.id} data={data} />
        )
    })}
    </div>
    </div>
  )
}

export default FoodData