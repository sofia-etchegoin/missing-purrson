import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import router from './routes'

import App from './components/App'

const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="https://dev-1ackkh7witjzru1x.us.auth0.com"
      clientId="ipcjUqS4hMyxTLvNhK4gnncdtYJQG78d"
      redirectUri={window.location.origin}
      audience="https://missingPurrson/api"
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Auth0Provider>,
  )
})
