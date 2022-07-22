import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { AppBar, AppBarProps, Spacer } from '@brightlayer-ui/react-components';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { TOGGLE_DRAWER } from '../../redux/actions';
import { AppState } from '../../redux/reducers';
import { PADDING } from '../../shared';

// @mui imports
import { styled } from '@mui/material/styles';
import useTheme from '@mui/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';

// components
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import { TwitterIconSVG as TwitterIcon } from '../../assets/images/twitter_icon';


// icons
import Menu from '@mui/icons-material/Menu';

export type SharedToolbarProps = AppBarProps & {
    title?: string;
    color?: 'primary' | 'secondary' | 'default';
    subtitle?: string;
    navigationIcon?: JSX.Element;
};

const MenuIconButton = styled(IconButton, {
    name: 'shared-toolbar',
    slot: 'menu-icon-button',
})(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(0.5),
}));
const twitterButtonStyles = {
    marginLeft: 'auto'
}

export const SharedToolbar = (props: SharedToolbarProps): JSX.Element => {
    const { title, color, subtitle, navigationIcon, ...other } = props;
    const icon = navigationIcon ? navigationIcon : <Menu />;
    const theme = useTheme();
    const location = useLocation();
    const isLandingPage = location.pathname === '/';
    const drawerOpen = useSelector((state: AppState) => state.app.drawerOpen);
    const sidebarOpen = false;
    const showBanner = false;
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const dispatch = useDispatch();

    const getNavigationIcon = useCallback(
        () => (
            <>
                {((md && navigationIcon !== undefined && !isLandingPage) || isLandingPage) && (
                    <MenuIconButton
                        color={'inherit'}
                        onClick={(): void => {
                            dispatch({ type: TOGGLE_DRAWER, payload: isLandingPage ? true : !drawerOpen });
                        }}
                        edge={'start'}
                    >
                        {icon}
                    </MenuIconButton>
                )}
            </>
        ),
        [navigationIcon]
    );

    return (
        <>
            <AppBar
                position="sticky"
                variant={'collapsed'}
                color={color}
                elevation={0}
                style={{
                    zIndex: 1000,
                    width: `calc(100% - ${sidebarOpen ? (sm ? 0 : 350) : 0}px)`,
                    right: sidebarOpen ? (sm ? 0 : 350) : 0,
                    transition: `width ${theme.transitions.duration.standard} ${theme.transitions.easing.easeInOut}`,
                    top: showBanner ? theme.spacing(sm ? 7 : 8) : 0,
                }}
                {...other}
            >
                <Toolbar sx={{ display: 'flex', padding: { sm: `0 ${PADDING}px` } }}>
                    {getNavigationIcon()}
                    {props.title ? (
                        <ListItemText
                            primary={
                                <Typography variant={'h6'} style={{ fontWeight: 600, lineHeight: 1 }}>
                                    {title}
                                </Typography>
                            }
                            secondary={subtitle}
                        />
                    ) : (
                        <Typography variant={'h6'} color={'inherit'} style={{ fontWeight: 600, lineHeight: 1 }}>
                            Sapien Eleven
                        </Typography>                    
                    )}
                        <Button
                        sx={twitterButtonStyles}
                        aria-label="twitter"
                        target="_blank"
                        href={`https://twitter.com/SapienElevenNFT`}
                        color={'inherit'}
                        startIcon={<TwitterIcon color={theme.palette.primary.light} size={32} />}
                    >
                        {/* @SapienElevenNFT */}
                    </Button>
                </Toolbar>
                
                <Spacer />
            </AppBar>
        </>
    );
};
SharedToolbar.propTypes = {
    title: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'secondary', 'default']),
    subtitle: PropTypes.string,
    navigationIcon: PropTypes.element,
};
SharedToolbar.defaultProps = {
    color: 'primary',
};
