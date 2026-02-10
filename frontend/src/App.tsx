import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner'
import router from './routes/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './libs/queryClient';
function App() {
  
  return (
     <>
     <QueryClientProvider client={queryClient}>
        <Toaster richColors position="top-right" />
        <RouterProvider router={router} />
      </QueryClientProvider>
      </>
  );
}

export default App;
