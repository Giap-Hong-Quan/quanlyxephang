import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner'
import router from './routes/router';
import { store } from './stores/store';
import { Provider } from 'react-redux';
function App() {
  return (
     <Provider store={store}>
     <>
        <Toaster richColors position="top-right" />
        <RouterProvider router={router} />
      </>
    </Provider>
  );
}

export default App;
