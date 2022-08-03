import React, { useEffect, useState } from 'react';

// Images
// import BackgroundImage from '../../assets/images/network_texture_red_700.png';
import BackgroundImage from '../../assets/images/GraphicBackgroundText.png';
import BubbleImage from '../../assets/images/BubblesRed.png';

// @mui imports
import styled from '@mui/material/styles/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/styles/useTheme';

// components
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { ParallaxContainer } from '../../components';
// import { ParallaxContainer } from '../../components';

// const StyledBanner = styled(Box)(({ theme }) => ({
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     width: '100%',
//     padding: `${theme.spacing(20)} ${theme.spacing(4)}`,
//     color: theme.palette.primary.contrastText,
//     background: `url(${BackgroundImage})`,
//     backgroundColor: theme.palette.primary.main,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center center',
//     [theme.breakpoints.up('sm')]: {
//         paddingTop: theme.spacing(19),
//     },
// }));
const StyledBanner = styled(Box)(({ theme }) => ({
    width: '100%',
    // padding: `${theme.spacing(20)} ${theme.spacing(4)}`,
    color: theme.palette.primary.contrastText,
    // background: `url(${BackgroundImage})`,
    backgroundColor: theme.palette.background.paper,
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
    // [theme.breakpoints.up('sm')]: {
    //     paddingTop: theme.spacing(19),
    // },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.background.paper,
    fontFamily: 'besan',
    textAlign: 'center',
}));

// const StyledButton = styled(Button)(({ theme }) => ({
//     minWidth: 150,
//     fontWeight: 600,
//     margin: `${theme.spacing(3)} 0 0`,
//     borderColor: theme.palette.background.paper,
// }));

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

// const BubbleBox = styled(Box)(({theme})=>({
//     width: '100%',
//     color: theme.palette.primary.contrastText,
//     height: '40vh',
//     paddingTop: '50%',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center center'
// }));

export const Banner: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const [offset, setOffset] = useState(0)
    const onScroll:any = () => {
            const offsetPos = document.body.scrollTop;
            setOffset(offsetPos);
            console.log('--aa',offsetPos);
    };

    const BubbleContainer = styled(Box)(()=>({
        width: '100%',
        height: '100%',
        backgroundRepeat: 'no-repeat',        
        transform: [`translateY(${offset*3}px)`], 
        backgroundSize:'contain',
        backgroundImage: `url(${BubbleImage})`,
        backgroundPosition: 'center bottom',
    }));
    
    useEffect(() => {
            document.body.addEventListener("scroll", onScroll);
            return () => document.body.removeEventListener("scroll", onScroll);        
    },[]);
    return (

            <StyledBanner>
                {/* <img src={BackgroundImage} sx={{width:'100%'}} /> */}
                <BannerBackgroundBox>
                    <BubbleContainer>                    
                        {/* <BubbleBox>
                        </BubbleBox> */}
                    </BubbleContainer>
                </BannerBackgroundBox>
                <StyledTypography variant={sm ? 'h5' : md ? 'h4' : 'h3'}>
                    {/* <Box component={'span'}>Sapien Eleven</Box> */}
                </StyledTypography>
                {/* <StyledButton variant={'outlined'} color={'inherit'} onClick={(): void => {}}>
                    GET STARTED
                </StyledButton> */}
            </StyledBanner>
    );
};
