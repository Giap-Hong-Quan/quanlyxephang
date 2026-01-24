import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner'
import router from './routes/router';
import { getProfile } from './services/authService';
function App() {
  return (
    
     <>
        <Toaster richColors position="top-right" />
        <RouterProvider router={router} />
        
      </>
  );
}

export default App;
