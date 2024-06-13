import { useContext, useState } from "react";
import { AuthContext } from "../Context";
import { useNavigate } from "react-router";
import { logout } from "../services/Auth.js";
import React from "react";
import DefaultLayout from "../layouts/DefaultLayout.jsx";
import styled from "styled-components";
import AvatarImage from "../assets/Avatar.png";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    color: #333;
    transition: margin-left 0.3s;
    ${({ showNav }) => showNav && `
        margin-left: 200px;
    `}
`;

const Title = styled.h1`
    font-size: 48px;
    color: #f7ab1e;
    margin-bottom: 40px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
    padding: 15px 30px;
    font-size: 18px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    margin: 20px 0;
    width: 250px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        background-color: #0056b3;
        transform: translateY(-5px);
    }
`;

const Avatar = styled.img`
    border-radius: 50%;
    width: 150px;
    height: 150px;
    margin-bottom: 20px;
`;

const NavBar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    background-color: #007bff;
    padding: 15px 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 999;
`;

const NavItem = styled.a`
    color: white;
    text-decoration: none;
    margin: 10px 0;
    font-size: 18px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
        color: #d1e9ff;
    }
`;

const MenuButton = styled.button`
    position: fixed;
    top: 15px;
    left: 15px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    z-index: 1001;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        background-color: #0056b3;
        transform: translateY(-5px);
    }
`;

const Home = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showNav, setShowNav] = useState(false);

    const handleLogout = async () => {
        await logout();
        setUser(null);
        navigate("/");
    };

    const goToHistory = () => {
        navigate("/history");
    };

    const goToProfile = () => {
        navigate("/profile");
    };

    const startQuiz = () => {
        navigate("/dashboard");
    };

    return (
        <DefaultLayout>
            <MenuButton onClick={() => setShowNav(!showNav)}>Menu</MenuButton>
            {showNav && (
                <NavBar>
                    <NavItem onClick={goToProfile}>Perfil</NavItem>
                    <NavItem onClick={goToProfile}>Perfil</NavItem>
                    <NavItem onClick={goToHistory}>Histórico</NavItem>
                    <NavItem onClick={startQuiz}>Iniciar Quiz</NavItem>
                    <NavItem onClick={handleLogout}>Terminar Sessão</NavItem>
                </NavBar>
            )}
            <Container showNav={showNav}>
                <Title>Bem-vindo, {user?.username}!</Title>
                <Avatar src={user?.avatar || AvatarImage} alt="User Avatar" />
                <Button onClick={startQuiz}>Iniciar Quiz</Button>
            </Container>
        </DefaultLayout>
    );
};

export default Home;
