import React from 'react';

// @mui imports
import styled from '@mui/material/styles/styled';

// components
import Box, { BoxProps } from '@mui/material/Box';

export type TransitionGradientProps = {
    width?: string | number;
    height?: string | number;
    gradientStart?: string;
    gradientEnd?: string;
    offset?: string | number;
    pinToBottom?: boolean;
};

const StyledTransitionGradient = styled(Box)<BoxProps & TransitionGradientProps>(
    ({
        width = '100vw',
        height = '16px',
        gradientStart = '#fff',
        gradientEnd = '#ffffff00',
        offset = 0,
        pinToBottom,
    }) => ({
        width: width,
        height: height,
        background: `linear-gradient(${gradientStart}, ${gradientEnd})`,
        marginTop: offset,
        ...(pinToBottom
            ? {
                  position: 'absolute',
                  bottom: 0,
              }
            : {}),
    })
);

export const TransitionGradient = (props: TransitionGradientProps): JSX.Element => {
    const { width, height, gradientStart, gradientEnd, offset, pinToBottom } = props;

    return (
        <StyledTransitionGradient
            width={width}
            height={height}
            gradientStart={gradientStart}
            gradientEnd={gradientEnd}
            offset={offset}
            pinToBottom={pinToBottom}
        />
    );
};
