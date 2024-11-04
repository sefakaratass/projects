import './App.css';
import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout.js';
import Home from './pages/Home';
import Login from './pages/Login';
import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Library from './pages/Library';
import { ReadingListProvider } from '../src/context/ReadingListContext.js';

const routes = createBrowserRouter([
  { 
    path: '/',
    element: <ProtectedRoute> <MainLayout /> </ProtectedRoute>,
    children: [
      { path:'/', element:<Home/> },
      { path:'/kitaplığım', element:<Library/> }
    ]
  },
  { path: '/login', element: <Login/> }  
]);

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return children;
  } else {
    return <Navigate to="/login"/>;
  }
}

function App() {
  return (
    <ReadingListProvider>
      <RouterProvider router={routes} />
    </ReadingListProvider>
  );
}

export default App;