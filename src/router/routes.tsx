import { LandingPage , AcademyPage, /*PageTwo*/  } from '../pages';
import Home from '@mui/icons-material/Home';
import LooksOne from '@mui/icons-material/LooksOne';
import LooksTwo from '@mui/icons-material/LooksTwo';
import { FitnessPage } from '../pages/Academy/FitnessPage';
import { NutritionPage } from '../pages/Academy/NutritionPage';
import { DietsPage } from '../pages/Academy/DietsPage';
import { RecipesPage } from '../pages/Academy/RecipesPage';
import { SupplementsPage } from '../pages/Academy/SupplementsPage';
import { YogaPage } from '../pages/Academy/YogaPage';
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
                title: 'Yoga',
                route: 'yoga',
                component: YogaPage,
                icon: LooksOne,
            },
            {
                title: 'Nutrition',
                route: 'nutrition',
                component: NutritionPage,
                icon: LooksOne,
            },
            {
                title: 'Diets',
                route: 'diets',
                component: DietsPage,
                icon: LooksOne,
            },
            {
                title: 'Recipes',
                route: 'recipes',
                component: RecipesPage,
                icon: LooksOne,
            },
            {
                title: 'Supplements',
                route: 'supplements',
                component: SupplementsPage,
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

