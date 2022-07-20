import { SimplePaletteColorOptions } from '@mui/material';
import { SEColor } from './colors';

export const typography = {
    fontFamily: '"Open Sans", Helvetica, Roboto, sans-serif',
    fontWeightMedium: 600,
    h6: {
        fontWeight: 600,
    },
    subtitle1: {
        fontWeight: 600,
    },
    subtitle2: {
        fontWeight: 600,
    },
    body1: {
        lineHeight: '1.5',
    },
    body2: {
        lineHeight: '1.43',
    },
    button: {
        fontWeight: 600,
        lineHeight: '1.75',
    },
    overline: {
        letterSpacing: '2px',
        fontSize: '0.75rem',
        fontWeight: 600,
        lineHeight: '2.67',
    },
    caption: {
        lineHeight: '1.67',
    },
};

export const customBreakpoints = {
    values: {
        xs: 0,
        sm: 432,
        md: 600,
        lg: 1000,
        xl: 1200,
    },
};

export const createSimpleLightPalette = (color: SEColor): SimplePaletteColorOptions => ({
    light: color[50],
    main: color[500],
    dark: color[700],
});

export const createSimpleDarkPalette = (color: SEColor): SimplePaletteColorOptions => ({
    light: color[50],
    main: color[200],
    dark: color[500],
});
