import React, { useState } from 'react'
import { cartContext } from './context/Cart'
import { useContext,useEffect } from 'react'

const products = [
  {
    id: 0,
    name: "Nike Air Force 1 '07",
    price: "$130",
    img: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/e9d41cd4-a2c5-4ca7-a3aa-f4bf597658d0/custom-nike-air-force-1-mid-by-you-shoes.png",
  },
  {
    id: 1,
    name: "Nike Air Max 270",
    price: "$100",
    img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4f685abe-510a-4599-bb28-69859836bf88/air-max-pulse-roam-shoes-NSfkP0.png",
  },
  {
    id: 2,
    name: "Nike Air More Uptempo",
    price: "$140",
    img: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5217149f-65cb-497c-9a4f-c98e94ac74c8/air-more-uptempo-shoes-crrfMp.png",
  }
]

const ProductCard = ({id,img,name,price, increase, reduce, cart})=>{

  return(
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
    <img
      src={img}
      alt="product-image"
      className="w-full rounded-lg sm:w-40"
    />
    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
      <div className="mt-5 sm:mt-0">
        <h2 className="text-lg font-bold text-gray-900">
         {name}
        </h2>
        <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
      </div>
      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
        <div className="flex items-center border-gray-100">
          <button className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={()=>{
            reduce(id)
            console.log(cart)
            }}>
            {" "}
            -{" "}
          </button>
          <input
            className="h-8 w-8 border bg-white text-center text-xs outline-none"
            type="number"
            value={cart[id]}
            readOnly
          />
          <button className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" 
          onClick={()=>{
            increase(id)         
          }}
          >
            {" "}
            +{" "}
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm">{price}</p>
          <h1>Just trying</h1>
        </div>
      </div>
    </div>
  </div>
  )

}


const Home = () => {
  const {cartTotal,setCartTotal} = useContext(cartContext)
const [sum, setSum] = useState(0)

  const [cart, setCart] = useState({
    0:1,
    1:1,
    2:1
  })
  const reduce=(id)=>{

    if(cart[id]>0){
      setCart({...cart,[id]:cart[id]-1})
    }

  }
  const increase=(id)=>{
    setCart({...cart,[id]:cart[id]+1})
  }
  useEffect(() => {
    setCartTotal(cart)
    console.log(cart)
    let sum = 0
    for(let i in cart){
      sum+=cart[i]*parseInt(products[i].price.slice(1))
    }
    setSum(sum)
    console.log(sum)
  },[cart])


  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
        {
          products.map((product)=>(
            <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} img={product.img} 
            increase={increase} reduce={reduce} cart={cart}
            />
          ))
        }
          </div>
        {/* Sub total */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">SubTotal</p>
            <p className="text-gray-700">{sum}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$4.99</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">
                {sum+4.99} USD</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
          onClick={()=>
            {sum!=0?alert("Thank you for shopping with us\n Your Bill : "+ (parseInt(sum)+4.99)+" USD"):alert("Your Cart Is Empty!")}
            }
          >
            Check out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home