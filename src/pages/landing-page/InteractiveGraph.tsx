import React, { PureComponent } from 'react';
import * as Colors from '../../themes/colors';
import { Section } from '../../components';
import { TRANSITION_GRADIENT_HEIGHT } from '../../shared';

// @mui imports
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/styles/useTheme';

// components
import Box from '@mui/material/Box';
import { styled, Tab, Tabs } from '@mui/material';
import Typography from '@mui/material/Typography';

// Graph Component
import {ComposedChart,Line,Area,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer,} from 'recharts';
// icons
// import CircularProgress from '@mui/material/CircularProgress';
// import ShowChart from '@mui/icons-material/ShowChart';



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
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ pt: 3,pb:3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const CustomTooltip = ({ active, payload, label }: any) => {

    if (active && payload && payload.length) {
      return (
        <Box className="custom-tooltip" sx={{border:'1px solid white',marginLeft:'-40px', padding: '10px',backgroundColor: '#333',color:'#f5f4f5', width:'100%'}}>
          <Typography className="label" sx={{color: payload[1].color}}>{`${label}`}</Typography>
          <Typography className="label" sx={{color: payload[0].color}}>{`${payload[0].name} : ${payload[0].value*1000}`}</Typography>
          <Typography className="label"  sx={{color: payload[1].color}}>{`${payload[1].name} : ${payload[1].value}`}</Typography>
        </Box>
      );
    }
  
    return null;
  };
