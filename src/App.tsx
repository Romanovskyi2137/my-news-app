import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import DetailPage from './pages/DetailPage'
import HomePage from './pages/HomePage'
import Layout from './components/Layout'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "article/:id",
        element: <DetailPage />,
      },
    ],
  },
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
