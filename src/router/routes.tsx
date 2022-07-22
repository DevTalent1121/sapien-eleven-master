import { LandingPage , PageOne/*, PageTwo*/  } from '../pages';
import Home from '@mui/icons-material/Home';
import LooksOne from '@mui/icons-material/LooksOne';
// import LooksTwo from '@mui/icons-material/LooksTwo';
// import { Engineering } from '@mui/icons-material';

export const PAGES = [
    {
        title: 'Home',
        route: '',
        component: LandingPage,
        icon: Home,
    },
    {
        title: 'Achademy',
        route: 'page-one',
        component: PageOne,
        icon: LooksOne,
    },
    // {
    //     title: 'WL Game',
    //     route: 'page-two',
    //     component: PageTwo,
    //     icon: LooksTwo,
    // },
];