export const InteractiveGraph = (): JSX.Element => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    //Tabs to show graphs

    const  styledTooltip = styled(Tabs)(() => ({
      width: '100%',
      [theme.breakpoints.down('md')]: {
        // paddingTop: theme.spacing(19),
        width: '50%',
    },
    }));
  

    // Graph Data
    const dataCancerArr = [
        { name: '1990', uv: 1.04, pv: 1.64 },        
        { name: '1991', uv: 1.1, pv: 1.74 },        
        { name: '1992', uv: 1.13, pv: 1.97 },        
        { name: '1993', uv: 1.17, pv: 1.99 },        
        { name: '1994', uv: 1.21, pv: 1.87 },        
        { name: '1995', uv: 1.25, pv: 1.94 },        
        { name: '1996', uv: 1.37, pv: 2.27 },        
        { name: '1997', uv: 1.26, pv: 2.41 },        
        { name: '1998', uv: 1.23, pv: 2.57 },        
        { name: '1999', uv: 1.3, pv: 2.94 },        
        { name: '2000', uv: 1.33, pv: 3.31 },        
        { name: '2001', uv: 1.37, pv: 3.75 },        
        { name: '2002', uv: 1.39, pv: 4.12 },        
        { name: '2003', uv: 1.41, pv: 4.59 },        
        { name: '2004', uv: 1.43, pv: 4.74 },        
        { name: '2005', uv: 1.46, pv: 4.8 },        
        { name: '2006', uv: 1.5, pv: 4.75 },        
        { name: '2007', uv: 1.54, pv: 4.79 },        
        { name: '2008', uv: 1.56, pv: 4.82 },        
        { name: '2009', uv: 1.58, pv: 4.97 },        
        { name: '2010', uv: 1.58, pv: 5.1 },        
        { name: '2011', uv: 1.61, pv: 5.08 },        
        { name: '2012', uv: 1.6, pv: 5.07 },        
        { name: '2013', uv: 1.63, pv: 4.79 },        
        { name: '2014', uv: 1.66, pv: 4.95 },        
        { name: '2015', uv: 1.7, pv: 4.95 },        
        { name: '2016', uv: 1.73, pv: 5.21 },        
        { name: '2017', uv: 1.75, pv: 5.64 },        
        { name: '2018', uv: 1.75, pv: 5.93 },        
        { name: '2019', uv: 1.75, pv: 6.44 },        
    ];
    // const dataDeathArr =  [
    //     {name:'1990', dv: 263408, hv: 503627, ov: 232155, uv: 612},
    //     {name:'1991', dv: 253433, hv: 501715, ov: 237071, uv: 672},
    //     {name:'1992', dv: 244954, hv: 499454, ov: 241696, uv: 728},
    //     {name:'1993', dv: 244852, hv: 510254, ov: 252046, uv: 775},
    //     {name:'1994', dv: 243262, hv: 512209, ov: 258503, uv: 818},
    //     {name:'1995', dv: 246213, hv: 516928, ov: 265915, uv: 866},
    //     {name:'1996', dv: 248822, hv: 515725, ov: 269938, uv: 915},
    //     {name:'1997', dv: 252482, hv: 514302, ov: 273597, uv: 966},
    //     {name:'1998', dv: 259547, hv: 517240, ov: 279281, uv: 1019},
    //     {name:'1999', dv: 269567, hv: 523804, ov: 287496, uv: 1079},
    //     {name:'2000', dv: 275714, hv: 522147, ov: 292865, uv: 1157},
    //     {name:'2001', dv: 283539, hv: 515688, ov: 298050, uv: 1257},
    //     {name:'2002', dv: 294890, hv: 505748, ov: 303480, uv: 1366},
    //     {name:'2003', dv: 304997, hv: 489705, ov: 306668, uv: 1476},
    //     {name:'2004', dv: 309809, hv: 467423, ov: 305079, uv: 1583},
    //     {name:'2005', dv: 320168, hv: 460457, ov: 310455, uv: 1694},
    //     {name:'2006', dv: 327500, hv: 449055, ov: 311855, uv: 1807},
    //     {name:'2007', dv: 338307, hv: 437157, ov: 312758, uv: 1922},
    //     {name:'2008', dv: 353757, hv: 431300, ov: 317477, uv: 2008},
    //     {name:'2009', dv: 362532, hv: 423002, ov: 319825, uv: 2106},
    //     {name:'2010', dv: 366707, hv: 420422, ov: 322489, uv: 2181},
    //     {name:'2011', dv: 370883, hv: 426323, ov: 329075, uv: 2254},
    //     {name:'2012', dv: 373544, hv: 430713, ov: 334656, uv: 2347},
    //     {name:'2013', dv: 377775, hv: 437970, ov: 341827, uv: 2405},
    //     {name:'2014', dv: 382830, hv: 445918, ov: 349779, uv: 2527},
    //     {name:'2015', dv: 391105, hv: 456936, ov: 359659, uv: 2674},
    //     {name:'2016', dv: 399515, hv: 465558, ov: 369396, uv: 2795},
    //     {name:'2017', dv: 405299, hv: 467248, ov: 373207, uv: 2905},
    //     {name:'2018', dv: 422365, hv: 481551, ov: 384191, uv: 3021},
    //     {name:'2019', dv: 439379, hv: 495201, ov: 393859, uv: 3175},
    // ];
    // const dataDeathArr =  [
    //     {name:'1990', dv: 2634.08, hv: 5036.27, ov: 2321.55, uv: 612},
    //     {name:'1991', dv: 2534.33, hv: 5017.15, ov: 2370.71, uv: 672},
    //     {name:'1992', dv: 2449.54, hv: 4994.54, ov: 2416.96, uv: 728},
    //     {name:'1993', dv: 2448.52, hv: 5102.54, ov: 2520.46, uv: 775},
    //     {name:'1994', dv: 2432.62, hv: 5122.09, ov: 2585.03, uv: 818},
    //     {name:'1995', dv: 2462.13, hv: 5169.28, ov: 2659.15, uv: 866},
    //     {name:'1996', dv: 2488.22, hv: 5157.25, ov: 2699.38, uv: 915},
    //     {name:'1997', dv: 2524.82, hv: 5143.02, ov: 2735.97, uv: 966},
    //     {name:'1998', dv: 2595.47, hv: 5172.40, ov: 2792.81, uv: 1019},
    //     {name:'1999', dv: 2695.67, hv: 5238.04, ov: 2874.96, uv: 1079},
    //     {name:'2000', dv: 2757.14, hv: 5221.47, ov: 2928.65, uv: 1157},
    //     {name:'2001', dv: 2835.39, hv: 5156.88, ov: 2980.50, uv: 1257},
    //     {name:'2002', dv: 2948.90, hv: 5057.48, ov: 3034.80, uv: 1366},
    //     {name:'2003', dv: 3049.97, hv: 4897.05, ov: 3066.68, uv: 1476},
    //     {name:'2004', dv: 3098.09, hv: 4674.23, ov: 3050.79, uv: 1583},
    //     {name:'2005', dv: 3201.68, hv: 4604.57, ov: 3104.55, uv: 1694},
    //     {name:'2006', dv: 3275.00, hv: 4490.55, ov: 3118.55, uv: 1807},
    //     {name:'2007', dv: 3383.07, hv: 4371.57, ov: 3127.58, uv: 1922},
    //     {name:'2008', dv: 3537.57, hv: 4313.00, ov: 3174.77, uv: 2008},
    //     {name:'2009', dv: 3625.32, hv: 4230.02, ov: 3198.25, uv: 2106},
    //     {name:'2010', dv: 3667.07, hv: 4204.22, ov: 3224.89, uv: 2181},
    //     {name:'2011', dv: 3708.83, hv: 4263.23, ov: 3290.75, uv: 2254},
    //     {name:'2012', dv: 3735.44, hv: 4307.13, ov: 3346.56, uv: 2347},
    //     {name:'2013', dv: 3777.75, hv: 4379.70, ov: 3418.27, uv: 2405},
    //     {name:'2014', dv: 3828.30, hv: 4459.18, ov: 3497.79, uv: 2527},
    //     {name:'2015', dv: 3911.05, hv: 4569.36, ov: 3596.59, uv: 2674},
    //     {name:'2016', dv: 3995.15, hv: 4655.58, ov: 3693.96, uv: 2795},
    //     {name:'2017', dv: 4052.99, hv: 4672.48, ov: 3732.07, uv: 2905},
    //     {name:'2018', dv: 4223.65, hv: 4815.51, ov: 3841.91, uv: 3021},
    //     {name:'2019', dv: 4393.79, hv: 4952.01, ov: 3938.59, uv: 3175},
    // ];

    const dataDeathArr =  [
      {name:'1990', dv: 263.408, hv: 503.627, ov: 232.155, uv: 612},
      {name:'1991', dv: 253.433, hv: 501.715, ov: 237.071, uv: 672},
      {name:'1992', dv: 244.954, hv: 499.454, ov: 241.696, uv: 728},
      {name:'1993', dv: 244.852, hv: 510.254, ov: 252.046, uv: 775},
      {name:'1994', dv: 243.262, hv: 512.209, ov: 258.503, uv: 818},
      {name:'1995', dv: 246.213, hv: 516.928, ov: 265.915, uv: 866},
      {name:'1996', dv: 248.822, hv: 515.725, ov: 269.938, uv: 915},
      {name:'1997', dv: 252.482, hv: 514.302, ov: 273.597, uv: 966},
      {name:'1998', dv: 259.547, hv: 517.240, ov: 279.281, uv: 1019},
      {name:'1999', dv: 269.567, hv: 523.804, ov: 287.496, uv: 1079},
      {name:'2000', dv: 275.714, hv: 522.147, ov: 292.865, uv: 1157},
      {name:'2001', dv: 283.539, hv: 515.688, ov: 298.050, uv: 1257},
      {name:'2002', dv: 294.890, hv: 505.748, ov: 303.480, uv: 1366},
      {name:'2003', dv: 304.997, hv: 489.705, ov: 306.668, uv: 1476},
      {name:'2004', dv: 309.809, hv: 467.423, ov: 305.079, uv: 1583},
      {name:'2005', dv: 320.168, hv: 460.457, ov: 310.455, uv: 1694},
      {name:'2006', dv: 327.500, hv: 449.055, ov: 311.855, uv: 1807},
      {name:'2007', dv: 338.307, hv: 437.157, ov: 312.758, uv: 1922},
      {name:'2008', dv: 353.757, hv: 431.300, ov: 317.477, uv: 2008},
      {name:'2009', dv: 362.532, hv: 423.002, ov: 319.825, uv: 2106},
      {name:'2010', dv: 366.707, hv: 420.422, ov: 322.489, uv: 2181},
      {name:'2011', dv: 370.883, hv: 426.323, ov: 329.075, uv: 2254},
      {name:'2012', dv: 373.544, hv: 430.713, ov: 334.656, uv: 2347},
      {name:'2013', dv: 377.775, hv: 437.970, ov: 341.827, uv: 2405},
      {name:'2014', dv: 382.830, hv: 445.918, ov: 349.779, uv: 2527},
      {name:'2015', dv: 391.105, hv: 456.936, ov: 359.659, uv: 2674},
      {name:'2016', dv: 399.515, hv: 465.558, ov: 369.396, uv: 2795},
      {name:'2017', dv: 405.299, hv: 467.248, ov: 373.207, uv: 2905},
      {name:'2018', dv: 422.365, hv: 481.551, ov: 384.191, uv: 3021},
      {name:'2019', dv: 439.379, hv: 495.201, ov: 393.859, uv: 3175},
  ];

    const currencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    });
    return  (
        <Section
            title={'Graph'}
            align={'left'}
            fontColor={Colors.white[50]}
            dividerColor={Colors.white[50]}
            style={{ backgroundColor: Colors.black[900] }}
            sx={{ px: md ? 1 : 4, pt: 4, pb: `${32 + TRANSITION_GRADIENT_HEIGHT}px` }}
        >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="Disease chart" orientation={sm? 'vertical':'horizontal'}>
                <Tab label="CANCERS" {...a11yProps(0)} />
                <Tab label="DIABETES" {...a11yProps(1)} />
                <Tab label="HYPERTENSION" {...a11yProps(2)} />
                <Tab label="OBESITY" {...a11yProps(3)} />
            </Tabs>
            </Box>
            <TabPanel  value={value} index={0}>
                <ResponsiveContainer width="100%" minHeight={500}>
                    <ComposedChart
                    // height={500}
                    data={dataCancerArr}
                    margin={{
                    top: 20,
                    left: 0,
                    right: 0,
                    bottom: 20,
                    }}
                    >
                        <CartesianGrid stroke="#f5f5f5" vertical={false} />
                        <XAxis dataKey="name" scale="band" />
                        <YAxis yAxisId="left" dataKey="uv" orientation='left'/>
                        <YAxis yAxisId="right" dataKey="pv" orientation='right' tickFormatter={value => currencyFormatter.format(value).slice(0, -3)} />

                        {/* <YAxis yAxisId="right" orientation="right" /> */}
                        <Tooltip contentStyle={{marginLeft:-50,backgroundColor: '#333',color:theme.palette.primary.main}} />
                        {/* <Tooltip content={<CustomTooltip />} /> */}
                        <Legend />
                        <Bar yAxisId="left" name="Cancer New Cases (Millions)" dataKey="uv" barSize={5} stroke='#333' fill='#f7f8f8' />
                        <Area yAxisId="right" name="Cancer Funding in USD (billions)" isAnimationActive={false} type="monotone" dataKey="pv" fill={theme.palette.primary.main} stroke={theme.palette.primary.main} />
                        {/* <Line type="monotone" dataKey="uv" stroke="#ff7300" /> */}
                    </ComposedChart>
                </ResponsiveContainer>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ResponsiveContainer width="100%" minHeight={500}>
                    <ComposedChart
                    // height={500}
                    data={dataDeathArr}
                    margin={{
                    top: 20,
                    bottom: 20,
                    }}
                    >
                        <CartesianGrid stroke="#f5f5f5" vertical={false} />
                        <XAxis dataKey="name" scale="band" />
                        <YAxis yAxisId="left" dataKey="dv" unit={'k'} orientation='left'/>
                        <YAxis yAxisId="right" dataKey="uv" orientation='right' tickFormatter={value => currencyFormatter.format(value).slice(0, -3)} />

                        {/* <YAxis yAxisId="right" orientation="right" /> */}
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar yAxisId="left" name="Total Diabetes Deaths" dataKey="dv" barSize={5} stroke='#333' fill='#f7f8f8' />
                        <Area yAxisId="right" name="US Healthcare Spending in USD (Billions)" isAnimationActive={false} type="linear" dataKey="uv" fill={theme.palette.error.main} stroke={theme.palette.error.main} />
                        {/* <Line type="monotone" dataKey="uv" stroke="#ff7300" /> */}
                    </ComposedChart>
                </ResponsiveContainer>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ResponsiveContainer width="100%" minHeight={500}>
                    <ComposedChart
                    // height={500}
                    data={dataDeathArr}
                    margin={{
                    top: 20,
                    bottom: 20,
                    }}
                    >
                        <CartesianGrid stroke="#f5f5f5" vertical={false} />
                        <XAxis dataKey="name" scale="band" />
                        <YAxis yAxisId="left" dataKey="hv" unit={'k'} orientation='left'/>
                        <YAxis yAxisId="right" dataKey="uv" orientation='right' tickFormatter={value => currencyFormatter.format(value).slice(0, -3)} />

                        {/* <YAxis yAxisId="right" orientation="right" /> */}
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar yAxisId="left" name="Total Hypertension Deaths" dataKey="hv" barSize={5} stroke='#333' fill='#f7f8f8' />
                        <Area yAxisId="right" name="US Healthcare Spending in USD (Billions)" type="linear" dataKey="uv" isAnimationActive={false} fill={theme.palette.error.main} stroke={theme.palette.error.main} />
                        {/* <Line type="monotone" dataKey="uv" stroke="#ff7300" /> */}
                    </ComposedChart>
                </ResponsiveContainer>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <ResponsiveContainer width="100%" minHeight={500}>
                    <ComposedChart
                    // height={500}
                    data={dataDeathArr}
                    margin={{
                    top: 20,
                    bottom: 20,
                    }}
                    >
                        <CartesianGrid stroke="#f5f5f5" vertical={false} />
                        <XAxis dataKey="name" scale="band" />
                        <YAxis yAxisId="left" dataKey="ov" unit={'k'} orientation='left'/>
                        <YAxis yAxisId="right" dataKey="uv" orientation='right' tickFormatter={value => currencyFormatter.format(value).slice(0, -3)} />

                        {/* <YAxis yAxisId="right" orientation="right" /> */}
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar yAxisId="left" name="Total Obesity Deaths" dataKey="ov" barSize={5} stroke='#333' fill='#f7f8f8' />
                        <Area yAxisId="right" name="US Healthcare Spending in USD (Billions)" type="linear" dataKey="uv" isAnimationActive={false} fill={theme.palette.error.main} stroke={theme.palette.error.main} />
                        {/* <Line type="monotone" dataKey="uv" stroke="#ff7300" /> */}
                    </ComposedChart>
                </ResponsiveContainer>
            </TabPanel>
        </Section>
    );
};

