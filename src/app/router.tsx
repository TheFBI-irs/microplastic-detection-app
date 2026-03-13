import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { Home } from '../pages/Home'
import { Scan } from '../pages/Scan'
import { Results } from '../pages/Results'
import { Instructions } from '../pages/Instructions'
import { Research } from '../pages/Research'
import { About } from '../pages/About'
import { DatasetExplorer } from '../pages/DatasetExplorer'
import { ErrorAnalysis } from '../pages/ErrorAnalysis'
import { ModelArchitecture } from '../pages/ModelArchitecture'
import { DatasetStats } from '../pages/DatasetStats'
import { Impact } from '../pages/Impact'
import { References } from '../pages/References'
import { KitDesign } from '../pages/KitDesign'

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
        { path: 'kit-design', element: <KitDesign /> },
        { path: 'dataset', element: <DatasetExplorer /> },
        { path: 'model', element: <ModelArchitecture /> },
        { path: 'research', element: <Research /> },
        { path: 'error-analysis', element: <ErrorAnalysis /> },
        { path: 'impact', element: <Impact /> },
        { path: 'references', element: <References /> },
        { path: 'dataset-stats', element: <DatasetStats /> },
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
