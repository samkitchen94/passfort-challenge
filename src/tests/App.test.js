import { render, screen } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import * as ReactQuery from 'react-query';

export const queryClient = new ReactQuery.QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

test('renders learn react link', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const title = screen.getByText(/Loading../i);
  expect(title).toBeInTheDocument();
});
