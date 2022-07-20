import { LandingPage /*, PageOne, PageTwo */ } from '../pages';
import Home from '@mui/icons-material/Home';
// import LooksOne from '@mui/icons-material/LooksOne';
// import LooksTwo from '@mui/icons-material/LooksTwo';

export const PAGES = [
    {
        title: 'Home',
        route: '',
        component: LandingPage,
        icon: Home,
    },
    // {
    //     title: 'Page One',
    //     route: 'page-one',
    //     component: PageOne,
    //     icon: LooksOne,
    // },
    // {
    //     title: 'Page Two',
    //     route: 'page-two',
    //     component: PageTwo,
    //     icon: LooksTwo,
    // },
];
