import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles, createStyles, useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as Colors from '../../themes/colors';
import { ParallaxContainer, Section, TransitionGradient } from '../../components';
import { TRANSITION_GRADIENT_HEIGHT } from '../../shared';
import SAD from '../../assets/images/shutterstock_1543784279.jpg';
import { Divider, Grid, styled, Theme } from '@mui/material';
import { AcademyVideos } from './AcademyVideos';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
      color: 'secondary'
    };
  }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selected: {
    color: 'white !important',
    },
  })
);


  const introTexts: String[] =[
    "Hate going to the gym? Don’t know what to do if you even get to the gym? Why not workout from home, at your own convenience?",
    "Bringing the mental and physical disciplines together is important to achieve mind and body peace. Yoga has been proven to manage stress and anxiety, keeping one relaxed. ",
    "Understanding the nutrients that foods contain is important when setting out to achieve new wellness goals.  Sapien Eleven has done the hard work for you.",
    "Keeping up with the diet trends can be hard work. Sapien Eleven has outlined their favorites here.",
    "Finding recipes is easy. Finding step-by-step instructions and a detailed grocery list is not. ",
    "Consuming a diet packed with nutrient dense foods can be tough. Supplementing with properly sourced bioavailable supplements can play a vital role in improving health and preventing disease."
  ]; 

  export default function AcademyTabs() {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));

    const [value, setValue] = React.useState(0);
    const [introText, setIntroText] = React.useState(introTexts[0]);
  
    const [stateOfHealthContentHeight, setStateOfHealthContentHeight] = React.useState(0);

    const onStateOfHealthContentChange = (height: number): void => {
        setStateOfHealthContentHeight(height);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
      setIntroText(introTexts[newValue]);
    };

    const Paragraph = styled(
      Typography,
      {}
    )(() => ({
      color: theme.palette.background.paper,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
      height:30
    }));
    
    const classes = useStyles();
    return (
      
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
            The Sapien Eleven Wellness Academy is an archive of experiences to motivate and empower you to achieve your wellness goals.          
          </Paragraph>          
          <Grid container spacing={4} sx={{ mt: 2, justifyContent: 'center' }}>
                <Grid
                    item
                    xs={12}
                    sm={4}
                    md={3}
                    lg={2}
                    xl={2}
                >

                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        textColor={'primary'}
                        onChange={handleChange}
                        aria-label="Academy Categories"
                        sx={{ paddingTop:10, borderRight: 1, borderColor: 'divider'}}
                    >
                        <Tab classes={{selected: classes.selected}} label="Fitness" {...a11yProps(0)} />
                        <Tab label="Yoga" {...a11yProps(1)} />
                        <Tab label="Nutrition" {...a11yProps(2)} />
                        <Tab label="Diets" {...a11yProps(3)} />
                        <Tab label="Recipes" {...a11yProps(4)} />
                        <Tab label="Supplements" {...a11yProps(5)} />
                    </Tabs>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={9}
                    lg={10}
                    xl={10}
                    color={'white'}
                >
                    <Paragraph>
                      {introText}          
                    </Paragraph>
                    <Divider />        
    
                    <TabPanel value={value} index={0}>
                      <AcademyVideos />
                      <AcademyVideos />
                      <AcademyVideos />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <AcademyVideos />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <AcademyVideos />
                  </TabPanel>
                    <TabPanel value={value} index={3}>
                      <AcademyVideos />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                      <AcademyVideos />
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                      <AcademyVideos />
                    </TabPanel>
                </Grid>
            </Grid>
        </Section>
      );
    }