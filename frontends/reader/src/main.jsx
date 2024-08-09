import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Root } from './components/routes/Root'
import { ErrorPage } from './components/ErrorPage'
import { Signup } from './components/routes/Signup'
import { Login } from './components/routes/Login'
import { Index } from './components/Index'
import { Profile } from './components/routes/Profile'
import { Post } from './components/routes/Post'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: ':postId',
        element: <Post />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
