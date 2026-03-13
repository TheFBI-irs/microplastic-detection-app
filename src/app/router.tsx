import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { Home } from '../pages/Home'
import { Scan } from '../pages/Scan'
import { Results } from '../pages/Results'
import { Instructions } from '../pages/Instructions'
import { Research } from '../pages/Research'
import { About } from '../pages/About'

const basename = import.meta.env.BASE_URL?.replace(/\/$/, '') || ''
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'scan', element: <Scan /> },
        { path: 'results', element: <Results /> },
        { path: 'instructions', element: <Instructions /> },
        { path: 'research', element: <Research /> },
        { path: 'about', element: <About /> },
        { path: '*', element: <Navigate to="/" replace /> },
      ],
    },
  ],
  { basename: basename || undefined }
)

export function Router() {
  return <RouterProvider router={router} future={{ v7_startTransition: true }} />
}
