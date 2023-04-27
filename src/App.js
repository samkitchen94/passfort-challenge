import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import Router from './components/Router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey: [url] }) => {
        if (typeof url === 'string') {
          const data = await fetch(`${process.env.REACT_APP_API_URL}/${url.toLowerCase()}`)
          const json = await data.json();
          return json;
        }
        throw new Error('Invalid QueryKey')
      },
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router />
  </QueryClientProvider>
);

export default App;
