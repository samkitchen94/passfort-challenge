import { render, screen } from '@testing-library/react';
import Document from '../components/Document';
import { BrowserRouter } from 'react-router-dom';
import * as ReactQuery from 'react-query';
import { queryClient } from './App.test';

const mockDocument = (
  <BrowserRouter>
    <ReactQuery.QueryClientProvider client={queryClient}>
      <Document />
    </ReactQuery.QueryClientProvider>
  </BrowserRouter>
);

describe('Document component', () => {
  it('renders loading message while data is being fetched', () => {
    jest.mock('react-query', () => ({
      useQuery: () => ({ isLoading: true }),
    }));

    render(mockDocument);
    expect(screen.getByText('Loading..')).toBeInTheDocument();
  });

  it('renders error message when an error occurs', async () => {
    jest
      .spyOn(ReactQuery, 'useQuery')
      .mockImplementation(
        jest
          .fn()
          .mockReturnValue({ data: null, isLoading: false, error: { message: "No documents available" } })
      )
    render(mockDocument);
    expect(screen.getByText('No documents available')).toBeInTheDocument();
  });

  it('renders list of documents when data is fetched successfully', () => {
    jest
      .spyOn(ReactQuery, 'useQuery')
      .mockImplementation(
        jest
          .fn()
          .mockReturnValue({ data: { data: "# latest revision", revisions: [1, 2, 3] }, isLoading: false, error: null })
      )
    render(mockDocument);
    const markdown = screen.getByText('latest revision');
    expect(markdown.tagName.toLowerCase()).toBe("h1");
    expect(screen.getByText('Previous Revisions:')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});