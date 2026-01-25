import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner'
import router from './routes/router';
function App() {
  
  return (
    
     <>
        <Toaster richColors position="top-right" />
        <RouterProvider router={router} />
        
      </>
  );
}

export default App;
