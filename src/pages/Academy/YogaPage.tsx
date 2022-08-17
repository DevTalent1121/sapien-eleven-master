import React from 'react';
import { AppBar, IconButton, Theme, Toolbar, Typography, useTheme, useMediaQuery, Box, styled } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { EmptyState } from '@brightlayer-ui/react-components';
import Menu from '@mui/icons-material/Menu';
import Event from '@mui/icons-material/Event';
import { useDrawer } from '../../contexts/drawerContextProvider';

import { DefaultToolbar } from '../../components/navigation/DefaultToolbar';
import { Section, SharedToolbar } from '../../components';
import { Colors } from '../../themes';
import { TRANSITION_GRADIENT_HEIGHT } from '../../shared';
import { AcademyVideos } from './AcademyVideos';

//Additional for Drawer


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
        body:{
            backgrondColor: 'primary'
        }
    })
);

export const YogaPage = (): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { setDrawerOpen } = useDrawer();
    const md = useMediaQuery(theme.breakpoints.up('md'));
    // const dispatch = useDispatch();

    console.log("---aa this is fitness page");

    const Paragraph = styled(
        Typography,
        {}
      )(() => ({
        color: theme.palette.background.paper,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3)
      }));

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
            <DefaultToolbar  title='Fitness' color='primary' backgroundColor='inherit' />
            <Section
                // title={'What Now?'}
                title={"Wellness Academy"}
                align={'left'}
                fontColor={Colors.white[50]}
                dividerColor={Colors.white[50]}
                dividerHighlightColor={Colors.black[500]}
                style={{ backgroundColor: Colors.red[400] }}
                sx={{ px: md ? 2 : 4, pt: 4, pb: `${32 + TRANSITION_GRADIENT_HEIGHT}px` }}
            >                    
                <Paragraph>
                    Brining the mental and physical disciplines together is important to achieve mind and body peace. Yoga has been proven to manage stress and anxiety, keeping one relaxed. 
                </Paragraph>
                <AcademyVideos />
                <AcademyVideos />
                <AcademyVideos />
            </Section>          

        </Box>
    );
};
