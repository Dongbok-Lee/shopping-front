import React from "react";
import {Route,Routes} from 'react-router-dom'
import Login from "./Pages/Login";
import Join from "./Pages/Join";
import Hafter from "./Header/HeaderAfter";
import Hbefore from "./Header/HeaderBefore";
import Basket from "./Pages/Basket";
import Goodsup from "./Pages/Goodsup";
import Uplist from "./Pages/Uplist";
import Orderlist from "./Pages/Orderlist";
import Bhome from "./Pages/Bhome";
import Ahome from "./Pages/Ahome";
import Detail from './Pages/Detail'
import {useState} from 'react'

function UserRouter(){
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);   //장바구니에 들어있는 거를 나타내는 변수

    const convertPrice = (price) => {
        return (price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }

    return(
    <Routes>
        <Route path="/1" element={<Bhome products={products} setProducts={setProducts}  convertPrice={convertPrice}/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/" element={<Ahome products={products} setProducts={setProducts}  convertPrice={convertPrice} cart={cart}/>}/>
        <Route path="/Join" element={<Join/>}/>
        <Route path="/Basket" element={<Basket cart={cart} setCart={setCart} convertPrice={convertPrice}/>}/>
        <Route path="/Goodsup" element={<Goodsup products={products} setProducts={setProducts} cart={cart}/>}/>
        <Route path="/Uplist" element={<Uplist/>}/>
        <Route path="/Orderlist" element={<Orderlist/>}/>
        <Route path="/product/:id" element={<Detail convertPrice={convertPrice} cart={cart} setCart={setCart}/>}/>
    </Routes>
    );
}
export default UserRouter;