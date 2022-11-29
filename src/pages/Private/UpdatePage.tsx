import React, { useEffect, useState } from 'react';

// Images
// import BackgroundImage from '../../assets/images/network_texture_red_700.png';
import BackgroundImage from '../../assets/images/lounge.jpg';

// @mui imports
import styled from '@mui/material/styles/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/styles/useTheme';

// components
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DefaultToolbar } from '../../components/navigation/DefaultToolbar';

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.background.paper,
    // fontFamily: 'besan',
    textAlign: 'center',
    paddingTop: '3vh',
    width: '90%',
    margin: 'auto'
    // [theme.breakpoints.down('md')]: {
    //     height: '75vh'
    // },
}));


const BannerBackgroundBox = styled(Box)(({ theme }) => ({
    // padding: `${theme.spacing(20)} ${theme.spacing(4)}`,
    color: theme.palette.primary.contrastText,
    background: `url(${BackgroundImage})`,
    // borderBottom:  `5px solid ${theme.palette.primary.main}`,
    backgroundColor: 'rgb(210, 89, 90)',
    backgroundSize: 'contain',
    height: '63vh',
    width: '90%',
    margin: 'auto',
    marginTop: '3vh',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    overflow: 'hidden',
    // [theme.breakpoints.down('lg')]: {
    //     // paddingTop: theme.spacing(19),
    //     height: '60vh'
    // },
    [theme.breakpoints.down('md')]: {
        // paddingTop: theme.spacing(19),
        height: '35vh'
    },
}));



export const UpdatePage: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{backgroundColor:'rgb(210, 89, 90)'}}>
            <DefaultToolbar  title='Academy' color='primary' backgroundColor='inherit' />
            <StyledTypography variant={sm ? 'subtitle1' : md ? 'h6' : 'h6'} sx={{fontFamily:'besan'}}>
            This is Update Page
            </StyledTypography>
        </Box>
    );
};
