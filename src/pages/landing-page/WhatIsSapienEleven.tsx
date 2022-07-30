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

type SapienElevenCardData = {
    title: string;
    frontIcon: JSX.Element & React.ReactNode;
    backIcon: JSX.Element & React.ReactNode;
    description: string;
};

const centeredCardContentIconStyles = { color: Colors.red[500], fontSize: '80px', marginBottom: '1rem' };

const cardData: SapienElevenCardData[] = [
    {
        title: 'Wellness Academy',
        frontIcon: <School color={'primary'} />,
        backIcon: <School color={'primary'} style={centeredCardContentIconStyles} />,
        description:
            "An exclusive platform to educate community members on wellness and the body's chemistry as well as talks and seminars featuring world-class health professionals",
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
        frontIcon: <AttachMoney color={'primary'} />,
        backIcon: <AttachMoney color={'primary'} style={centeredCardContentIconStyles} />,
        description:
            'An online storefront providing carefully curated and professionally formulated wellness products, supplements, apparel, and accessories',
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
