import Products from "../../components/shopify/Products";

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
import Cart from "../../components/shopify/Cart";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { setCartOpen } from "../../store/cartUI/actions";

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

export const MarketplacePage: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    //Cart Management
    // const [cartOpen, setCartOpen] = useState(false);
    const cartUI = useSelector((state: RootState) => state.cartUI);
    const shopify = useSelector((state: RootState) => state.shopify);
    // const { cart } = shopify;
    const { cart } = useSelector((state: RootState) => state.shopify)

    const { isCartOpen } = cartUI;

    return (
            <Box>
                <DefaultToolbar  title='Academy' color='primary' backgroundColor='inherit' />
                <StyledTypography variant={sm ? 'subtitle1' : md ? 'h6' : 'h5'}>
                    Marketplace
                </StyledTypography>
                {/* <DisplayProducts />  */}
                <CartButton onClick={()=>setCartOpen(true)}>
                    <Badge badgeContent={cart?.lineItemCount} color="error">
                        <AddShoppingCart />
                    </Badge>
                </CartButton>
                <Drawer anchor='right' open={isCartOpen} onClose={()=>setCartOpen(false)}>
                    <Cart />
                </Drawer>
                <Box sx={{backgroundColor:'rgb(210, 89, 90)'}}>
                    <Products />
                </Box>
            </Box>
    );
};
