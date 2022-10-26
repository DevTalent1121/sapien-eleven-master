import * as React from "react";
import ProductComponent from "./ProductComponent";
import { useSelector } from 'react-redux';
import { Product } from "shopify-buy";
import { RootState } from "../../store";
import { Box, Grid, LinearProgress } from "@mui/material";

export default function Products() {
  const { products } = useSelector((state: RootState) => state.shopify)

  if (products) {
    return (
      <Box className="Product-wrapper" sx={{marginTop:'50px', padding:'0px 30px 0px 50px'}}>
        <Grid container spacing={3}>
          {products
            .map((product: Product) => {
              return (
                <Grid key={product.id} item xs={12} sm={4} >
                  <ProductComponent
                    key={product.id}
                    product={product}
                  />
                </Grid>
              );
            })
            .reverse()}
        </Grid>
      </Box>
    );
  } else {
    return <LinearProgress />;
  }
}
