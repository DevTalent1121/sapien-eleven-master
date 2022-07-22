import React, { useState } from 'react';
import * as Colors from '../../themes/colors';
import { ParallaxContainer, Section, TransitionGradient } from '../../components';
import { TRANSITION_GRADIENT_HEIGHT } from '../../shared/constants';

// Images
import BLOOD_TEST_RED_BLUE from '../../assets/images/bloodspatter.jpg';

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
}));

const soWhatParagraphStyles = {
    textAlign: 'center',
};

const soWhatTitleStyles = {
    fontFamily: 'besan',
    display: 'block',
    padding: '16px',
    width: '100%',
    borderRadius: '8px',
    border: `1px solid ${Colors.black[900]}`,
    textAlign: 'center',
};

export const SoWhat = (): JSX.Element => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const [soWhatContentHeight, setSoWhatContentHeight] = useState(0);

    const onSoWhatContentChange = (height: number): void => {
        setSoWhatContentHeight(height);
    };

    return (
        <ParallaxContainer
            backgroundImage={BLOOD_TEST_RED_BLUE}
            height={`${soWhatContentHeight + TRANSITION_GRADIENT_HEIGHT * 2}px`}
            boxShadowColor={'#ffffff00'}
            useBottomTransitionGradient
            bottomGradientProps={{ gradientStart: '#1d252900', gradientEnd: Colors.red[500] }}
        >
            <Box>
                <TransitionGradient gradientStart={Colors.black[900]} gradientEnd={'#1d252900'} />
                <Section
                    sx={{
                        px: md ? 2 : 4,
                        pt: 4,
                        pb: `${32 + TRANSITION_GRADIENT_HEIGHT}px`,
                        minHeight: '532px',
                    }}
                    background={'transparent'}
                    onHeightChange={onSoWhatContentChange}
                    trackHeight
                >
                    <Section
                        title={'So What?!'}
                        align={'left'}
                        style={{
                            borderRadius: '8px',
                            padding: '32px',
                            backgroundColor: 'rgba(255, 255, 255, 0.875)',
                        }}
                    >
                        <Paragraph>
                            At Sapien Eleven, we believe that there is truly a global health problem, and we want to do
                            our best to help people live healthier and happier lives.
                        </Paragraph>
                        <Paragraph>
                            {/* We aim to provide a different approach than modern medicine&apos;s “diagnose and treat”
                            method. To accomplish this we will utilize functional blood chemistry; either recommending
                            panels to have primary care physicians order, or our team health professional ordering
                            through partnered labs. */}
                            We aim to provide a different approach than modern medicine&apos;s “diagnose and treat”
                            method. To accomplish this we will utilize functional blood chemistry; recommending
                            panels to request be ordered, and then analyzing those labe looking for any imblances.
                        </Paragraph>
                        <Paragraph>
                            {/* Following the panel readings, we can aid in recommending the proper nutrition and
                            supplementation on a case by case basis. */}
                            If any imblances are detected, we can aid in recommending the proper nutrition and
                            supplementation on a case by case basis.
                        </Paragraph>
                    </Section>
                    <Grid container spacing={2} sx={{ mt: 0, justifyContent: 'center' }}>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                            <Box
                                style={{
                                    borderRadius: '8px',
                                    padding: '32px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.875)',
                                    height: '100%',
                                }}
                            >
                                <Typography variant={'body2'} sx={soWhatTitleStyles}>
                                    Functional Blood Chemistry
                                </Typography>
                                <Paragraph sx={soWhatParagraphStyles}>
                                    Blood is the all knowing code that circulates throughout the whole body. It goes
                                    everywhere and everything goes through it.
                                </Paragraph>
                                <Paragraph sx={soWhatParagraphStyles}>
                                    Blood panels are relatively easy and inexpensive to order and perform, and results
                                    return quickly.
                                </Paragraph>
                                <Paragraph sx={soWhatParagraphStyles}>
                                    Testing is customizable. Unlike other functional tests.
                                </Paragraph>
                                <Paragraph sx={soWhatParagraphStyles}>
                                    Imbalances point to where to take a deeper look and can retest only what&apos;s
                                    necessary.
                                </Paragraph>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                            <Box
                                style={{
                                    borderRadius: '8px',
                                    padding: '32px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.875)',
                                    height: '100%',
                                }}
                            >
                                <Typography variant={'body2'} sx={soWhatTitleStyles}>
                                    Nutrition and Supplementation
                                </Typography>
                                <Paragraph sx={soWhatParagraphStyles}>
                                    A diet rich in nutrient dense foods, as we know, is the best way to nourish the body
                                    with all the vitamins and minerals necessary.
                                </Paragraph>
                                <Paragraph sx={soWhatParagraphStyles}>
                                    This is vital for our health. Allowing all eleven organ systems to function
                                    properly.
                                </Paragraph>
                                <Paragraph sx={soWhatParagraphStyles}>
                                    When the foods we consume are void of these necessary nutrients imbalances in the
                                    body&apos;s chemistry can occur.
                                </Paragraph>
                                <Paragraph sx={soWhatParagraphStyles}>
                                    Whole food bio-available supplements are a great way to help improve the present
                                    imbalances while also making necessary dietary changes.
                                </Paragraph>
                            </Box>
                        </Grid>
                    </Grid>
                </Section>
            </Box>
        </ParallaxContainer>
    );
};
