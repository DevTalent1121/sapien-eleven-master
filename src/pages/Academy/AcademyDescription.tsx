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
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

const Paragraph = styled(
    Typography,
    {}
)(({ theme }) => ({
    marginTop: theme.spacing(2),
    textAlign: 'center',
    color: 'secondary',
}));


export type DefaultProps = {
    title?: string;
    color?: string;
    backgroundColor?: string;
};

export const AcademyDescription = (props:DefaultProps): JSX.Element => {
    const {color, backgroundColor, title, ...other } = props;

    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));

    
    
    return (
        <Section
            title={'Academy'}
            align={'left'}
            background={'light'}
            // background={'transparent'}
            sx={{ px: md ? 2 : 4, pt: 4, pb: `${320 + TRANSITION_GRADIENT_HEIGHT}px` }}
        >
            <Paragraph>
                
            </Paragraph>
            <Paragraph>
                
            </Paragraph>
        </Section>

    );
};
