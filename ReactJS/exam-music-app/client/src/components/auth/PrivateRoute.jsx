import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext.jsx';

const PrivateRoute = ({ element }) => {
  const { authToken } = useAuth();
  // Redirect to the login page if there is no authToken
  return authToken ? element : <Navigate to="/users/login" replace />;
};

export default PrivateRoute;
