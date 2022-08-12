import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/styles';
import * as Colors from '../../themes/colors';
import { TransitionGradient } from '../../components';

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
  
  export default function AcademyTabs() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    const theme = useTheme();

    return (
        <Box
          sx={{ flexGrow: 1, bgcolor: 'transparent', display: 'flex'}}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            textColor={'primary'}
            onChange={handleChange}
            aria-label="Academy Categories"
            sx={{ borderRight: 1, borderColor: 'divider'}}
          >
            <Tab label="Fitness" {...a11yProps(0)} />
            <Tab label="Yoga" {...a11yProps(1)} />
            <Tab label="Nutrition" {...a11yProps(2)} />
            <Tab label="Diets" {...a11yProps(3)} />
            <Tab label="Recipes" {...a11yProps(4)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            Fitness
          </TabPanel>
          <TabPanel value={value} index={1}>
            Yoga
          </TabPanel>
          <TabPanel value={value} index={2}>
            Nutrition
          </TabPanel>
          <TabPanel value={value} index={3}>
            Diets
          </TabPanel>
          <TabPanel value={value} index={4}>
            Recipes
          </TabPanel>
        </Box>
      );
    }