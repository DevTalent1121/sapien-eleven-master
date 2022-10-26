import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppBar, IconButton, Theme, Toolbar, Typography, useTheme, useMediaQuery, AppBarProps, Link, Box, Button } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { EmptyState } from '@brightlayer-ui/react-components';
import Menu from '@mui/icons-material/Menu';
import Event from '@mui/icons-material/Event';
import { useDrawer } from '../../contexts/drawerContextProvider';


/// Changed to use dispatch
import { TOGGLE_DRAWER } from '../../store/menu/actions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../store";
import LogoImage from '../../assets/images/RedLogo500.png';
import { styled } from '@mui/material/styles';
import { TwitterIconSVG as TwitterIcon } from '../../assets/images/twitter_icon';
import { PADDING } from '../../shared';


// Wallet Library Imports
import { useWeb3React } from "@web3-react/core"
import { injected } from "../../components/wallet/connectors"

// import { WALLET_CONNECTED, WALLET_DISCONNECTED } from '../../store/wallet/types';
// import { connect1 } from '../../store/wallet/actions';

declare var window: any
// Class and Components implementation
export type DefaultToolbarProps = AppBarProps & {
    title?: string;
    // color?: 'primary' | 'secondary' | 'default';
    color?: 'primary' | 'secondary' | 'default';
    backgroundColor?: 'primary' | 'secondary' | 'inherit' |'default';
    subtitle?: string;
    navigationIcon?: JSX.Element;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    })
);


export const DefaultToolbar = (props: DefaultToolbarProps): JSX.Element => {
    const { title, color, backgroundColor, subtitle, navigationIcon, ...other } = props;

    const StyledConnectButton = styled(Button)(() => ({
        minWidth: 200,
        width: 200,
        fontWeight: 600,
        // margin: `${theme.spacing(3)} 0 0`,
        marginLeft:'auto',
        borderColor: color,
        color: color,

        [theme.breakpoints.down('md')]: {
            padding: 3,
            minWidth: 100,
            width: 100,
        },
    
    }));
    const StyledTwitterButton = styled(Button)(()=>({
        color: color,
        maxWidth: 50,
        minWidth: 32,
        maxHeight: 50,
        paddingLeft: 12,
        // margin: 0,
        marginLeft: 5,
        borderRadius: '50%',
        [theme.breakpoints.down('md')]: {
            paddingLeft: 8,
        },
    }))
    // const StyledRightBox = styled(Box)(() => ({
    //     marginLeft:'auto',
    //     color: color
    // }));


    const theme = useTheme();
    const classes = useStyles(theme);
    const { setDrawerOpen } = useDrawer();
    const md = useMediaQuery(theme.breakpoints.up('md'));

    const dispatch = useDispatch();
    // const drawerOpen = useSelector((state: AppState) => state.app.drawerOpen);
    const drawerOpen = useSelector((state: RootState) => state.menu.drawerOpen);
    // const wallet_connected = useSelector((state: RootState) => state.wallet.connected);
    // const wallet_address = useSelector((state: RootState) => state.wallet.address);

    // ****Web3 Connection Mobile
    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    function handleConnect(){
        if (localStorage?.getItem('isWalletConnected') === 'true') {
            disconnect();
        }
        else{
            connect();
        }
    }

    async function connect() {
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            try {
                await activate(injected)
                localStorage.setItem('isWalletConnected', "true")
              } catch (ex) {
                console.log(ex)
              }
        }else{
            alert("install metamask extension!!")
        }
      }
    
      async function disconnect() {
        try {
          await deactivate()
          localStorage.setItem('isWalletConnected', "false")
        } catch (ex) {
          console.log(ex)
        }
      }

      useEffect(() => {
        const connectWalletOnPageLoad = async () => {
          if (localStorage?.getItem('isWalletConnected') === 'true') {
            try {
              await activate(injected)
              localStorage.setItem('isWalletConnected', "true")
            } catch (ex) {
              console.log(ex)
            }
          }
        }
        connectWalletOnPageLoad()
      }, [])

    //   console.log("--account: " + account);
    //   console.log("--active: " + active);
      console.log("--isWalletConnected: " + localStorage?.getItem('isWalletConnected'));
    
    return (
        <>
            <AppBar position={'sticky'} 
            style={{
                backgroundColor: theme.palette.background.paper,
            }}
                >
                <Toolbar className={classes.toolbar}  sx={{ display: 'flex', justifyContent: 'space-between', padding: { sm: `0 ${PADDING}px` } }}>
                    <Box sx={{display: 'flex'}}>
                    {/* {md ? null : ( */}
                        <IconButton
                            color={color}
                            onClick={(): void => {
                                console.log("clicked menu button");
                                // setDrawerOpen(true);
                                dispatch({ type: TOGGLE_DRAWER, payload: !drawerOpen });
                            }}
                            edge={'start'}
                            // style={{ marginRight: theme.spacing(3) }}
                            size="large"
                        >
                            <Menu />
                        </IconButton>
                    {/* )} */}
                    { md? (
                        <Link href='/'>
                            <img src={LogoImage} alt={"Logo"} style={{ width: 160 }} />
                        </Link>
                
                    ):null
                    }
                        
                    </Box>
                    <Box>
                    <Typography variant={'h6'} color={color}>
                        {/* {props.title} */}
                    </Typography>
                    </Box>
                    <Box sx={{display: 'flex', marginRight:'30px'}}>
                        <StyledConnectButton variant={'outlined'} onClick={handleConnect}>
                            {active ? <span className='simple_text'>{account}</span> : <span className='simple_text'>Connect</span>}
                        </StyledConnectButton>
                            {/* {connectWalletButton()} */}
                        <StyledTwitterButton
                            aria-label="twitter"
                            // target="_blank"
                            href={`https://twitter.com/SapienElevenNFT`}
                            color={'inherit'}
                            startIcon={<TwitterIcon color={theme.palette.primary.main} size={32} />}
                        >
                            {/* @SapienElevenNFT */}
                        </StyledTwitterButton>
                    </Box>

                </Toolbar>
            </AppBar>
        </>
    );
};
// DefaultToolbar.propTypes = {
//     title: PropTypes.string,
//     color: PropTypes.oneOf(['primary', 'secondary', 'default']),
//     subtitle: PropTypes.string,
//     navigationIcon: PropTypes.element,
// };
// DefaultToolbar.defaultProps = {
//     color: 'primary',
// };
