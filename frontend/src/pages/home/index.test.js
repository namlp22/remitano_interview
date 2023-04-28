import { render, screen, waitFor } from '@testing-library/react';
import Home from './index';
import { getMovieList } from '../../services/movie';

jest.mock('../../services/movie', () => ({
  getMovieList: jest.fn(),
}));

describe('Home', () => {
  it('renders movie sections', async () => {
    const movieList = [
      {
        title: 'Movie 1',
        videoKey: 'abc',
        author: 'User 1',
      },
      {
        title: 'Movie 2',
        videoKey: 'def',
        author: 'User 2',
      },
    ];
    getMovieList.mockResolvedValueOnce(movieList);

    render(<Home />);

    await waitFor(() => expect(getMovieList).toHaveBeenCalled());

    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });

  it('renders empty state when movie list is empty', async () => {
    getMovieList.mockResolvedValueOnce([]);

    render(<Home />);

    await waitFor(() => expect(getMovieList).toHaveBeenCalled());

    expect(screen.getByText('No movies to display.')).toBeInTheDocument();
  });

  it('renders error message when fetching movie list fails', async () => {
    const errorMessage = 'Failed to fetch movie list.';
    getMovieList.mockRejectedValueOnce({ message: errorMessage });

    render(<Home />);

    await waitFor(() => expect(getMovieList).toHaveBeenCalled());

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
