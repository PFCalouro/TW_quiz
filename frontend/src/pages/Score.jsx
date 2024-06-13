import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DefaultLayout from "../layouts/DefaultLayout.jsx";
import LogoImage from '../assets/Logo.png';

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

const ScoreContainer = styled.div`
    margin: 20px;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    border: 2px solid #007bff;
    width: 80%;
    background-color: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
    padding: 15px 30px;
    font-size: 18px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    width: 200px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s, transform 0.3s;
    margin-top: 20px;

    &:hover {
        background-color: #0056b3;
        transform: translateY(-5px);
    }
`;

const Logo = styled.img`
    width: 150px;
    height: auto;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
`;

export default function Score() {
    const location = useLocation();
    const navigate = useNavigate();
    const { score, difficulty } = location.state;

    const handleExit = () => {
        navigate('/home');
    };

    return (
        <DefaultLayout>
            <Container>
                <Logo src={LogoImage} alt="Quiz Logo" />
                <Title>Score</Title>
                <ScoreContainer>
                    <h2>Dificuldade: {difficulty}</h2>
                    <h2>Pontuação: {score}</h2>
                </ScoreContainer>
                <Button onClick={handleExit}>Sair</Button>
            </Container>
        </DefaultLayout>
    );
}
