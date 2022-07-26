import React from 'react';
import * as Colors from '../../themes/colors';

// @mui imports
import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

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
const AdditionalLinkBar = styled(
    AppBar,
    {}
)(() => ({
    zIndex: 0,
    backgroundColor: Colors.darkBlack[100],
    color: Colors.white[50],
    textAlign: 'center',
}));


export const Footer = (): JSX.Element => (
    <Box
    sx={{
      width: "100%",
      height: "auto",
      backgroundColor: "secondary.main",
      paddingTop: "0",
      paddingBottom: "0",
    }}
  >

        <AdditionalLinkBar position={'static'} elevation={0}>
            <Toolbar variant={'dense'} sx={{ display: 'flex'}}>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid key={'privacy'} item xs={12} sm={12} md={6} lg={3} xl={3}>
                        <Button
                            aria-label="Privacy Policy"
                            target="_blank"
                            href={`https://app.termly.io/document/privacy-policy/69285855-a683-4600-b365-66d78acdb80c`}
                            color={'inherit'}
                        >
                        <Typography variant={'caption'} align={'center'} style={{ flex: '1 1 0px' }}>
                            Privacy Policy
                        </Typography>
                        </Button>
                    </Grid>
                    <Grid key={'terms'} item xs={12} sm={12} md={6} lg={3} xl={3}>
                        <Button
                                aria-label="Terms and Policy"
                                target="_blank"
                                href={`https://app.termly.io/document/terms-of-use-for-website/ab59fb5f-1dfa-48e2-8009-cdb707bfb3a9`}
                                color={'inherit'}
                            >
                            <Typography variant={'caption'} align={'center'} style={{ flex: '1 1 0px' }}>
                                Terms and Conditions
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid key={'disclaimer'} item xs={12} sm={12} md={6} lg={3} xl={3}>
                        <Button
                                aria-label="Disclaimer"
                                target="_blank"
                                href={`https://app.termly.io/document/disclaimer/a5465016-6413-4614-8f58-74aad1e8fd30`}
                                color={'inherit'}
                            >
                            <Typography variant={'caption'} align={'center'} style={{ flex: '1 1 0px' }}>
                                Disclaimer
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid key={'cookie'} item xs={12} sm={12} md={6} lg={3} xl={3}>
                        <Button
                                aria-label="Cookie Policy"
                                target="_blank"
                                href={`https://app.termly.io/document/cookie-policy/17a88541-64b2-4375-a07f-e4b2645ce070`}
                                color={'inherit'}
                            >
                            <Typography variant={'caption'} align={'center'} style={{ flex: '1 1 0px' }}>
                                Cookie Policy
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AdditionalLinkBar>
        <CopyrightAppBar position={'static'} elevation={0}>
            <Toolbar variant={'dense'}>
                <Typography variant={'caption'} align={'center'} style={{ flex: '1 1 0px' }}>
                    Copyright {new Date().getFullYear()} Sapien Eleven.
                </Typography>
            </Toolbar>
        </CopyrightAppBar>
    </Box>
);
