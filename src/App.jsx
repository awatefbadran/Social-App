
import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import MainLayout from './Layouts/MainLayout/MainLayout'
import AuthLayout from './Layouts/AuthLayout/AuthLayout'
import NewsFeed from './Pages/NewsFeed/NewsFeed'
import UserPosts from './Pages/UserPosts/UserPosts'
import NotFound from './Pages/NotFound/NotFound'
import Login from './Pages/Auth/Login/Login'
import Register from './Pages/Auth/Register/Register'
import AppPrptectedRouts from './components/protectedRouts/AppPrptectedRouts'
import AuthProtectedRouts from './components/protectedRouts/AuthProtectedRouts'
import PostDetails from './Pages/PostDetails/PostDetails'
import Suggestions from './Pages/suggestions/Suggestions'
import PostsLayout from './Layouts/PostsLayout/PostsLayout'
import Profile from './Pages/profile/Profile'
import Feeds from './Pages/feeds/Feeds'
import Saved from './Pages/saved/Saved'
import "unicode-emoji-picker";
import Settings from './Pages/settings/Settings'

function App() {
const routs = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [

      {
        element: (
          <AppPrptectedRouts>
            <PostsLayout />
          </AppPrptectedRouts>
        ),
        children: [
          { index: true, element: <Feeds /> },
          { path: "/user-posts", element: <UserPosts /> },
          { path: "/community", element: <NewsFeed /> },
          { path: "/saved", element: <Saved /> },
        ],
      },

      { path: "post/:id", element: <AppPrptectedRouts><PostDetails /></AppPrptectedRouts> },
      { path: "suggestions", element: <AppPrptectedRouts><Suggestions /></AppPrptectedRouts> },
      {path:"profile",element:<AppPrptectedRouts><Profile/></AppPrptectedRouts>},
        { path: "settings", element: <AppPrptectedRouts><Settings/></AppPrptectedRouts>},
      { path: "*", element: <NotFound /> },
    ],
  },

  {
    path: "",
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <AuthProtectedRouts><Login /></AuthProtectedRouts> },
      { path: "/register", element: <AuthProtectedRouts><Register /></AuthProtectedRouts> },
    ],
  },
]);
  return (
    <>
    <RouterProvider router={routs}></RouterProvider>
    </>
  )
}

export default App
