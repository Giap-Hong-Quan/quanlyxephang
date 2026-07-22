import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import router from './routes/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './libs/queryClient';
import { UIProvider } from './context/UiProvider';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ff7506',
            borderRadius: 16,
            controlHeight: 42,
            colorBgContainer: '#f8fafc',
            colorBorder: 'rgba(226, 232, 240, 0.9)',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
          },
          components: {
            Select: {
              borderRadius: 16,
              controlHeight: 42,
              colorBorder: 'rgba(226, 232, 240, 0.9)',
              optionSelectedBg: '#fff7ed',
              optionSelectedColor: '#ff7506',
              optionActiveBg: '#fff7ed',
              activeBorderColor: '#ff7506',
              hoverBorderColor: '#ff7506',
            },
            Input: {
              borderRadius: 16,
              controlHeight: 42,
              colorBorder: 'rgba(226, 232, 240, 0.9)',
              activeBorderColor: '#ff7506',
              hoverBorderColor: '#ff7506',
              activeShadow: '0 0 0 3px rgba(255, 117, 6, 0.15)',
            },
            DatePicker: {
              borderRadius: 16,
              controlHeight: 42,
              colorBorder: 'rgba(226, 232, 240, 0.9)',
              activeBorderColor: '#ff7506',
              hoverBorderColor: '#ff7506',
              cellActiveWithRangeBg: '#fff7ed',
            }
          }
        }}
      >
        <UIProvider>
          <Toaster richColors position="top-right" />
          <RouterProvider router={router} />
        </UIProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
