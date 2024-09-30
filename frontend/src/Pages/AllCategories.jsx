
import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const AllCategories = () => {
    const [categoryProduct,setCategoryProduct] = useState([])
    const [loading,setLoading] = useState(false)

    const categoryLoading = new Array(17).fill(null)

    const fetchCategoryProduct = async() =>{
        setLoading(true)
        const response = await fetch(SummaryApi.categoryProduct.url)
        const dataResponse = await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data)
    }

    useEffect(()=>{
        fetchCategoryProduct()
    },[])

  return (
    <div className='container m-auto p-4'>
         <p className='text-center text-gray-500'>All Categories</p>
           <div className='w-full m-auto mt-4 flex flex-wrap items-center gap-4'>
            {

                loading ? (
                    categoryLoading?.map((el,index)=>{
                            return(
                                <div className='w-32'>
                                <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>
                                </div>
                                </div>
                            )
                    })  
                ) :
                (
                    categoryProduct?.map((product,index)=>{
                        return(
                            <Link to={"/product-category?category="+product?.category} className='cursor-pointer' key={product?.category}>
                                <div className='w-32 m-auto text-center'>
                                <div className='w-20 m-auto h-20 rounded-full p-4 bg-slate-200 flex items-center justify-center'>
                                    <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                                </div>
                                <p className='text-sm capitalize text-center text-gray-700'>{product?.category}</p>
                                </div>
                            </Link>
                        )
                    })
                )
            }
           </div>
    </div>
  )
}

export default AllCategories