import { createContext, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import supabase from "./lib/supabaseClient";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null
  loading: boolean
}


const PrivateRoute = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const AuthContext = createContext<AuthContextType | undefined>(undefined)

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
