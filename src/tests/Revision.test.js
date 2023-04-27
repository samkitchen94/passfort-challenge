import { render, screen } from '@testing-library/react';
import Revision from '../components/Revision';
import { BrowserRouter } from 'react-router-dom';
import * as ReactQuery from 'react-query';
import { queryClient } from './App.test';

const mockRevision = (
  <BrowserRouter>
    <ReactQuery.QueryClientProvider client={queryClient}>
      <Revision />
    </ReactQuery.QueryClientProvider>
  </BrowserRouter>
);

describe('Revision component', () => {
  it('renders loading message while data is being fetched', () => {
    jest.mock('react-query', () => ({
      useQuery: () => ({ isLoading: true }),
    }));

    render(mockRevision);
    expect(screen.getByText('Loading..')).toBeInTheDocument();
  });

  it('renders error message when an error occurs', async () => {
    jest
      .spyOn(ReactQuery, 'useQuery')
      .mockImplementation(
        jest
          .fn()
          .mockReturnValue({ data: null, isLoading: false, error: { message: '' } })
      )
    render(mockRevision);
    expect(screen.getByText('This revision does not exist')).toBeInTheDocument();
  });

  it('displays the revision successfully when it exists', () => {
    jest
      .spyOn(ReactQuery, 'useQuery')
      .mockImplementation(
        jest
          .fn()
          .mockReturnValue({ data: { data: "## another revision", title: 'Revision 4' }, isLoading: false, error: null })
      )
    render(mockRevision);
    const markdown = screen.getByText('another revision');
    expect(markdown.tagName.toLowerCase()).toBe("h2");
    expect(screen.getByText('Revision 4')).toBeInTheDocument();
  });
});