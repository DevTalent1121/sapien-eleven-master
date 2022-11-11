import React, { useState } from "react";
import VariantSelector from "./VariantSelector";
import { Product } from "shopify-buy";
import { addVariantToCart } from "../../store/shopify/actions";
import { handleQuantityChange } from "../../store/variants/actions";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Box, Button, Card, CardContent, CardHeader, Divider, Typography, Modal } from "@mui/material";
import { handleOptionChange } from "../../store/variants/actions";

import ImageGallery from "react-image-gallery"

interface IProductProps {
  product: ShopifyBuy.Product;
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
  const [modal_open, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    console.log("Modal Close");
  }

  // const handleChangeProductQuantity = (event: React.ChangeEvent<HTMLInputElement>) =>{
  //   setProductQuantity(parseInt(event.target.value));
  // }
  const handleChangeProductOptions = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    console.log("-----Option has changed");
    console.log(event.target.name);
    handleOptionChange(event, product);
  }
  
  // console.log(variant);
  // console.log(product);
  var images = new Array();
  product.images.map((image)=>{
    images.push({original:image.src,thumbnail:image.src});
  });
  
  const ModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    // height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
  <Box className="Product">
    <Card elevation={4}>
    <CardHeader sx={{padding:"8px",fontSize:"1rem",textAlign:"center"}}
        title={product.title}
    />
    <Divider />
      <CardContent sx={{paddingBottom:'0px !important'}}>
  
      { (product.images[0])?  (
        // <Box className="image_div" sx={{width:'100%', height:'200px', backgroundImage: `url(${product.images[0].src})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat',backgroundPosition: 'center'}}>
        <Box>
          <Box className="image_div" onClick={handleModalOpen} sx={{width:'100%', height:'200px', backgroundImage: `url(${variantImage.src})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat',backgroundPosition: 'center', cursor:'pointer'}}>
          </Box>
          <Modal
              open = {modal_open}
              onClose = {handleModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"            
            >
              <Box sx={ModalStyle}>
                <Button onClick={handleModalClose} sx={{float:'right', marginTop:-4, marginRight:-4}}>X</Button>
                  <ImageGallery items={images} showThumbnails={false} showFullscreenButton={false} />
              </Box>
          </Modal>
          
        </Box>

    ) : (
        <Box className="image_div" sx={{width:'100%', height:'150px',}}>
        </Box>
      ) }
        {/* <Typography mt={1}>{variant.price.currencyCode}{variant.price.amount}</Typography> */}
        <Typography mt={1}>${JSON.parse(JSON.stringify(variant.price)).amount}</Typography>
        <Divider sx={{marginBottom:'5px'}} />
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
            defaultValue={variantQuantity}
            onChange={handleQuantityChange}
          ></input>
        </Box>
        <Divider />
        <Typography mt={1}>{product.description}</Typography>
        <Divider />

        <Button onClick={()=> addVariantToCart(variant.id, variantQuantity)} sx={{width:'100%',marginTop:'3px'}}>Add to Cart</Button>
      </CardContent>
    </Card>
  </Box>
  );
}
