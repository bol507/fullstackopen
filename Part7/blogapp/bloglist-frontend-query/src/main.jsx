import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { NotificationContextProvider } from './contexts/NotificationContext';
import { BlogContextProvider } from './contexts/blogContext';
import { UserContextProvider } from './contexts/userContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <BlogContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </BlogContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
);
