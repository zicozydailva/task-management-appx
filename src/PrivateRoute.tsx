import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import supabase from "./lib/supabaseClient";

const PrivateRoute = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log("PrivateRoute component rendered");

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setAuthenticated(!!session);
      setLoading(false);
    };

    getSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    if (authenticated) {
      return <Outlet />;
    }
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
