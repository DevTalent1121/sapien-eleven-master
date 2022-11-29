import React, { useState, useCallback } from 'react';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useNavigate, useLocation } from 'react-router';
import Menu from '@mui/icons-material/Menu';
import { Drawer, DrawerBody, DrawerHeader, DrawerNavGroup, DrawerNavItem } from '@brightlayer-ui/react-components';
import { PAGES } from './routes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../store";

import { TOGGLE_DRAWER } from '../store/menu/actions';
import { textAlign } from '@mui/system';

const JoinSapienElevenButton = styled(Button)(() => ({
    minWidth: '50%',
    width: '80%',
    fontWeight: 600,
    margin: "20px auto",
    // margin: `${theme.spacing(3)} 0 0`,
    borderColor: '#ca3c3d',
    color: '#ca3c3d',
    border: "1px solid #ca3c3d",
    display: "block",


}));

export const NavigationDrawer: React.FC = () => {
    const drawerOpen = useSelector((state: RootState) => state.menu.drawerOpen);
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const isLandingPage = location.pathname === '/';
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [selected, setSelected] = useState(location.pathname);

    const handleNavigate = useCallback(
        (id: string): void => {
            navigate(id);
            setSelected(id);
        },
        [navigate, setSelected]
    );
    const isWalletConnected = (localStorage?.getItem('isWalletConnected')==="true")
    console.log("--drawer wallet connected status--"+isWalletConnected)

    const drawerItems = PAGES.map((page) => {
            console.log(page.private)
            // if(!page.private)
            {
                const Icon = page.icon;
                let t_item = undefined;
                if(page?.items != undefined){ 
                    t_item = page.items?.map((item)=>{
                        return {
                            title: item.title,
                            itemID: `${page.route}/${item.route}` || '',
                            // icon: <Icon />,
                            onClick:
                                item.route !== undefined
                                    ? (): void => {
                                        handleNavigate(`${page.route}/${item.route}`);
                                        /*if (isMobile)*/ dispatch({ type: TOGGLE_DRAWER, payload: !drawerOpen });
                                    }
                                    : undefined,
                                    }
                    }) 
                }
                return {
                    title: page.title,
                    itemID: page.route || '',
                    icon: <Icon />,
                    hidden: page.private && !isWalletConnected,
                    onClick:
                        page.route !== undefined
                            ? (): void => {
                                  handleNavigate(page.route);
                                  /*if (isMobile)*/ dispatch({ type: TOGGLE_DRAWER, payload: !drawerOpen });
                              }
                            : undefined,
                    items: t_item
                }; 
            }
        })
        // drawerItems = drawerItems.filter(function( element ) {
        //     return element !== undefined;
        //  });

         console.log(drawerItems)
    return (
        <Drawer
            open={drawerOpen}
            ModalProps={{
                onBackdropClick: (): void => {
                    dispatch({ type: TOGGLE_DRAWER, payload: false });
                },
            }}
            // variant={isMobile || isLandingPage ? 'temporary' : 'persistent'}
            variant={'temporary'}
            activeItem={selected}
            width={300}
        >
            <DrawerHeader
                title={'Sapien Eleven'}
                subtitle={'A Web3 Wellness Brand'}
                icon={<Menu />}
                onIconClick={(): void => {
                    dispatch({ type: TOGGLE_DRAWER, payload: !drawerOpen });
                }}
            />
            <DrawerBody>
                <DrawerNavGroup
                hidePadding={false}
                
                items={drawerItems}
             />
             {/* {{isWalletConnected?}} */}
            <Box sx={{margin:2, padding:2, border:"1px solid #ca3c3d"}}>
                <Typography sx={{textAlign:"center"}}>Connect Wallet or click below to join Sapien Eleven</Typography> 
                <JoinSapienElevenButton>Join Sapien Eleven</JoinSapienElevenButton>
            </Box>
            </DrawerBody>
        </Drawer>
    );
};
