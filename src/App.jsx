import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Main from "@/Main/Main";
import SelectTopic from "@/SelectTopic/SelectTopic";
import Instruction from "@/Instruction/Instruction";
import AnswerQuestion from "@/AnswerQuestion/AnswerQuestion";
import ReviewQuiz from "@/ReviewQuiz/ReviewQuiz";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "../src/components/ProdectedRoute";
import Navbar from "@/Navbar/Navbar";
import Dashboard from "@/Dashboard/Dashboard";

const ProtectedElement = ({ element }) => (
  <>
    <Navbar />
    <Dashboard />
    <main>{element}</main>
  </>
);

const AppRoutes = () => {
  const routes = [
    { path: "/", element: <Login /> },
    {
      path: "/main",
      element: (
        <ProtectedRoute element={<ProtectedElement element={<Main />} />} />
      ),
    },
    {
      path: "/SelectTopic",
      element: (
        
        <ProtectedRoute
          element={<ProtectedElement element={<SelectTopic />} />}
        />
      ),
    },
    {
      path: "/Instruction",
      element: (
        <ProtectedRoute
          element={<ProtectedElement element={<Instruction />} />}
        />
      ),
    },
    {
      path: "/AnswerQuestion",
      element: (
        <ProtectedRoute
          element={<ProtectedElement element={<AnswerQuestion />} />}
        />
      ),
    },
    {
      path: "/ReviewQuiz",
      element: (
        <ProtectedRoute
          element={<ProtectedElement element={<ReviewQuiz />} />}
        />
      ),
    },
  ];

  return useRoutes(routes);
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
