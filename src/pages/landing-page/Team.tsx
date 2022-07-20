import React from 'react';
import { Section, FlipCard } from '../../components';
import { Spacer } from '@brightlayer-ui/react-components';
import { TRANSITION_GRADIENT_HEIGHT } from '../../shared';

// @mui imports
import styled from '@mui/material/styles/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/styles/useTheme';

// components
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// images
import JeremyMorrisWeb2 from '../../assets/headshots/jeremy_morris_web2.png';
import JeremyMorrisWeb3 from '../../assets/headshots/jeremy_morris_web3.png';
import ThomasDaileyWeb2 from '../../assets/headshots/thomas_dailey_web2.png';
import ThomasDaileyWeb3 from '../../assets/headshots/thomas_dailey_web3.png';
import BrettProthmanWeb2 from '../../assets/headshots/brett_prothman_web2.png';
import BrettProthmanWeb3 from '../../assets/headshots/brett_prothman_web3.png';
import NathanKocanWeb2 from '../../assets/headshots/nathan_kocan_web2.png';
import NathanKocanWeb3 from '../../assets/headshots/nathan_kocan_web3.png';
import { TwitterIconSVG as TwitterIcon } from '../../assets/images/twitter_icon';

type TeamCardData = {
    name: string;
    role: string;
    web2Avatar: string;
    web3Avatar: string;
    description: string;
    twitterHandle: string;
};

const teamCardData: TeamCardData[] = [
    {
        name: 'Jeremy Morris',
        role: 'Founder',
        web2Avatar: JeremyMorrisWeb2,
        web3Avatar: JeremyMorrisWeb3,
        description:
            "A licensed Optometrist with a passion for helping people, and health and fitness. He's been in crypto since 2017 and in NFTs since August 2021. He is passionate about web3 and sees this as the perfect opportunity to change healthcare and help others build and sustain a healthy future.",
        twitterHandle: 'WonderTheBeast',
    },
    {
        name: 'Brett Prothman',
        role: 'Founder',
        web2Avatar: BrettProthmanWeb2,
        web3Avatar: BrettProthmanWeb3,
        description:
            "A forward thinking entrepreneur with eight years of business development success.  Beginning his crypto adventure in 2017 and transitioning into NFTs in July 2021 he's experienced the highs and the lows and has witnessed what has worked and what hasn't. An adventure junkie at heart, he's always looking for the next thrill.",
        twitterHandle: 'NeoTokyo541',
    },
    {
        name: 'Nate Kocan',
        role: 'Founder',
        web2Avatar: NathanKocanWeb2,
        web3Avatar: NathanKocanWeb3,
        description:
            'A passionate entrepreneurial minded senior IT security and compliance auditor with extensive business growth and development experience and expertise ranging from an athletic clothing line to landscaping. Nate also began his crypto journey in 2017 when he read his first blockchain book. He has since continued to learn everything there is to know about the space.',
        twitterHandle: 'NFTswithNate',
    },
    {
        name: 'Thomas Dailey',
        role: 'Technical Founder',
        web2Avatar: ThomasDaileyWeb2,
        web3Avatar: ThomasDaileyWeb3,
        description:
            'Basement dwelling Pittsburgh native and sworn enemy of Internet Explorer, Tom is a self-taught front-end web developer who will stop at nothing to prove himself. After getting wrekt investing in crypto back in 2017, he came back with renewed vigor to build an empire in web3.',
        twitterHandle: 'daileytj',
    },
];
const sapienElevenFlipCardStyles = {
    minHeight: { xs: 400, sm: 350, md: 504, lg: 460, xl: 510 },
};

const CenteredCardContent = styled(CardContent)(() => ({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}));

const cardStyles = {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
};

const cardFrontTitleStyles = {
    fontFamily: 'besan',
    fontSize: '.875rem',
    textAlign: 'center',
    marginTop: 2,
};

const cardBackTitleStyles = {
    fontFamily: 'besan',
    fontSize: '.75rem',
};

export const Team = (): JSX.Element => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Section
            title={'Team'}
            align={'left'}
            background={'light'}
            sx={{ px: md ? 2 : 4, pt: 4, pb: `${32 + TRANSITION_GRADIENT_HEIGHT}px` }}
        >
            <Grid container spacing={2} sx={{ mt: 1 }}>
                {teamCardData.map((data) => (
                    <Grid key={data.name} item xs={12} sm={12} md={6} lg={4} xl={3}>
                        <FlipCard useHover sx={sapienElevenFlipCardStyles}>
                            <Card sx={cardStyles} elevation={4}>
                                <CenteredCardContent>
                                    <img src={data.web2Avatar} alt={data.name} style={{ width: 160 }} />
                                    <Typography sx={cardFrontTitleStyles}>{data.name}</Typography>
                                </CenteredCardContent>
                            </Card>
                            <Card sx={cardStyles} elevation={4}>
                                <CardHeader
                                    avatar={<img src={data.web3Avatar} alt={data.name} style={{ width: 40 }} />}
                                    title={data.role}
                                    sx={{ '& .MuiCardHeader-title': cardBackTitleStyles }}
                                />
                                <Divider />
                                <CardContent>
                                    <Typography>{data.description}</Typography>
                                </CardContent>
                                <Spacer />
                                <Divider />
                                <CardActions disableSpacing>
                                    <Button
                                        aria-label="twitter"
                                        target="_blank"
                                        href={`https://twitter.com/${data.twitterHandle}`}
                                        color={'primary'}
                                        startIcon={<TwitterIcon color={theme.palette.primary.main} size={32} />}
                                        fullWidth
                                    >
                                        @{data.twitterHandle}
                                    </Button>
                                </CardActions>
                            </Card>
                        </FlipCard>
                    </Grid>
                ))}
            </Grid>
        </Section>
    );
};
