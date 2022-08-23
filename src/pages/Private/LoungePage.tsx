import React, { useEffect, useState } from 'react';

// Images
// import BackgroundImage from '../../assets/images/network_texture_red_700.png';
import BackgroundImage from '../../assets/images/lounge.jpg';
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
    height: '65vh',
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
        height: '50vh'
    },
}));



export const LoungePage: React.FC = (): JSX.Element => {
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
            <StyledTypography variant={sm ? 'subtitle1' : md ? 'h6' : 'h6'}>
            Expressed in hundredths a whole of a part.<br />
            Had you DYOR, you’ve seen the results of combining all three riddle answers. There you will find a secret passage to the final challenge. Complete the necessary task to earn a free mint (plus gas).  Timing is crucial! <br /> 
            WAKA WAKA WAKA WAKA
            </StyledTypography> 
        </Box>
    );
};
