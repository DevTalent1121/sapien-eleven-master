import React from 'react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { SharedToolbar, TransitionGradient } from '../../components';
import * as Colors from '../../themes/colors';

// Landing Page Sections
import { Banner } from './Banner';
import { WhatIsSapienEleven } from './WhatIsSapienEleven';
import { StateOfHumanHealth } from './StateOfHumanHealth';
import { ChronicDisease } from './ChronicDisease';
import { InteractiveGraph } from './InteractiveGraph';
import { SoWhat } from './SoWhat';
import { Footer } from './Footer';

// icons
import Menu from '@mui/icons-material/Menu';
import { WhatNow } from './WhatNow';
import { Team } from './Team';
import { TRANSITION_GRADIENT_HEIGHT } from '../../shared';

export const LandingPage: React.FC = (): JSX.Element => {
    usePageTitle('');

    return (
        <>
            <SharedToolbar navigationIcon={<Menu />} />

            <Banner />
            <TransitionGradient
                offset={`-${TRANSITION_GRADIENT_HEIGHT}px`}
                gradientStart={'#ffffff00'}
                gradientEnd={'#fff'}
            />

            <WhatIsSapienEleven />

            <StateOfHumanHealth />

            <ChronicDisease />

            <InteractiveGraph />

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
