import React from 'react';
import * as Colors from '../../themes/colors';

// @mui imports
import styled from '@mui/material/styles/styled';

// components
import Box, { BoxProps } from '@mui/material/Box';
import { TransitionGradient, TransitionGradientProps } from '../display/TransitionGradient';

type ParallaxContainerProps = {
    children: JSX.Element;
    backgroundImage: string;
    height?: string | number;
    boxShadowColor?: string;
    useBottomTransitionGradient?: boolean;
    bottomGradientProps?: TransitionGradientProps;
};

const StyledParallaxContainer = styled(Box)<
    BoxProps & {
        backgroundImage: string;
        height: string | number;
        boxShadowColor: string;
    }
>(({ backgroundImage, height, boxShadowColor, theme }) => ({
    height: height,
    width: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    boxShadow: `inset 0 0 0 ${height} ${boxShadowColor}`,
    [theme.breakpoints.down('md')]: {
        backgroundAttachment: 'scroll',
    },
}));

const ParallaxContent = styled(Box)(() => ({
    position: 'absolute',
    left: 0,
    right: 0,
}));

export const ParallaxContainer = (props: BoxProps & ParallaxContainerProps): JSX.Element => {
    const {
        backgroundImage,
        boxShadowColor = '#ca3c3dbf',
        height = 800,
        children,
        useBottomTransitionGradient = false,
        bottomGradientProps,
    } = props;

    return (
        <StyledParallaxContainer backgroundImage={backgroundImage} boxShadowColor={boxShadowColor} height={height}>
            <ParallaxContent>{children}</ParallaxContent>
            {useBottomTransitionGradient && (
                <TransitionGradient
                    pinToBottom
                    gradientStart={'#1d252900'}
                    gradientEnd={Colors.black[900]}
                    {...bottomGradientProps}
                />
            )}
        </StyledParallaxContainer>
    );
};
