import { render, screen } from '@testing-library/react';
import Wiki from '../components/Wiki';
import { BrowserRouter } from 'react-router-dom';
import * as ReactQuery from 'react-query';
import { queryClient } from './App.test';

const mockWiki = (
  <BrowserRouter>
    <ReactQuery.QueryClientProvider client={queryClient}>
      <Wiki />
    </ReactQuery.QueryClientProvider>
  </BrowserRouter>
);

describe('Wiki component', () => {
  it('renders loading message while data is being fetched', () => {
    jest.mock('react-query', () => ({
      useQuery: () => ({ isLoading: true }),
    }));

    render(mockWiki);
    expect(screen.getByText('Loading..')).toBeInTheDocument();
  });

  it('renders error message when an error occurs', async () => {
    jest
      .spyOn(ReactQuery, 'useQuery')
      .mockImplementation(
        jest
          .fn()
          .mockReturnValue({ data: null, isLoading: false, error: { message: "Error" } })
      )
    render(mockWiki);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders list of documents when data is fetched successfully', () => {
    jest
      .spyOn(ReactQuery, 'useQuery')
      .mockImplementation(
        jest
          .fn()
          .mockReturnValue({ data: { titles: ['Document 1', 'Document 2', 'Document 3'] }, isLoading: false, error: null })
      )
    render(mockWiki);
    expect(screen.getByText('List of Documents:')).toBeInTheDocument();
    expect(screen.getByText('Document 1')).toBeInTheDocument();
    expect(screen.getByText('Document 2')).toBeInTheDocument();
    expect(screen.getByText('Document 3')).toBeInTheDocument();
  });
});