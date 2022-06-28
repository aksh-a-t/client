import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import React ,{useContext} from 'react'
import { OrderContext } from '../../App';

const ProductCard = ({data,addProduct}) => {
  console.log(data);
  // const {orderData,setOrderData} = useContext(OrderContext);
  // const addProduct=(id)=>{
  //   let isAdded=orderData.find((val)=>val['productId'])
  // }
  return ( 
    
    <div style={{marginBottom:'30px'}}>
    <Typography variant="h5" component="div" sx={{textAlign:'center'}}>

        {data[0]['category']}
    </Typography>
          <div style={{display:'flex',gap:'10px'}}>
    {
      data&&data.map((val)=>{
        console.log(val);
        return(

        <Card sx={{ width: 200 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {val['product']}
        </Typography>
        <Typography sx={{overflowX:'auto',height:'70px'}} variant="body2" color="text.secondary">
        {val['discription']}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Share</Button> */}
        <Button onClick={()=>addProduct(val)} size="small">Add</Button>
      </CardActions>
    </Card>
        )
      })
    }
    </div>
    </div>
  )
}

export default ProductCard