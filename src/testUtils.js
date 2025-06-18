import { render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react';

const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

export const renderWithTheme = (component) => {
  const theme = createTheme();
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

export const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <ThemeProvider theme={createTheme()}>
      <MemoryRouter initialEntries={[route]} future={router.future}>
        {ui}
      </MemoryRouter>
    </ThemeProvider>
  );
};

export const renderWithAppRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <ThemeProvider theme={createTheme()}>
      {ui}
    </ThemeProvider>
  );
};

export const waitForStateUpdate = async () => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
  });
}; 