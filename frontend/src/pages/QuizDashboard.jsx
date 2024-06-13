import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
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
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
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

export default function QuizDashboard() {
    const navigate = useNavigate();

    const startQuiz = (level) => {
        navigate(`/quiz?difficulty=${level}`);
    };

    const goToHome = () => {
        navigate("/home");
    };

    return (
        <DefaultLayout>
            <Container>
                <Logo src={LogoImage} alt="Quiz Logo" />
                <Title>Escolha a Dificuldade</Title>
                <ButtonContainer>
                    <Button onClick={() => startQuiz('Easy')}>Fácil</Button>
                    <Button onClick={() => startQuiz('Medium')}>Normal</Button>
                    <Button onClick={() => startQuiz('Hard')}>Difícil</Button>
                    <Button onClick={goToHome}>Sair</Button>
                </ButtonContainer>
            </Container>
        </DefaultLayout>
    );
}
