import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '13.5px', fontWeight: 600,
            borderRadius: '12px', padding: '10px 20px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          },
        }}
      />
    </QueryClientProvider>
  </React.StrictMode>
)