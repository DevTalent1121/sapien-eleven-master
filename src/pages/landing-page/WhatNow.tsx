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
import { Link } from '@mui/material';

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
            // title={'What Now?'}
            title={"Don't Miss a Drop?"}
            align={'left'}
            fontColor={Colors.white[50]}
            dividerColor={Colors.white[50]}
            dividerHighlightColor={Colors.black[500]}
            style={{ backgroundColor: Colors.red[500] }}
            sx={{ px: md ? 2 : 4, pt: 4, pb: `${32 + TRANSITION_GRADIENT_HEIGHT}px` }}
        >
            <Paragraph>
            One by one we will make the world a healthier place. We can't do it alone though. Please follow along on 
            <Link color={Colors.white[50]} href='https://twitter.com/SapienEleventNFT'>
             &nbsp;Twitter &nbsp;
            </Link> and make sure to invite your friends and family.
            {/* @SapienEleventNFT (link it to twitter) */}
            </Paragraph>
        </Section>
    );
};
