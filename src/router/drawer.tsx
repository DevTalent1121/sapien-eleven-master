import React, { useState, useCallback } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router';
import Menu from '@mui/icons-material/Menu';
import { Drawer, DrawerBody, DrawerHeader, DrawerNavGroup } from '@brightlayer-ui/react-components';
import { PAGES } from './routes';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../redux/reducers';
import { TOGGLE_DRAWER } from '../redux/actions';

export const NavigationDrawer: React.FC = () => {
    const drawerOpen = useSelector((state: AppState) => state.app.drawerOpen);
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

    return (
        <Drawer
            open={drawerOpen}
            ModalProps={{
                onBackdropClick: (): void => {
                    dispatch({ type: TOGGLE_DRAWER, payload: false });
                },
            }}
            variant={isMobile || isLandingPage ? 'temporary' : 'persistent'}
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
                    items={PAGES.map((page) => {
                        const Icon = page.icon;
                        return {
                            title: page.title,
                            itemID: page.route || '',
                            icon: <Icon />,
                            onClick:
                                page.route !== undefined
                                    ? (): void => {
                                          handleNavigate(page.route);
                                          if (isMobile) dispatch({ type: TOGGLE_DRAWER, payload: !drawerOpen });
                                      }
                                    : undefined,
                        };
                    })}
                    hidePadding
                />
            </DrawerBody>
        </Drawer>
    );
};
