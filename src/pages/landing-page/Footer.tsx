import React from 'react';
import * as Colors from '../../themes/colors';

// @mui imports
import styled from '@mui/material/styles/styled';

// components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const CopyrightAppBar = styled(
    AppBar,
    {}
)(() => ({
    zIndex: 0,
    backgroundColor: Colors.darkBlack[100],
    color: Colors.white[50],
    textAlign: 'center',
}));

export const Footer = (): JSX.Element => (
    <CopyrightAppBar position={'static'} elevation={0}>
        <Toolbar variant={'dense'}>
            <Typography variant={'caption'} align={'center'} style={{ flex: '1 1 0px' }}>
                Copyright {new Date().getFullYear()} Sapien Eleven.
            </Typography>
        </Toolbar>
    </CopyrightAppBar>
);
