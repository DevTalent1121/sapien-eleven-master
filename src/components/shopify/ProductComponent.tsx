import React, { useState } from "react";
import VariantSelector from "./VariantSelector";
import { Product } from "shopify-buy";
import { addVariantToCart } from "../../store/shopify/actions";
import { handleQuantityChange } from "../../store/variants/actions";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Box, Button, Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { handleOptionChange } from "../../store/variants/actions";

interface IProductProps {
  product: Product;
}

export default function ProductComponent(props: IProductProps) {
  const { product } = props;
  const variants = useSelector((state: RootState) => state.variants);
  const {
    selectedVariant,
    selectedVariantImage,
    selectedVariantQuantity,
  } = variants;
  const variantImage = selectedVariantImage || product.images[0];
  const variant = selectedVariant || product.variants[0];
  const variantQuantity = selectedVariantQuantity || 1;

  const [product_quantity, setProductQuantity] = useState(1);

  const handleChangeProductQuantity = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setProductQuantity(parseInt(event.target.value));
  }

  const handleChangeProductOptions = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    console.log("-----Option has changed");
    console.log(event.target.name);
    handleOptionChange(event, product);
  }

  return (
  <Box className="Product">
    <Card elevation={4}>
    <CardHeader sx={{padding:"8px",fontSize:"1rem",textAlign:"center"}}
        title={product.title}
    />
    <Divider />
      <CardContent sx={{paddingBottom:'0px !important'}}>
  
      { (product.images[0])?  (
        <Box className="image_div" sx={{width:'100%', height:'200px', backgroundImage: `url(${product.images[0].src})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat',backgroundPosition: 'center'}}>
        </Box>
      ) : (
        <Box className="image_div" sx={{width:'100%', height:'150px',}}>
        </Box>
      ) }
        <Typography mt={1}>${variant.price}</Typography>
        <Divider />
        {
          product.options.map((option) => {
            return <VariantSelector 
              key={option.name} 
              option={option}
              handleOptionChange = {handleChangeProductOptions} 
              />;
          })
        }
        <Box sx={{maxHeight:"50px",display:"flex"}}>
        {/* <label className="Product__option variantLabel"> */}
        <Typography className="variantLabel">
          Quantity:{" "}
        </Typography>
          <input
            className="form-control Product__quantity"
            min="1"
            type="number"
            defaultValue={product_quantity}
            onChange={handleChangeProductQuantity}
          ></input>
        {/* </label> */}
        </Box>
        <Divider />
        <Typography mt={1}>{product.description}</Typography>
        <Divider />

        <Button onClick={()=> addVariantToCart(variant.id, product_quantity)} sx={{width:'100%',marginTop:'3px'}}>Add to Cart</Button>
      </CardContent>
    </Card>
  </Box>
  );
}
