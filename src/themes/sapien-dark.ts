/* eslint-disable */

import { createTheme } from '@mui/material/styles';
import { typography, createSimpleDarkPalette as createSimplePalette, customBreakpoints } from './shared';
import * as Colors from './colors';
import Color from 'color';

/* 
    Variable color definitions so we can reuse them in the theme overrides below
*/
const ThemeColors = {
    primary: createSimplePalette(Colors.red),
    secondary: createSimplePalette(Colors.blue),
    error: createSimplePalette(Colors.red),
    success: createSimplePalette(Colors.green),
    info: createSimplePalette(Colors.lightBlue),
    divider: Color(Colors.black[200]).alpha(0.36).string(),
    warning: {
        light: Colors.yellow[100],
        main: Colors.yellow[300],
        dark: Colors.yellow[900],
    },
    background: {
        default: Colors.darkBlack[800],
        paper: Colors.black[900],
    },
    text: {
        primary: Colors.black[50],
        secondary: Colors.black[200],
        disabled: Color(Colors.black[300]).alpha(0.36).string(),
        hint: Color(Colors.black[300]).alpha(0.36).string(),
    },
    action: {
        hover: Color(Colors.black[50]).alpha(0.1).string(),
        active: Colors.black[200],
        disabled: Color(Colors.black[300]).alpha(0.36).string(),
        disabledBackground: Color(Colors.black[200]).alpha(0.24).string(),
    },
};
const WhiteText = Colors.white[50];
const MediumBlackBackground = Colors.black[500];
const BlackText = Colors.black[500];
const Spacing = 8;

