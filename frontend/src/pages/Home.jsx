import { useContext } from "react"
import { AuthContext } from "../Context"
import { useNavigate } from "react-router";
import { logout } from "../services/Auth.js";


import React from "react";
import DefaultLayout from "../layouts/DefaultLayout.jsx";
import styled from "styled-components";
// import { useAuth } from "../Context.js";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f0f2f5;
    min-height: 100vh;
`;

const Title = styled.h1`
    font-size: 36px;
    color: #333;
    margin-bottom: 20px;
`;

const ProfileCard = styled.div`
    background: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 600px;
    margin-bottom: 20px;
    text-align: center;
`;

const UserInfo = styled.div`
    margin: 10px 0;
    font-size: 18px;
    color: #666;
`;

const Navigation = styled.nav`
    width: 100%;
    background-color: #0f044c;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const NavItem = styled.a`
    color: white;
    text-decoration: none;
    margin: 0 10px;
    font-size: 18px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;


const Home = () => {
    // const { user } = useAuth();
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        setUser(null);
        navigate("/");
    }

    return (
        <DefaultLayout>
            <Navigation>
                <div>MyApp</div>
                <div>
                    <NavItem href="/profile">Profile</NavItem>
                    <NavItem href="/settings">Settings</NavItem>
                    <NavItem href="/dashboard">Start Quiz</NavItem>
                    {/*<NavItem href="/logout">Logout</NavItem>*/}
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </Navigation>
            <Container>
                <Title>Welcome, {user?.username || "User"}!</Title>
                <ProfileCard>
                    <h2>Profile Information</h2>
                    <UserInfo>Username: {user?.username}</UserInfo>
                    <UserInfo>Email: {user?.email}</UserInfo>
                    <UserInfo>First Name: {user?.firstName}</UserInfo>
                    <UserInfo>Last Name: {user?.lastName}</UserInfo>
                </ProfileCard>
            </Container>
        </DefaultLayout>
    );
};

export default Home;








//
//
//
//
// export default function Home() {
//     const { user, setUser } = useContext(AuthContext);
//     const navigate = useNavigate();
//
//     const handleLogout = async () => {
//         await logout();
//         setUser(null);
//         navigate("/");
//     }
//
//     return (
//         <>
//             <p>Hi, {user?.fullName}</p>
//             <button onClick={handleLogout}>Logout</button>
//         </>
//     )
// }