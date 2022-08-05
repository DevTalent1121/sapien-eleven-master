import React from 'react';
import * as Colors from '../../themes/colors';
import { Section, FlipCard } from '../../components';
import { TRANSITION_GRADIENT_HEIGHT } from '../../shared';

// @mui imports
import styled from '@mui/material/styles/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/styles/useTheme';

// components
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// icons
import AttachMoney from '@mui/icons-material/AttachMoney';
// import { Diagnostic } from '@brightlayer-ui/icons-mui';
import Healing from '@mui/icons-material/Healing';
import School from '@mui/icons-material/School';
import TShirt from '../../assets/svg/Tshirt';

import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

type SapienElevenCardData = {
    title: string;
    frontIcon: JSX.Element & React.ReactNode;
    backIcon: JSX.Element & React.ReactNode;
    description: string;
};

const centeredCardContentIconStyles = { color: Colors.red[500], fontSize: '80px', marginBottom: '1rem' };

// function TshirtIcon(props: SvgIconProps) {
//     return (
//       <SvgIcon {...props}>
//         <path d="M210 27c-39 11-68 21-91 33a93 93 0 0 0-37 26 414 414 0 0 0-40 197 246 246 0 0 0 91 28l1 85 1 128c1 48 0 44 11 49a467 467 0 0 0 155 22c47-1 59-1 90-6 32-5 67-16 72-22 2-1 3-98 3-213v-44l14-2c24-4 60-15 73-22 8-5 9-6 6-31-3-33-8-68-12-87-10-46-21-73-33-87-15-15-54-34-107-49-19-6-25-6-47-2-58 10-61 10-126-1-20-3-19-3-24-2zm1 30c10 18 33 31 62 37 15 3 39 3 54 0 28-6 49-18 61-35l6-6c2 0 32 9 47 15 27 10 46 20 55 29 8 8 15 25 23 54 6 26 15 81 17 107v10l-8 3a285 285 0 0 1-62 15 734 734 0 0 1 3-86c3-11 7-21 12-27 6-10 8-13 8-17 0-6-5-11-12-11-6 0-14 10-22 26-7 14-10 25-11 41l-2 176c0 148 0 164-2 165a511 511 0 0 1-152 18c-56-1-81-4-118-15l-12-3V451a28175 28175 0 0 1-2-228c-1-24-1-25-4-34-5-17-12-30-20-38-7-7-13-8-19-1-3 3-3 4-3 7l5 9c8 11 13 23 17 40l2 43v37h-3c-9 0-35-6-54-13l-12-5v-10a524 524 0 0 1 35-156c6-9 21-18 45-28 13-6 57-21 60-21 2 0 4 1 6 4zm52 1a238 238 0 0 0 95-4c2 0 2 0 1 1-4 5-23 13-37 16-15 3-36 2-50-1-10-3-30-12-32-15-1-1-1-1 2-1l21 4z"/>
//         <path d="M405 509c-5 3-5 3-5 8v6l8 4 7 6-2 2c-1 1-3 0-7-3l-5-3-1 4c0 5 0 5 8 10l4 2 5-4c6-3 6-4 6-8v-5l-8-5c-7-5-8-5-6-7 2-1 3-1 8 2l5 3 1-4c0-4 0-4-5-7l-7-4-6 3z"/>        
//         {/* <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" /> */}
//         {/* <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/> */}
//       </SvgIcon>

//     );
//   }
  
  
const cardData: SapienElevenCardData[] = [
    {
        title: 'Wellness Academy',
        frontIcon: <School color={'primary'} />,
        backIcon: <School color={'primary'} style={centeredCardContentIconStyles} />,
        description:
            // "An exclusive platform to educate community members on wellness and the body's chemistry as well as talks and seminars featuring world-class health professionals",
            "An exclusive platform to educate community members on wellness and the body's chemistry as well as an all-in-one place for interactive and instructional experiences.",
    },
    // {
    //     title: 'Wellness Portal',
    //     frontIcon: <Diagnostic color={'primary'} />,
    //     backIcon: <Diagnostic color={'primary'} style={centeredCardContentIconStyles} />,
    //     description:
    //         'A portal for community members to chat with professionals and one another about their health as well as testing services to measure in-depth metabolic markers and other comprehensive lab work as needed to identify the root cause of any symptoms or imbalances',
    // },
    {
        title: 'MarketPlace',
        // frontIcon: <TshirtIcon color={'primary'} />,
        frontIcon: <TShirt height={24} fill={'rgb(202, 60, 61)'} />,
        backIcon: <TShirt height={80}  fill={'rgb(202, 60, 61)'} style={centeredCardContentIconStyles} />,
        description:
            // 'An online storefront providing carefully curated and professionally formulated wellness products, supplements, apparel, and accessories',
            'An online storefront providing carefully designed and professionally formulated wellness product drops.',
    },
    {
        title: 'Cares System',
        frontIcon: <Healing color={'primary'} />,
        backIcon: <Healing color={'primary'} style={centeredCardContentIconStyles} />,
        description:
            'A cost-sharing fund to help those who suffer from unexpected or chronic illness, and community members seeking alternative treatment options not covered by conventional health insurance',
    },
];
const sapienElevenFlipCardStyles = {
    minHeight: { xs: 337, sm: 265, md: 362, lg: 396, xl: 396 },
};

const CenteredCardContent = styled(CardContent)(() => ({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}));

const Paragraph = styled(
    Typography,
    {}
)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

const cardStyles = {
    height: '100%',
    width: '100%',
};

const cardTitleStyles = {
    fontFamily: 'besan',
    fontSize: '.75rem',
};

export const WhatIsSapienEleven = (): JSX.Element => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Section
            title={'What is Sapien Eleven?'}
            align={'left'}
            background={'light'}
            // background={'transparent'}
            sx={{ px: md ? 2 : 4, pt: 4, pb: `${32 + TRANSITION_GRADIENT_HEIGHT}px` }}
        >
            <Paragraph>
                Sapien Eleven is a NFT brand that aims to educate and improve the health and wellness of our community members trough prevention.
            </Paragraph>
            <Paragraph>
                We aim to provide a different approach than modern medicine&apos;s “diagnose and treat” method.
            </Paragraph>
            <Grid container spacing={2} sx={{ mt: 1 }}>
                {cardData.map((data) => (
                    <Grid key={data.title} item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <FlipCard useHover sx={sapienElevenFlipCardStyles}>
                            <Card sx={cardStyles} elevation={4}>
                                <CenteredCardContent>
                                    {data.backIcon}
                                    <Typography sx={{ ...cardTitleStyles, textAlign: 'center' }}>
                                        {data.title}
                                    </Typography>
                                </CenteredCardContent>
                            </Card>
                            <Card sx={cardStyles} elevation={4}>
                                <CardHeader
                                    avatar={data.frontIcon}
                                    title={data.title}
                                    sx={{ '& .MuiCardHeader-title': cardTitleStyles }}
                                />
                                <Divider />
                                <CardContent>
                                    <Typography>{data.description}</Typography>
                                </CardContent>
                            </Card>
                        </FlipCard>
                    </Grid>
                ))}
            </Grid>
        </Section>
    );
};
