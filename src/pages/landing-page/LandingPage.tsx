import React, { useState } from 'react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { ParallaxContainer, Section, SharedToolbar, TransitionGradient } from '../../components';
import * as Colors from '../../themes/colors';


// Landing Page Sections
import { Banner } from './Banner';
import { WhatIsSapienEleven } from './WhatIsSapienEleven';
import { StateOfHumanHealth } from './StateOfHumanHealth';
import { ChronicDisease } from './ChronicDisease';
import { SoWhat } from './SoWhat';
import { Footer } from './Footer';

// icons
import Menu from '@mui/icons-material/Menu';
import { WhatNow } from './WhatNow';
import { Team } from './Team';
import { TRANSITION_GRADIENT_HEIGHT } from '../../shared';

//images
import BackgroundImage from '../../assets/images/GraphicBackgroundText.png';
import { Box } from '@mui/material';


export const LandingPage: React.FC = (): JSX.Element => {
    usePageTitle('');
    const [stateOfHealthContentHeight, setStateOfHealthContentHeight] = useState(0);

    const onStateOfHealthContentChange = (height: number): void => {
        setStateOfHealthContentHeight(height);
    };

    return (
        <>
            <SharedToolbar navigationIcon={<Menu />} />

            <ParallaxContainer
            backgroundImage={BackgroundImage}
            height={`${stateOfHealthContentHeight + TRANSITION_GRADIENT_HEIGHT * 2}px`}
            >
                <Box>
                <Section
                onHeightChange={onStateOfHealthContentChange}>
                    <Banner />
                    <TransitionGradient
                        offset={`-${TRANSITION_GRADIENT_HEIGHT}px`}
                        gradientStart={'#ffffff00'}
                        gradientEnd={'#fff'}
                    />

                    <WhatIsSapienEleven />
                </Section>
                </Box>
            </ParallaxContainer>

            <StateOfHumanHealth />

            <ChronicDisease />

            <SoWhat />

            <WhatNow />

            <TransitionGradient
                offset={`-${TRANSITION_GRADIENT_HEIGHT}px`}
                gradientStart={'#ffffff00'}
                gradientEnd={'#fff'}
            />
            <Team />
            <TransitionGradient gradientStart={'#ffffff00'} gradientEnd={Colors.black[900]} />

            <Footer />
        </>
    );
};
