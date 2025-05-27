import { useUser } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

 
  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

 
  if (!user?.unsafeMetadata?.role && pathname !== '/onboarding') {
    return <Navigate to='/onboarding' />;
  }

  return children;
};

export default ProtectedRoute;
