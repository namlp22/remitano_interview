import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppRoute, { RequireAuth } from './AppRoute';

jest.mock('../utils', () => ({
  isUserLoggedIn: jest.fn(() => true),
}));

describe('AppRoute', () => {
  it('renders home page by default', () => {
    render(
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    );

    expect(screen.getByText('Welcome to My App')).toBeInTheDocument();
  });

  it('renders share page when authenticated', () => {
    jest.spyOn(require('../utils'), 'isUserLoggedIn').mockReturnValue(true);

    render(
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    );

    expect(screen.getByText('Share a Movie')).toBeInTheDocument();
  });

  it('redirects to home page when not authenticated', () => {
    jest.spyOn(require('../utils'), 'isUserLoggedIn').mockReturnValue(false);

    render(
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    );

    expect(screen.getByText('Welcome to My App')).toBeInTheDocument();
  });
});

describe('RequireAuth', () => {
  it('renders child components when authenticated', () => {
    jest.spyOn(require('../utils'), 'isUserLoggedIn').mockReturnValue(true);

    const MockChild = () => <div>Mock child component</div>;

    render(
      <BrowserRouter>
        <RequireAuth>
          <MockChild />
        </RequireAuth>
      </BrowserRouter>
    );

    expect(screen.getByText('Mock child component')).toBeInTheDocument();
  });

  it('redirects to home page when not authenticated', () => {
    jest.spyOn(require('../utils'), 'isUserLoggedIn').mockReturnValue(false);

    render(
      <BrowserRouter>
        <RequireAuth />
      </BrowserRouter>
    );

    expect(screen.getByText('Welcome to My App')).toBeInTheDocument();
  });
});
