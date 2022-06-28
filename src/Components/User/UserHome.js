// @ts-nocheck
import axios from 'axios';
import React,{useState,useEffect, useContext} from 'react'
import { useAlert } from 'react-alert';
import { OrderContext } from '../../App';
import ProductCard from './ProductCard';

const UserHome = () => {
    const [dataList,setDataList] = useState();
    const [keys,setKeys] = useState();
    const {orderData,setOrderData} = useContext(OrderContext);
    const alert = useAlert();
    useEffect(()=>{
        let token = localStorage.getItem("token");
        axios.get("http://localhost:5000/api/product/user/",{headers:{Authorization:`Bearer ${token}`}})
        .then((res)=>{
            setDataList(res.data.data);
            setKeys(Object.keys(res.data.data));
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
    useEffect(()=>{
        console.log(dataList);
    },[dataList])


    const addProduct=(current)=>{
        let isAdded = orderData.find((val)=>val['productId']===current['productId'])
        if(isAdded){
           return alert.error("Product Already Added");
        }
        setOrderData((pre)=>{
            let ans=[...pre]
            ans.push({product:current['product'],productId:current['productId'],price:current.price,quantity:1})
            return ans;
        })
    }
  return ( 
    <div>
    {
        keys&&keys.map((val,i)=>{
            return(
                <ProductCard data={dataList[val]} addProduct={addProduct}/>
            )
        })
    }
    </div>
  )
}

export default UserHome