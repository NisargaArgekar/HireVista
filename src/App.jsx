import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from './components/theme-provider';


import AppLayout from './layout/app-Layout'
import LandingPage from './pages/landing'
import Onboarding from './pages/onboarding'
import JobListing from './pages/joblisting'
import PostJob from './pages/post-job'
import SaveJob from './pages/saved-job'
import JobPage from './pages/job'
import MyJobApllication from './pages/my-jobs'
import ProtectedRoute from './components/protected-route';
import SignInPage from './pages/SignInPage'; // <-- create this component

const router = createBrowserRouter([

   {
        path: '/sign-in',
        element: 
        <SignInPage />
      
    },
  {
    element:<AppLayout/>,
    children: [
      {
        path:'/',
        element:
        <LandingPage/>
      
      },
      {
        path:'/onboarding',
        element:(<ProtectedRoute>
        <Onboarding/>
        </ProtectedRoute>)
,      },
      {
        path:'/landing',
        element:(
        <ProtectedRoute>
        <LandingPage/>
        </ProtectedRoute>
        ),
      },
      {
        path:'/my-jobs',
        element:(<ProtectedRoute>
        <MyJobApllication/>
        </ProtectedRoute>),
      },
      {
        path:'/joblisting',
        element:(
        <ProtectedRoute>
        <JobListing/>
        </ProtectedRoute>),
      },
      {
       path:'/jobs',
        element:(
        <ProtectedRoute>
        <JobListing/>
        </ProtectedRoute>),
      },
      {
        path:'/job/:id',
        element:(
        <ProtectedRoute>
        <JobPage/>
        </ProtectedRoute>),
      },
      
      {
        path:'/post-job',
        element:(<ProtectedRoute>
        <PostJob/>
        </ProtectedRoute>),
      },
      {
        path:'/saved-job',
        element:(
        <ProtectedRoute>
          <SaveJob/>
        </ProtectedRoute>),
      },
     

    ]
  },
])

function App() {
  return(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router}/>
  </ThemeProvider>
  );
  
   
}

export default App
