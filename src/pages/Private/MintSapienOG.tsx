import React, { useEffect, useState } from 'react';

// Images

// @mui imports
import styled from '@mui/material/styles/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/styles/useTheme';

// components
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

import {Box, Card, CardContent, CardActions, Button, Typography, Theme} from "@mui/material"

//
import { DefaultToolbar } from '../../components/navigation/DefaultToolbar';
import CardMedia from '@mui/material/CardMedia';

import sampleImage from '../../assets/headshots/brett_prothman_web2.png';


const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.background.paper,
    fontFamily: 'besan',
    textAlign: 'center',
    padding: '10px',
    paddingTop: '5vh'
}));

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
        root: {
            backgroundColor:"inherit",
        }
    })
);


const handleMint = () => {
    console.log(localStorage?.getItem('walletAddress'))
}

export const MintSapienOGPage: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    const classes = useStyles(theme);

    const [aMintCount, setAlreadyMintedCount] = useState(0);
    const [mintCount, setMintCount] = useState(0);

    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [url, setURL] = useState("");

    return (
        <Box sx={{background:"white",minHeight:"100vh"}}>
            <DefaultToolbar  title='Academy' color='primary' backgroundColor='inherit' />
            <StyledTypography variant={sm ? 'subtitle1' : md ? 'h6' : 'h5'}>
                
            </StyledTypography> 
            <Box p={3}>
                <Card sx={{ minWidth: 275, maxWidth:450, margin: "auto", paddingTop: 3, backgroundColor:"#222", borderRadius: 3 }}>
                    <CardMedia
                        sx={{ height: 140, backgroundSize:"contain" }}
                        image={sampleImage}
                        title="green iguana"
                    />
                    <CardContent  sx={{maxWidth:350, textAlign:"center", margin:"auto", color:'white'}}>
                        <Typography variant='h5' mb={4} color="white" sx={{textAlign:"center"}} gutterBottom>
                        Mint SapienOG NFT
                        </Typography>
                        <Typography component="span" sx={{color: "#ddd"}}>
                        Collect unique NFT art pieces, become part of our community!
                        </Typography>
                        <Typography sx={{ mb: 2, mt: 2, color:"#aaa" }}>
                        {aMintCount} / 2550 already minted
                        </Typography>
                        <Box className="buttons" mt={4} mb={1} sx={{display:'flex',justifyContent: 'center'}}>
                            <Typography sx={{color:"#aaa", fontSize:"12"}} p={1} component="div">
                                Amount: 
                            </Typography>
                            <Button
                                sx={{padding:'1px', minWidth:45, backgroundColor:"#265e96",borderRadius:"5px 0px 0px 5px"}}
                                size="small"
                                disableElevation
                                variant="contained"
                                onClick={()=>{}}
                            >
                                -
                            </Button>
                            <Box p={1} minWidth={45} sx={{backgroundColor:"#265e96", borderLeft:"1px solid grey", borderRight:"1px solid grey"}}>
                                {mintCount}
                            </Box>
                            <Button
                                sx={{padding:'1px', minWidth:45, backgroundColor:"#265e96", borderRadius:"0px 5px 5px 0px"}}
                                size="small"
                                disableElevation
                                variant="contained"
                                onClick={()=>{}}
                            >
                                +
                            </Button>
                        </Box>
                        <Box sx={{display: 'flex', margin: "auto", minHeight:30, alignItems:"center", maxWidth:200, minWidth:"100px",justifyContent:"space-between"}}>
                            <Typography>
                                Total:
                            </Typography>
                            <Typography variant="h6">
                                {mintCount} ETH
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions sx={{marginTop: 3, marginBottom:2}}>
                        <Box sx={{margin: 'auto'}}>
                            <Button
                                sx={{ minWidth:200, backgroundColor: "#0464c4",color: "white", minHeight:45}}
                                size="small"
                                disableElevation
                                variant="contained"
                                onClick={handleMint}
                            >
                                Mint
                            </Button>
                        </Box>
                    </CardActions>
                </Card>            

            </Box>
        </Box>
    );
};
