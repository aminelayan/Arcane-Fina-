import { Navigate } from "react-router-dom";


export const ProtectedRoute = ({ children }) => {
  if (!localStorage.getItem('user')) {
    return <Navigate to="/unauth" />;
  }
  return children;
};