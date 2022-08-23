import React, { useEffect, useState } from 'react';

// Images

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
    padding: '10px',
    paddingTop: '5vh'
}));



export const WLMintPage: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box>
            <DefaultToolbar  title='Academy' color='primary' backgroundColor='inherit' />
            <StyledTypography variant={sm ? 'subtitle1' : md ? 'h6' : 'h5'}>
                WLMint Page
            </StyledTypography> 
        </Box>
    );
};
