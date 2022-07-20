import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, Theme, createTheme, StyledEngineProvider } from '@mui/material/styles';
import { sapienLight } from './themes';
import { LandingPage } from './pages';
import { DrawerContext } from './contexts/drawerContextProvider';

declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line
    interface DefaultTheme extends Theme {}
}

test('renders welcome text', () => {
    render(
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={createTheme(sapienLight)}>
                <DrawerContext.Provider
                    value={{
                        drawerOpen: true,
                        setDrawerOpen: jest.fn(),
                    }}
                >
                    <LandingPage />
                </DrawerContext.Provider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
    const sapienText = screen.getByText(/Sapien Eleven/i);
    expect(sapienText).toBeInTheDocument();
});
