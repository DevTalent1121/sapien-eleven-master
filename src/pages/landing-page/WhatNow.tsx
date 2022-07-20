import React from 'react';
import * as Colors from '../../themes/colors';
import { Section } from '../../components';
import { TRANSITION_GRADIENT_HEIGHT } from '../../shared';

// @mui imports
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/styles/useTheme';
import styled from '@mui/material/styles/styled';

// components
import Typography from '@mui/material/Typography';

const Paragraph = styled(
    Typography,
    {}
)(({ theme }) => ({
    marginTop: theme.spacing(2),
    color: Colors.white[50],
}));

export const WhatNow = (): JSX.Element => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Section
            title={'What Now?'}
            align={'left'}
            fontColor={Colors.white[50]}
            dividerColor={Colors.white[50]}
            dividerHighlightColor={Colors.black[500]}
            style={{ backgroundColor: Colors.red[500] }}
            sx={{ px: md ? 2 : 4, pt: 4, pb: `${32 + TRANSITION_GRADIENT_HEIGHT}px` }}
        >
            <Paragraph>
                In the future, we will release more information on how to join the community and how you can take
                advantage of some of the offerings we will provide. Follow us on twitter and turn on notifications for
                the latest info on the project.
            </Paragraph>
        </Section>
    );
};
