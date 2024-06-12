import { useContext } from "react"
import { AuthContext } from "../Context"
import { useNavigate } from "react-router";
import { logout } from "../services/Auth.js";

export default function Home_old() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        setUser(null);
        navigate("/");
    }

    return (
        <>
            <p>Hi, {user?.fullName}</p>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}