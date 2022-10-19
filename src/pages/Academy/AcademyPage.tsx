import React from 'react';
import { AppBar, IconButton, Theme, Toolbar, Typography, useTheme, useMediaQuery, Divider } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { EmptyState } from '@brightlayer-ui/react-components';
import Menu from '@mui/icons-material/Menu';
import Event from '@mui/icons-material/Event';
import { useDrawer } from '../../contexts/drawerContextProvider';

import { DefaultToolbar } from '../../components/navigation/DefaultToolbar';
import { AcademyDescription } from './AcademyDescription';
import AcademyTabs from './AcademyTabs';
import { TransitionGradient } from '../../components';
import { TRANSITION_GRADIENT_HEIGHT } from '../../shared';
import {Colors } from '../../themes';

//Additional for Drawer


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
        root: {
            backgroundColor:Colors.red[400],
        }
    })
);

export const AcademyPage = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { setDrawerOpen } = useDrawer();
    const md = useMediaQuery(theme.breakpoints.up('md'));
    // const dispatch = useDispatch();

    

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* <AppBar position={'sticky'}>
                <Toolbar className={classes.toolbar}>
                    {md ? null : (
                        <IconButton
                            color={'inherit'}
                            onClick={(): void => {
                                setDrawerOpen(true);
                            }}
                            edge={'start'}
                            style={{ marginRight: theme.spacing(3) }}
                            size="large"
                        >
                            <Menu />
                        </IconButton>
                    )}
                    <Typography variant={'h6'} color={'inherit'}>
                        Page One
                    </Typography>
                </Toolbar>
            </AppBar> */}
            
            <DefaultToolbar  title='Academy' color='primary' backgroundColor='inherit' />
            
            {/* <AcademyDescription color='red' /> */}
            
            {/* <Divider /> */}

            {/* <TransitionGradient gradientStart={'white'} gradientEnd={'#DA7777'} pinToBottom={false} /> */}
            <AcademyTabs />
            {/* <TransitionGradient
                offset={`-${TRANSITION_GRADIENT_HEIGHT}px`}
                gradientStart={'#ffffff00'}
                gradientEnd={'#fff'}
            /> */}
            
        </div>
    );
};
