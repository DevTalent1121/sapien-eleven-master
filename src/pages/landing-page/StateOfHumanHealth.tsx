import React, { useState } from 'react';
import * as Colors from '../../themes/colors';
import { TRANSITION_GRADIENT_HEIGHT } from '../../shared';
import { Section, ParallaxContainer, TransitionGradient } from '../../components';

// Images
import SAD from '../../assets/images/shutterstock_1543784279.jpg';

// @mui imports
import styled from '@mui/material/styles/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/styles/useTheme';

// components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Paragraph = styled(
    Typography,
    {}
)(({ theme }) => ({
    marginTop: theme.spacing(2),
    textAlign: 'center',
    color: Colors.white[50],
}));

const stateOfHealthTitleStyles = {
    color: Colors.white[50],
    fontFamily: 'besan',
    display: 'block',
    padding: '16px',
    width: '100%',
    borderRadius: '8px',
    border: `1px solid ${Colors.white[50]}`,
    textAlign: 'center',
};

const GRID_ITEM_WIDTH_XS = 12;
const GRID_ITEM_WIDTH_SM = 12;
const GRID_ITEM_WIDTH_MD = 6;
const GRID_ITEM_WIDTH_LG = 6;
const GRID_ITEM_WIDTH_XL = 4;

export const StateOfHumanHealth: React.FC = (): JSX.Element => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const [stateOfHealthContentHeight, setStateOfHealthContentHeight] = useState(0);

    const onStateOfHealthContentChange = (height: number): void => {
        setStateOfHealthContentHeight(height);
    };

    return (
        <ParallaxContainer
            backgroundImage={SAD}
            height={`${stateOfHealthContentHeight + TRANSITION_GRADIENT_HEIGHT * 2}px`}
            useBottomTransitionGradient
            bottomGradientProps={{ gradientStart: '#1d252900', gradientEnd: Colors.black[900] }}
        >
            <Box>
                <TransitionGradient gradientStart={'#FFF'} gradientEnd={'#ffffff00'} />
                <Section
                    title={'State Of Human Health'}
                    align={'left'}
                    sx={{ px: md ? 2 : 4, pt: 4, pb: `${32 + TRANSITION_GRADIENT_HEIGHT}px`, minHeight: '598px' }}
                    fontColor={Colors.white[50]}
                    dividerColor={Colors.white[50]}
                    dividerHighlightColor={theme.palette.text.primary}
                    background={'transparent'}
                    onHeightChange={onStateOfHealthContentChange}
                    trackHeight
                >
                    <Grid container spacing={4} sx={{ mt: 2, justifyContent: 'center' }}>
                        <Grid
                            item
                            xs={GRID_ITEM_WIDTH_XS}
                            sm={GRID_ITEM_WIDTH_SM}
                            md={GRID_ITEM_WIDTH_MD}
                            lg={GRID_ITEM_WIDTH_LG}
                            xl={GRID_ITEM_WIDTH_XL}
                        >
                            <Typography variant={'h6'} sx={stateOfHealthTitleStyles}>
                                Western Medicine
                            </Typography>
                            <Paragraph>
                                {/* The Western Medicine approach is more common than ever. Practitioners are taught to
                                identify signs and symptoms, then “treat” or ”manage” with pharmaceuticals rather than
                                prevention. */}
                                Identify signs and symptoms, then “treat” or ”manage” with pharmaceuticals rather than
                                prevention.
                            </Paragraph>
                        </Grid>
                        <Grid
                            item
                            xs={GRID_ITEM_WIDTH_XS}
                            sm={GRID_ITEM_WIDTH_SM}
                            md={GRID_ITEM_WIDTH_MD}
                            lg={GRID_ITEM_WIDTH_LG}
                            xl={GRID_ITEM_WIDTH_XL}
                        >
                            <Typography variant={'h6'} sx={stateOfHealthTitleStyles}>
                                Corporate Rules
                            </Typography>
                            <Paragraph>
                                Clinics and insurance companies claim to promote disease prevention and recommend annual
                                visits. However, labs and special testing are not performed preventively. Only if signs
                                and symptoms are present.
                            </Paragraph>
                        </Grid>
                        <Grid
                            item
                            xs={GRID_ITEM_WIDTH_XS}
                            sm={GRID_ITEM_WIDTH_SM}
                            md={GRID_ITEM_WIDTH_MD}
                            lg={GRID_ITEM_WIDTH_LG}
                            xl={GRID_ITEM_WIDTH_XL}
                        >
                            <Typography variant={'h6'} sx={stateOfHealthTitleStyles}>
                                Processed Diets
                            </Typography>
                            <Paragraph>
                                {/* What happened to going to the market for fresh food? More and more people rely on fast
                                or processed foods because it&apos;s convenient. The foods we eat are missing key
                                nutrients. */}
                                What happened to going to the market for fresh food? More and more people rely on fast
                                or processed foods because it&apos;s convenient. These foods are void of key
                                nutrients.
                            </Paragraph>
                        </Grid>
                        <Grid
                            item
                            xs={GRID_ITEM_WIDTH_XS}
                            sm={GRID_ITEM_WIDTH_SM}
                            md={GRID_ITEM_WIDTH_MD}
                            lg={GRID_ITEM_WIDTH_LG}
                            xl={GRID_ITEM_WIDTH_XL}
                        >
                            <Typography variant={'h6'} sx={stateOfHealthTitleStyles}>
                                Depleted Soil
                            </Typography>
                            <Paragraph>
                                Herbicides, pesticides, and fertilizers are depleting the soil of necessary nutrients
                                which impact the foods that we are consuming daily.
                            </Paragraph>
                        </Grid>
                        <Grid
                            item
                            xs={GRID_ITEM_WIDTH_XS}
                            sm={GRID_ITEM_WIDTH_SM}
                            md={GRID_ITEM_WIDTH_MD}
                            lg={GRID_ITEM_WIDTH_LG}
                            xl={GRID_ITEM_WIDTH_XL}
                        >
                            <Typography variant={'h6'} sx={stateOfHealthTitleStyles}>
                                Big Pharma
                            </Typography>
                            <Paragraph>
                                {/* The large pharmaceutical companies are funding medical institutions and driving the
                                education for practitioners. */}
                                Large pharmaceutical companies are driving the education taught in medical institutions.
                            </Paragraph>
                        </Grid>
                    </Grid>
                </Section>
            </Box>
        </ParallaxContainer>
    );
};