/*
    Refer to https://mui.com/customization/default-theme/ for a list of properties that are available
    to customize in our themes. These have changed periodically from version to version of Material UI.
*/
export const sapienDarkTheme = createTheme({
    direction: 'ltr',
    typography: typography,
    palette: {
        mode: 'dark',
        primary: ThemeColors.primary,
        secondary: ThemeColors.secondary,
        error: ThemeColors.error,
        success: ThemeColors.success,
        info: ThemeColors.info,
        divider: ThemeColors.divider,
        warning: ThemeColors.warning,
        background: ThemeColors.background,
        text: ThemeColors.text,
        action: ThemeColors.action,
    },
    breakpoints: customBreakpoints,
    components: {
        // APP BAR OVERRIDES
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
                colorDefault: {
                    color: ThemeColors.text.primary,
                    backgroundColor: Colors.darkBlack[100],
                },
                colorPrimary: {
                    color: ThemeColors.text.primary,
                    backgroundColor: Colors.black[800],
                },
                colorSecondary: {
                    color: ThemeColors.text.primary,
                    backgroundColor: ThemeColors.background.paper,
                },
            },
        },

        // AVATAR OVERRIDES
        MuiAvatar: {
            styleOverrides: {
                colorDefault: {
                    backgroundColor: Color(Colors.black[50]).alpha(0.1).string(),
                    color: ThemeColors.text.primary,
                },
            },
        },

        // BACKDROP OVERRIDES
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor: Color(Colors.darkBlack[900]).alpha(0.7).string(),
                },
            },
        },

        // BOTTOM NAVIGATION OVERRIDES
        MuiBottomNavigation: {
            styleOverrides: {
                root: {
                    backgroundColor: Colors.black[800],
                },
            },
        },

        MuiBottomNavigationAction: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        '& .MuiBottomNavigationAction-label': {
                            fontSize: '0.75rem',
                            fontWeight: 600,
                        },
                    },
                    '&:not(.Mui-selected) .MuiBottomNavigationAction-label': {
                        color: ThemeColors.text.primary,
                    },
                },
            },
        },

        // BUTTON OVERRIDES
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: Colors.black[400],
                    },
                },
                outlined: {
                    borderColor: Colors.black[200],
                    '&:hover': {
                        backgroundColor: Color(Colors.black[50]).alpha(0.1).string(),
                    },
                    '&.Mui-disabled': {
                        borderColor: Color(Colors.black[200]).alpha(0.36).string(),
                        color: ThemeColors.action.disabled,
                    },
                },
                outlinedPrimary: {
                    borderColor: ThemeColors.primary.main,
                    '&:hover': {
                        backgroundColor: Color(ThemeColors.primary.dark).alpha(0.2).string(),
                    },
                },
                outlinedSecondary: {
                    '&:not(.Mui-disabled)': {
                        borderColor: ThemeColors.secondary.main,
                        '&:hover': {
                            backgroundColor: Color(ThemeColors.secondary.dark).alpha(0.2).string(),
                        },
                    },
                    '&.Mui-disabled': {
                        borderColor: Color(Colors.black[200]).alpha(0.36).string(),
                        color: ThemeColors.action.disabled,
                    },
                },
                contained: {
                    backgroundColor: MediumBlackBackground,
                    color: WhiteText,
                    '&:hover': {
                        backgroundColor: Colors.black[400],
                    },
                    '&.Mui-disabled': {
                        backgroundColor: ThemeColors.action.disabledBackground,
                        color: Colors.black[400],
                    },
                },
                containedPrimary: {
                    backgroundColor: ThemeColors.primary.dark,
                    color: WhiteText,
                    '&:hover': {
                        backgroundColor: Colors.blue[300],
                    },
                    '&.Mui-disabled': {
                        borderWidth: 0,
                    },
                },
                containedSecondary: {
                    backgroundColor: ThemeColors.secondary.dark,
                    color: WhiteText,
                    '&:hover': {
                        backgroundColor: Colors.lightBlue[300],
                    },
                    '&.Mui-disabled': {
                        borderWidth: 0,
                    },
                },
                text: {
                    '&.Mui-disabled': {
                        color: ThemeColors.action.disabled,
                    },
                    '&:hover': {
                        backgroundColor: ThemeColors.action.hover,
                    },
                },
                textPrimary: {
                    '&:hover': {
                        backgroundColor: Color(ThemeColors.primary.dark).alpha(0.2).string(),
                    },
                },
                textSecondary: {
                    '&:hover': {
                        backgroundColor: Color(ThemeColors.secondary.dark).alpha(0.2).string(),
                    },
                },
            },
        },

        // BUTTON BASE OVERRIDES
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    '&.MuiPickersDay-root': {
                        backgroundColor: 'transparent',
                    },
                },
            },
        },

        // BUTTON GROUP OVERRIDES
        MuiButtonGroup: {
            styleOverrides: {
                outlined: {
                    color: Colors.black[50],
                },
                groupedText: {
                    '&:not(:last-child).Mui-disabled': {
                        borderColor: ThemeColors.divider,
                    },
                },
                groupedTextPrimary: {
                    '&:not(:last-child).Mui-disabled': {
                        borderColor: ThemeColors.divider,
                    },
                },
                groupedTextSecondary: {
                    '&:not(:last-child).Mui-disabled': {
                        borderColor: ThemeColors.divider,
                    },
                },
            },
        },

        // CHIP OVERRIDES
        MuiChip: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem',
                    backgroundColor: MediumBlackBackground,
                    color: ThemeColors.text.primary,
                    '& .MuiChip-avatar': {
                        backgroundColor: Colors.black[700],
                        color: ThemeColors.text.primary,
                        marginRight: -4,
                    },
                    '& .MuiChip-avatarColorPrimary': {
                        backgroundColor: ThemeColors.primary.light,
                        color: ThemeColors.primary.dark,
                    },
                    '& .MuiChip-avatarColorSecondary': {
                        backgroundColor: ThemeColors.primary.light,
                        color: ThemeColors.primary.dark,
                    },
                    '&.Mui-disabled': {
                        opacity: 1,
                        backgroundColor: Color(Colors.black[200]).alpha(0.24).string(),
                        color: Colors.black[400],
                        '& .MuiChip-avatar': {
                            opacity: 0.5,
                        },
                        '& .MuiChip-deleteIcon': {
                            color: ThemeColors.action.disabled,
                        },
                        '& .MuiChip-icon': {
                            color: ThemeColors.action.disabled,
                        },
                    },
                },
                clickable: {
                    '&:hover': {
                        backgroundColor: Colors.black[400],
                    },
                    '&.MuiChip-clickableColorPrimary': {
                        '&:hover': {
                            backgroundColor: Colors.blue[300],
                        },
                    },
                    '&.MuiChip-clickableColorSecondary': {
                        '&:hover': {
                            backgroundColor: Colors.lightBlue[300],
                        },
                    },
                },
                colorPrimary: {
                    color: WhiteText,
                    backgroundColor: ThemeColors.primary.dark,
                },
                colorSecondary: {
                    color: WhiteText,
                    backgroundColor: ThemeColors.secondary.dark,
                },
                deleteIcon: {
                    fontSize: '1.125rem',
                    height: '1.125rem',
                    width: '1.125rem',
                    margin: `0px ${Spacing}px 0px -4px`,
                    color: ThemeColors.text.secondary,
                    '&:hover': {
                        color: ThemeColors.text.primary,
                    },
                    '&.MuiChip-deleteIconColorPrimary': {
                        color: Colors.blue[100],
                        '&:hover': {
                            color: WhiteText,
                        },
                    },
                    '&.MuiChip-deleteIconColorSecondary': {
                        color: Colors.lightBlue[100],
                        '&:hover': {
                            color: WhiteText,
                        },
                    },
                },
                iconColorPrimary: {
                    color: 'inherit',
                },
                iconColorSecondary: {
                    color: 'inherit',
                },
                outlined: {
                    backgroundColor: ThemeColors.background.paper,
                    borderColor: Color(Colors.black[200]).alpha(0.32).string(),
                    '&.MuiChip-clickable:hover': {
                        backgroundColor: Colors.black[800],
                    },
                    '& .MuiChip-avatar': {
                        backgroundColor: Colors.black[600],
                        color: ThemeColors.text.primary,
                        marginRight: -4,
                    },
                    '& .MuiChip-avatarColorPrimary': {
                        backgroundColor: Colors.blue[100],
                        color: ThemeColors.primary.dark,
                    },
                    '& .MuiChip-avatarColorSecondary': {
                        backgroundColor: Colors.blue[100],
                        color: ThemeColors.primary.dark,
                    },
                    '& .MuiChip-icon': {
                        marginLeft: Spacing,
                        marginRight: -4,
                    },
                    '& .MuiChip-deleteIcon': {
                        margin: `0px ${Spacing}px 0px -4px`,
                    },
                    '&.Mui-disabled .MuiChip-deleteIcon': {
                        color: 'inherit',
                    },
                    '&.MuiChip-outlinedPrimary': {
                        backgroundColor: Color(ThemeColors.primary.dark).alpha(0.2).string(),
                        border: `1px solid ${Color(ThemeColors.primary.dark).alpha(0.2).string()}`,
                        color: ThemeColors.primary.main,
                        '&.MuiChip-clickable:hover': {
                            backgroundColor: Color(ThemeColors.primary.dark).alpha(0.3).string(),
                        },
                        '& .MuiChip-deleteIconOutlinedColorPrimary': {
                            color: Colors.blue[400],
                            '&:hover': {
                                color: ThemeColors.primary.main,
                            },
                        },
                        '&.Mui-disabled': {
                            opacity: 1,
                            borderColor: Color(Colors.black[200]).alpha(0.36).string(),
                            backgroundColor: 'transparent',
                            color: Colors.black[400],
                            '& .MuiChip-deleteIconOutlinedColorPrimary': {
                                color: 'inherit',
                            },
                        },
                    },
                    '&.MuiChip-outlinedSecondary': {
                        backgroundColor: Color(ThemeColors.secondary.main).alpha(0.2).string(),
                        border: `1px solid ${ThemeColors.secondary.main}`,
                        color: ThemeColors.secondary.main,
                        '&.MuiChip-clickable:hover': {
                            backgroundColor: Color(ThemeColors.secondary.dark).alpha(0.3).string(),
                        },
                        '& .MuiChip-deleteIconOutlinedColorSecondary': {
                            color: Colors.lightBlue[400],
                            '&:hover': {
                                color: ThemeColors.secondary.main,
                            },
                        },
                        '&.Mui-disabled': {
                            opacity: 1,
                            backgroundColor: ThemeColors.background.paper,
                            color: ThemeColors.action.disabled,
                            borderColor: Color(Colors.black[200]).alpha(0.36).string(),
                            '& .MuiChip-deleteIconOutlinedColorSecondary': {
                                color: 'inherit',
                            },
                        },
                    },
                },
            },
        },

        // DRAWER OVERRIDES
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: Colors.darkBlack[300],
                },
                paperAnchorBottom: {
                    backgroundColor: ThemeColors.background.paper,
                },
            },
        },

        // FAB OVERRIDES
        MuiFab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    backgroundColor: MediumBlackBackground,
                    color: WhiteText,
                    '&:hover': {
                        backgroundColor: Colors.black[300],
                    },
                },
                primary: {
                    backgroundColor: ThemeColors.primary.dark,
                    color: WhiteText,
                    '&:hover': {
                        backgroundColor: Colors.blue[300],
                    },
                },
                secondary: {
                    backgroundColor: ThemeColors.secondary.dark,
                    color: WhiteText,
                    '&:hover': {
                        backgroundColor: Colors.lightBlue[300],
                    },
                },
            },
        },

        //LIST ITEM OVERRIDES (plus nav drawer)
        MuiListItem: {
            styleOverrides: {
                root: {
                    color: ThemeColors.text.primary,
                },
            },
        },

        //LIST Sub header OVERRIDES (User Menu)
        MuiListSubheader: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                },
            },
        },
        // MOBILE STEPPER OVERRIDES
        MuiMobileStepper: {
            styleOverrides: {
                dot: {
                    backgroundColor: Color(Colors.black[300]).alpha(0.36).string(),
                    margin: `0px 4px`,
                },
                dotActive: {
                    backgroundColor: ThemeColors.primary.dark,
                },
            },
        },

        // PROGRESS OVERRIDES
        MuiLinearProgress: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: Color(ThemeColors.primary.dark).darken(0.7).string(),
                },
                colorSecondary: {
                    backgroundColor: Color(ThemeColors.secondary.dark).darken(0.7).string(),
                },
                dashedColorPrimary: {
                    backgroundImage: `radial-gradient(${Color(ThemeColors.primary.dark)
                        .darken(0.5)
                        .string()} 0%, ${Color(ThemeColors.primary.dark).darken(0.7).string()} 16%, transparent 42%)`,
                },
                dashedColorSecondary: {
                    backgroundImage: `radial-gradient(${Color(ThemeColors.secondary.dark)
                        .darken(0.5)
                        .string()} 0%, ${Color(ThemeColors.secondary.dark).darken(0.7).string()} 16%, transparent 42%)`,
                },
                barColorPrimary: {
                    backgroundColor: ThemeColors.primary.dark,
                },
                barColorSecondary: {
                    backgroundColor: ThemeColors.secondary.dark,
                },
            },
        },

        MuiCircularProgress: {
            styleOverrides: {
                colorPrimary: {
                    color: ThemeColors.primary.dark,
                },
                colorSecondary: {
                    color: ThemeColors.secondary.dark,
                },
            },
        },

        // SLIDER OVERRIDES
        MuiSlider: {
            styleOverrides: {
                root: {
                    height: 6,
                    color: Colors.blue[300],
                },
                colorSecondary: {
                    color: Colors.lightBlue[300],
                },
                track: {
                    height: 6,
                },
                rail: {
                    height: 4,
                    backgroundColor: Colors.black[300],
                },
                thumb: {
                    backgroundColor: ThemeColors.primary.main,
                },
                thumbColorSecondary: {
                    backgroundColor: ThemeColors.secondary.main,
                },
                mark: {
                    backgroundColor: ThemeColors.primary.dark,
                },
                markActive: {
                    backgroundColor: ThemeColors.primary.dark,
                },
                valueLabel: {
                    backgroundColor: Colors.blue[300],
                    color: Color(Colors.darkBlack[900]).alpha(0.87).string(),
                },
            },
        },

        // SNACKBAR OVERRIDES
        MuiSnackbarContent: {
            styleOverrides: {
                root: {
                    color: BlackText,
                    '& .MuiButton-textPrimary': {
                        color: ThemeColors.primary.dark,
                    },
                    '& .MuiButton-textSecondary': {
                        color: Colors.lightBlue[500],
                    },
                },
            },
        },

        // STEPPER OVERRIDES
        MuiStepConnector: {
            styleOverrides: {
                line: {
                    borderColor: ThemeColors.divider,
                },
            },
        },

        MuiStep: {
            styleOverrides: {
                root: {
                    '&.Mui-completed': {
                        '& .MuiStepLabel-iconContainer:before': {
                            content: '""',
                            position: 'absolute',
                            display: 'block',
                            top: '5%',
                            right: '5%',
                            bottom: '5%',
                            left: '5%',
                            backgroundColor: Colors.white[50],
                            borderRadius: '50%',
                        },
                    },
                },
            },
        },

        MuiStepIcon: {
            styleOverrides: {
                root: {
                    zIndex: 1,
                    '&.Mui-active': {
                        color: ThemeColors.primary.dark,
                        '& .MuiStepIcon-text': {
                            fill: WhiteText,
                            fontWeight: 600,
                        },
                    },
                    '&.Mui-completed': {
                        color: ThemeColors.primary.dark,
                        '& .MuiStepIcon-text': {
                            fill: WhiteText,
                            fontWeight: 600,
                        },
                    },
                },
                text: {
                    color: ThemeColors.text.primary,
                    fill: Colors.black[300],
                },
            },
        },

        MuiStepLabel: {
            styleOverrides: {
                label: {
                    color: ThemeColors.text.secondary,
                    '&.Mui-active': {
                        fontWeight: 600,
                        color: ThemeColors.primary.main,
                    },
                    '&.Mui-completed': {
                        color: ThemeColors.text.secondary,
                        fontWeight: 600,
                    },
                },
                iconContainer: {
                    position: 'relative',
                    paddingRight: 0,
                    marginRight: Spacing,
                },
            },
        },

        // SWITCH OVERRIDES
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    color: ThemeColors.text.primary,
                    '&.Mui-checked + .MuiSwitch-track': {
                        opacity: 0.38,
                    },
                    '&.Mui-checked': {
                        color: ThemeColors.secondary.main,
                        '&.Mui-disabled': {
                            color: Color(ThemeColors.secondary.main)
                                .mix(Color(ThemeColors.background.paper), 0.5)
                                .string(),
                        },
                        '&.Mui-disabled + .MuiSwitch-track': {
                            backgroundColor: ThemeColors.secondary.main,
                        },
                    },
                },
                colorPrimary: {
                    '&.Mui-disabled': {
                        color: Color(Colors.white[50]).mix(Color(ThemeColors.background.paper), 0.5).string(),
                    },
                    '&.Mui-disabled + .MuiSwitch-track': {
                        backgroundColor: Colors.black[300],
                    },
                    '&.Mui-checked': {
                        color: ThemeColors.primary.main,
                        '&.Mui-disabled': {
                            color: Color(ThemeColors.primary.main)
                                .mix(Color(ThemeColors.background.paper), 0.5)
                                .string(),
                        },
                        '&.Mui-disabled + .MuiSwitch-track': {
                            opacity: 0.38,
                            backgroundColor: Color(ThemeColors.primary.main)
                                .mix(Color(ThemeColors.background.paper), 0.5)
                                .string(),
                        },
                    },
                },
                colorSecondary: {
                    '&.Mui-disabled': {
                        color: Color(Colors.white[50]).mix(Color(ThemeColors.background.paper), 0.5).string(),
                    },
                    '&.Mui-disabled + .MuiSwitch-track': {
                        backgroundColor: Colors.black[300],
                    },
                },
                track: {
                    backgroundColor: Colors.black[300],
                    opacity: 0.38,
                },
            },
        },

        // TABLE OVERRIDES
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: `1px solid ${ThemeColors.divider}`,
                },
                head: {
                    fontWeight: 600,
                },
            },
        },

        MuiTableRow: {
            styleOverrides: {
                root: {
                    color: ThemeColors.text.primary,
                    '&.MuiTableRow-hover:hover': {
                        backgroundColor: Color(Colors.darkBlack[300]).mix(Color(MediumBlackBackground), 0.5).string(),
                    },
                    '&.Mui-selected': {
                        backgroundColor: Color(ThemeColors.primary.dark).alpha(0.2).string(),
                        '&.MuiTableRow-hover:hover': {
                            backgroundColor: Color(ThemeColors.primary.dark).alpha(0.2).string(),
                            '&.MuiTableRow-hover:hover': {
                                backgroundColor: Color(ThemeColors.primary.dark)
                                    .mix(Color(MediumBlackBackground), 0.5)
                                    .alpha(0.2)
                                    .string(),
                            },
                        },
                    },
                },
            },
        },

        MuiTableSortLabel: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        color: ThemeColors.text.primary,
                        '& .MuiTableSortLabel-icon': {
                            color: ThemeColors.text.secondary,
                            opacity: 1,
                        },
                    },
                },
                icon: {
                    opacity: 1,
                    color: Color(Colors.black[200]).alpha(0.24).string(),
                },
            },
        },

        // TABS OVERRIDES
        MuiTab: {
            styleOverrides: {
                root: {
                    fontWeight: 400,
                    '&.Mui-selected': {
                        fontWeight: 600,
                    },
                },
                textColorInherit: {
                    color: ThemeColors.text.secondary,
                    opacity: 1,
                    '&.Mui-selected': {
                        color: ThemeColors.primary.main,
                    },
                },
            },
        },

        MuiTabs: {
            styleOverrides: {
                root: {
                    color: ThemeColors.text.secondary,
                },
                indicator: {
                    backgroundColor: ThemeColors.primary.main,
                },
            },
        },

        // TOOLTIP OVERRIDES
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: '0.75rem',
                },
            },
        },

        // TEXT FIELD OVERRIDES
        MuiInputBase: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        color: ThemeColors.text.disabled,
                    },
                },
                input: {
                    '&::placeholder': {
                        color: Colors.black[300],
                        opacity: 0.36,
                    },
                    '&:-webkit-autofill': {
                        WebkitBoxShadow: `0 0 0 100px ${ThemeColors.background.paper} inset`,
                        WebkitTextFillColor: ThemeColors.text.primary,
                    },
                },
            },
        },

        MuiInput: {
            styleOverrides: {
                underline: {
                    '&:before': {
                        borderBottomColor: ThemeColors.divider,
                    },
                    '&:not(.Mui-disabled):hover:before': {
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.black[200],
                    },
                    '&:after': {
                        borderBottomColor: ThemeColors.primary.dark,
                    },
                    '&.Mui-error.Mui-focused:after': {
                        borderBottomColor: ThemeColors.error.dark,
                    },
                    '&.Mui-error:not(.Mui-focused):after': {
                        borderBottomWidth: 1,
                        borderBottomColor: ThemeColors.error.dark,
                    },
                    '&.Mui-error:not(.Mui-focused):hover:after': {
                        borderBottomColor: ThemeColors.error.main,
                    },
                    '&.MuiInput-colorSecondary:not(.Mui-error):after': {
                        borderBottomColor: ThemeColors.secondary.dark,
                    },
                    '&.Mui-disabled:before': {
                        borderBottomColor: ThemeColors.divider,
                        borderBottomStyle: 'solid',
                    },
                },
            },
        },

        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: Colors.black[800],
                    '&:hover': {
                        backgroundColor: Colors.black[600],
                    },
                    '&.Mui-focused': {
                        backgroundColor: Colors.black[800],
                    },
                    '&.Mui-disabled': {
                        color: ThemeColors.text.disabled,
                        backgroundColor: Color(Colors.black[800]).alpha(0.5).string(),
                        pointerEvents: 'none',
                    },
                },
                input: {
                    '&:-webkit-autofill': {
                        WebkitBoxShadow: `0 0 0 100px ${Colors.black[800]} inset`,
                    },
                },
                underline: {
                    '&:before': {
                        borderBottomColor: ThemeColors.divider,
                    },
                    '&:after': {
                        borderBottomColor: ThemeColors.primary.dark,
                    },
                    '&.Mui-error.Mui-focused:after': {
                        borderBottomColor: ThemeColors.error.dark,
                    },
                    '&.Mui-error:not(.Mui-focused):after': {
                        borderBottomWidth: 1,
                        borderBottomColor: ThemeColors.error.dark,
                    },
                    '&.Mui-error:not(.Mui-focused):hover:after': {
                        borderBottomColor: ThemeColors.error.main,
                    },
                    '&.Mui-disabled:before': {
                        borderBottomStyle: 'solid',
                    },
                    '&.MuiFilledInput-colorSecondary:not(.Mui-error):after': {
                        borderBottomColor: ThemeColors.secondary.dark,
                    },
                },
            },
        },

        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                        borderColor: ThemeColors.error.dark,
                    },
                    '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: ThemeColors.divider,
                    },
                    '&.Mui-error.MuiOutlinedInput-colorSecondary.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: ThemeColors.error.dark,
                    },
                    '&.Mui-error:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
                        borderColor: ThemeColors.error.main,
                    },
                    '&.MuiInputBase-colorPrimary.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: Colors.blue[500],
                    },
                    '&.MuiInputBase-colorSecondary.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: Colors.lightBlue[500],
                    },
                    '&.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline': {
                        borderColor: ThemeColors.error.dark,
                    },
                },
                input: {
                    '&:-webkit-autofill': {
                        WebkitBoxShadow: `0 0 0 100px ${Colors.black[900]} inset`,
                    },
                },
                notchedOutline: {
                    borderColor: ThemeColors.divider,
                },
            },
        },

        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: ThemeColors.text.secondary,
                    '&.Mui-disabled': {
                        color: ThemeColors.text.disabled,
                    },
                    '&.MuiFormLabel-filled:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error)': {
                        color: ThemeColors.text.primary,
                    },
                    '&.Mui-error.MuiFormLabel-colorSecondary.Mui-focused': {
                        color: ThemeColors.error.main,
                    },
                },
            },
        },

        // TOGGLE BUTTON OVERRIDES (LAB)
        // @ts-ignore
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    backgroundColor: ThemeColors.background.paper,
                },
                groupedHorizontal: {
                    '&:not(:first-child)': {
                        marginLeft: 0,
                    },
                },
                groupedVertical: {
                    '&:not(:first-child)': {
                        marginTop: 0,
                    },
                },
            },
        },

        // @ts-ignore
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    backgroundColor: ThemeColors.background.paper,
                    color: Colors.gray[500],
                    borderColor: Color(Colors.black[200]).alpha(0.32).string(),
                    '&.Mui-selected': {
                        backgroundColor: Color(ThemeColors.primary.dark).alpha(0.36).string(),
                        color: ThemeColors.primary.main,
                        '&:hover': {
                            backgroundColor: Color(ThemeColors.primary.main).alpha(0.36).string(),
                        },
                    },
                    '&:hover': {
                        backgroundColor: ThemeColors.action.hover,
                    },
                    '&.Mui-disabled': {
                        color: ThemeColors.action.disabled,
                    },
                },
            },
        },
    },
});
