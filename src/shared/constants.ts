
export const TRANSITION_GRADIENT_HEIGHT = 16;

export const PADDING = 24;

type ModuleType = {
    title?: string;
    dataLink?: string;
    description?: string;
}

type ModuleDataType = {
    title?:string;
    moduleType?: string;
    moduleData?: ModuleType[];
    description?: string;
};

export const MODULE_DATA: ModuleDataType[] = [
    {
        title: 'Diets',
        moduleType: 'diets',
        moduleData: [
            {
                title: "Ketogenic Diet",
                dataLink: "https://sapieneleven-80c21.web.app/Ketogenic/story_html5.html",
                description: "This is description of module",
            },
            {
                title: "Mediterranean Diet",
                dataLink: "https://sapieneleven-80c21.web.app/Mediterranean/story_html5.html",
                description: "This is description of module",
            },
            {
                title: "Paleo Diet",
                dataLink: "https://sapieneleven-80c21.web.app/Paleo%20Diet/story_html5.html",
                description: "This is description of module",
            },
            {
                title: "Whole 30 Diet",
                dataLink: "https://sapieneleven-80c21.web.app/Whole%2030%20Diet/story_html5.html",
                description: "This is description of module",
            },
        ],
        description:
            "An exclusive platform to educate community members on wellness and the body's chemistry as well as an all-in-one place for interactive and instructional experiences.",
    },
];
