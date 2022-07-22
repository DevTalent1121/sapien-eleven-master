import React from 'react';

// Images
import BackgroundImage from '../../assets/images/network_texture_red_700.png';

// @mui imports
import styled from '@mui/material/styles/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/styles/useTheme';

// components
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const StyledBanner = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: `${theme.spacing(20)} ${theme.spacing(4)}`,
    color: theme.palette.primary.contrastText,
    background: `url(${BackgroundImage})`,
    backgroundColor: theme.palette.primary.main,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(19),
    },
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

export const Banner: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <StyledBanner>
            <StyledTypography variant={sm ? 'h5' : md ? 'h4' : 'h3'}>
                <Box component={'span'}>Sapien Eleven</Box>
            </StyledTypography>
            {/* <StyledButton variant={'outlined'} color={'inherit'} onClick={(): void => {}}>
                GET STARTED
            </StyledButton> */}
        </StyledBanner>
    );
};
