import React from 'react';
import * as Colors from '../../themes/colors';
import { Section } from '../../components';
import { TRANSITION_GRADIENT_HEIGHT } from '../../shared';

// @mui imports
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/styles/useTheme';

// components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// icons
import CircularProgress from '@mui/material/CircularProgress';
import ShowChart from '@mui/icons-material/ShowChart';
import Link from '@mui/material/Link';
import styled from '@mui/styles/styled';

const chronicIllnessGridItemStyles = {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
};

const LinkNoEffect = styled(Link)(({theme})=>({

    varient:'inherit',
    cursor: 'default',
    textDecoration: 'none',
}));

export const ChronicDisease = (): JSX.Element => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Section
            title={'Chronic Disease'}
            align={'left'}
            fontColor={Colors.white[50]}
            dividerColor={Colors.white[50]}
            style={{ backgroundColor: Colors.black[900] }}
            sx={{ px: md ? 2 : 4, pt: 4, pb: `${32 + TRANSITION_GRADIENT_HEIGHT}px` }}
        >
            <Grid container spacing={4} sx={{ mt: 2, justifyContent: 'center' }}>
                <Grid item xs={12} sm={12} md={6} sx={chronicIllnessGridItemStyles}>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress variant="determinate" color={'error'} size={144} value={71} />
                        <Box
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="h4" component="div" color={Colors.white[50]}>
                                {/* <LinkNoEffect href='/wlmint'>{`71%`}</LinkNoEffect> */}
                                71%
                            </Typography>
                        </Box>
                    </Box>
                    <Typography
                        variant={'h6'}
                        color={theme.palette.error.main}
                        sx={{ mt: 5, width: '80%', textAlign: 'center' }}
                    >
                    {/* <LinkNoEffect href='/wlmint'>{`71%`}</LinkNoEffect> OF ALL ADULT DEATHS ARE CAUSED BY CHRONIC DISEASE */}
                    71% OF ALL ADULT DEATHS ARE CAUSED BY CHRONIC DISEASE
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} sx={chronicIllnessGridItemStyles}>
                    <Box sx={{ mt: 4 }}>
                        <ShowChart style={{ fontSize: '144px', color: theme.palette.error.main }} />
                    </Box>
                    <Typography
                        variant={'h6'}
                        color={theme.palette.error.main}
                        sx={{ mt: 4, width: '80%', textAlign: 'center' }}
                    >
                        CHRONIC DISEASE IS THE LEADING DRIVER OF THE NATION&apos;S $3.8 TRILLION IN ANNUAL HEALTH CARE
                        COSTS
                    </Typography>
                </Grid>
            </Grid>
        </Section>
    );
};
