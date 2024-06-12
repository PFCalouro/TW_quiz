import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Home_old from "./pages/Home_old.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Index from "./pages/Index.jsx";
import QuizDashboard from "./pages/QuizDashboard.jsx";
import Quiz from "./pages/Quiz.jsx";
import Score from "./pages/Score.jsx";
import styled from "styled-components";
import { AuthContext } from "./Context.js";
import { useEffect, useState } from "react";
import { get } from "./services/Auth.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RegistrationSuccess from "./pages/RegistrationSuccess";

const MainComponent = styled.div`
  background-color: #282c34;
  color: white;
`;

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    get()
      .then(u => {
        if (u) {
          setUser(u);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [setUser]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/registration-success",
      element: <RegistrationSuccess />
    },

    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      )
    },
    {
      path: "/score",
      element: (
          <ProtectedRoute>
            <Score />
          </ProtectedRoute>
      )
    },

    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <QuizDashboard />
        </ProtectedRoute>
      )
    },
    {
      path: "/quiz",
      element: (
        <ProtectedRoute>
          <Quiz />
        </ProtectedRoute>
      )
    }
  ]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      <MainComponent>
        <RouterProvider router={router} />
      </MainComponent>
    </AuthContext.Provider>
  );
}

export default App;
