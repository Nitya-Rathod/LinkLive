// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const WithAuth = (WrappedComponent) => {
//   const AuthComponent = (props) => {
//     const router = useNavigate();

//     const isAuthenticated = () => {
//       if (localStorage.getItem("token")) {
//         return true;
//       }
//       return false;
//     };

//     useEffect(() => {
//       if (!isAuthenticated()) {
//         router("/auth");
//       }
//     }, []);

//     return <WrappedComponent {...props} />;
//   };

//   return AuthComponent;
// };

// export default WithAuth;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/auth");
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
