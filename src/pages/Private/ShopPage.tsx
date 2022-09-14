import React, { useEffect, useState } from 'react';

// @mui imports
import styled from '@mui/material/styles/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/styles/useTheme';
import {Typography, Drawer, Box, Badge, Grid, IconButton, LinearProgress } from '@mui/material';

// @mui icon import
import { AddShoppingCart } from '@mui/icons-material';

// Shared Default Toolbar Import
import { DefaultToolbar } from '../../components/navigation/DefaultToolbar';

// Styles
import { Colors } from '../../themes';

//Apollo Client import
import { useQuery, gql } from '@apollo/client';
import { setUncaughtExceptionCaptureCallback } from 'process';

// import Cart and its components
import { CartItemType, Product } from '../../components/storefront/Product';
import ProductItem from '../../components/storefront/ProductItem';
import Cart from '../../components/storefront/Cart/Cart'

  const GET_PRODUCTS = gql`
  query ShopData {
    shop {
      name
      description
    }
      products(first:20) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          title
          description
          productType
          options{
            id 
            name
            values
          }
          variants(first:1){
            nodes{
              price
            }
          }
          images(first: 1) {
            edges {
              node {
                src
              }
            }
          }
        }
      }
    }
  }    
  `;

  

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.background.paper,
    fontFamily: 'besan',
    textAlign: 'center',
    padding: '10px',
    paddingTop: '5vh'
}));


const BannerBackgroundBox = styled(Box)(({ theme }) => ({
    // padding: `${theme.spacing(20)} ${theme.spacing(4)}`,
    color: theme.palette.primary.contrastText,
    // borderBottom:  `5px solid ${theme.palette.primary.main}`,
    backgroundSize: 'contain',
    height: '75vh',
    width: '90%',
    margin: 'auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    overflow: 'hidden',
    // [theme.breakpoints.down('lg')]: {
    //     // paddingTop: theme.spacing(19),
    //     height: '60vh'
    // },
    // [theme.breakpoints.down('md')]: {
    //     // paddingTop: theme.spacing(19),
    //     height: '75vh'
    // },
}));

const CartButton = styled(IconButton)(({theme}) =>({
  zIndex: 9999,
  position:'fixed',
  right: '30px',
  top: '15px',
  color: Colors.red[400],

  [theme.breakpoints.down('sm')]: {
    top: '10px',
    right:'15px',
  },

}))

export const ShopPage: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

  //Cart Management
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[]);

    const { loading, error, data } = useQuery(GET_PRODUCTS);
    
    if (loading) return <LinearProgress />;
    if (error) return <StyledTypography>Something went Wrong ...</StyledTypography>;

    const getTotalItems = (items: CartItemType[]) =>
      items.reduce((ack:number, item) => ack + item.amount, 0);

    const handleAddToCart = (clickedItem: CartItemType) => {
      setCartItems(prev=>{
        // 1. Is item already added in the cart?
        const isItemInCart = prev.find(item=>item.id ===clickedItem.id);
        console.log(prev);
        if(isItemInCart){
          return prev.map(item=>
            item.id === clickedItem.id
            ? {...item, amount:item.amount + 1}
            : item
          );
        }

        // 2. First time the item is added
        return [...prev, { ...clickedItem, amount: 1}];

      })
    };
    const handleRemoveFromCart = (id: number) => {
      setCartItems(prev=>(
        prev.reduce((ack,item)=>{
          if(item.id === id){
            if(item.amount === 1) return ack;
            return [...ack, { ...item, amount:item.amount -1 }];
          }
          else{
            return [...ack, item];
          }
        }, [] as CartItemType[])
      ))
    };
    const productsToDisplay = data.products;

    var productItems: CartItemType[];
    productItems = new Array();
    productsToDisplay.edges.map((el:any, i:number)=>{
            let  v_cart: CartItemType = {
                id: 0,
                category: "",
                description: "",
                image: "",
                price: 0,
                title: "",
                amount: 0,
            
            }
            if(el.node){
                var t_node = el.node;
                v_cart.id = t_node.id;
                v_cart.title = t_node.title; 
                v_cart.description = t_node.description; 
                v_cart.category = t_node.productType; 
                if(t_node.images.edges[0]){
                    v_cart.image = el.node.images.edges[0].node.src;
                }
                if(t_node.variants.nodes[0]){
                    v_cart.price = t_node.variants.nodes[0].price;
                }
            }
            productItems.push(v_cart);
            
    });

    return (
            <Box>
                <DefaultToolbar  title='Academy' color='primary' backgroundColor='inherit' />
                <StyledTypography variant={sm ? 'subtitle1' : md ? 'h6' : 'h5'}>
                    Shop Page
                </StyledTypography>
                {/* <DisplayProducts />  */}
                <Box sx={{backgroundColor:'rgb(210, 89, 90)'}}>
                  {/* <h3>{data.shop.name}</h3> */}
                    <Box className="products-grid" p={2} >
                      <CartButton onClick={()=>setCartOpen(true)}>
                        <Badge badgeContent={getTotalItems(cartItems)} color="error">
                          <AddShoppingCart />
                        </Badge>
                      </CartButton>
                      <Drawer anchor='right' open={cartOpen} onClose={()=>setCartOpen(false)}>
                        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
                      </Drawer>
                      <Grid container spacing={3}>
                          {productItems.map((item)=> {
                                  return(
                                      <Grid key={item.id} item xs={12} sm={3} >
                                          <ProductItem item={item} handleAddToCart = {handleAddToCart} />
                                      </Grid>
                              )
                          })}

                      </Grid>
                    </Box>
                  {/* <p>{value.description}</p> */}
                  <br />
                </Box>
              </Box>
    );
};
