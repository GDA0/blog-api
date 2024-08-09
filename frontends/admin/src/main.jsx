import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Root } from './components/routes/Root'
import { ErrorPage } from './components/ErrorPage'
import { Index } from './components/Index'
import { Post } from './components/routes/Post'
import { UpdatePost } from './components/routes/UpdatePost'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: ':postId',
        element: <Post />
      },
      {
        path: ':postId/update',
        element: <UpdatePost />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
