import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { NotificationContextProvider } from './contexts/notificationContext'; 
import { BlogContextProvider } from './contexts/blogContext';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
  <BlogContextProvider>
  <NotificationContextProvider>
    <App />
  </NotificationContextProvider>
  </BlogContextProvider>
  </QueryClientProvider>
);
