import { LandingPage , AcademyPage, /*PageTwo*/  } from '../pages';
import Home from '@mui/icons-material/Home';
import LooksOne from '@mui/icons-material/LooksOne';
import LooksTwo from '@mui/icons-material/LooksTwo';
import { FitnessPage } from '../pages/Academy/FitnessPage';
// import { Engineering } from '@mui/icons-material';

export const PAGES = [
    {
        title: 'Home',
        route: '',
        component: LandingPage,
        icon: Home,
    },
    {
        title: 'Academy',
        route: 'academy',
        component: AcademyPage,
        icon: LooksOne,
        items: [
            {
                title: 'Fitness',
                route: 'fitness',
                component: FitnessPage,
                icon: LooksOne,
            },
            {
                title: 'Nutrition',
                route: 'nutrition',
                component: AcademyPage,
                icon: LooksOne,
            },
            {
                title: 'Diets',
                route: 'diets',
                component: AcademyPage,
                icon: LooksOne,
            },
            {
                title: 'Supplements',
                route: 'supplements',
                component: AcademyPage,
                icon: LooksOne,
            },
        ]
    },
    // {
    //     title: 'WL Game',
    //     route: 'page-two',
    //     component: PageTwo,
    //     icon: LooksTwo,
    // },
];

