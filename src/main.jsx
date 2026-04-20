import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {HeroUIProvider} from "@heroui/react";
import { ToastContainer} from 'react-toastify';
import AuthContextProvider from './context/AuthContext.jsx';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
       <ToastContainer />
       <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
      </AuthContextProvider>
    </HeroUIProvider>
  </StrictMode>,
)
