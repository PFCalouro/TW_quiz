import { useEffect } from "react";
import { useAuth } from "../Context.js";
import { useNavigate } from "react-router";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user && !loading) {
            navigate("/login");
        }
    }, [user, loading, navigate]);



    return children;

}