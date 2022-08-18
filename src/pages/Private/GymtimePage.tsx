import React, { useEffect, useState } from 'react';

// Images
// import BackgroundImage from '../../assets/images/network_texture_red_700.png';
import BackgroundImage from '../../assets/images/SapienElevenGym.png';
import BubbleImage from '../../assets/images/BubblesRed.png';

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
    fontFamily: 'besan',
    textAlign: 'center',
}));


const BannerBackgroundBox = styled(Box)(({ theme }) => ({
    width: '100%',
    // padding: `${theme.spacing(20)} ${theme.spacing(4)}`,
    color: theme.palette.primary.contrastText,
    background: `url(${BackgroundImage})`,
    // borderBottom:  `5px solid ${theme.palette.primary.main}`,
    backgroundSize: 'contain',
    height: '90vh',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center bottom',
    overflow: 'hidden',
    [theme.breakpoints.down('lg')]: {
        // paddingTop: theme.spacing(19),
        height: '60vh'
    },
    [theme.breakpoints.down('md')]: {
        // paddingTop: theme.spacing(19),
        height: '30vh'
    },
}));


export const GymtimePage: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box>
            <DefaultToolbar  title='Academy' color='primary' backgroundColor='inherit' />
            <BannerBackgroundBox>
                <StyledTypography variant={sm ? 'h5' : md ? 'h4' : 'h3'}>
                    {/* <Box component={'span'}>Sapien Eleven</Box> */}
                </StyledTypography>
            </BannerBackgroundBox>
        </Box>
    );
};
