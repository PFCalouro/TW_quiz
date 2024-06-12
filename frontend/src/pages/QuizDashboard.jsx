import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from "../layouts/DefaultLayout.jsx";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #0f044c;
    color: white;
`;

const Title = styled.h1`
    font-size: 48px;
    color: #f4a261;
    margin-bottom: 20px;
`;

const Button = styled.button`
    margin: 10px;
    padding: 10px 20px;
    font-size: 24px;
    background-color: #f4a261;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background-color: #e76f51;
    }
`;

export default function QuizDashboard() {
    const navigate = useNavigate();

    const startQuiz = (level) => {
        navigate(`/quiz?difficulty=${level}`);
    };

    return (
        <DefaultLayout>
            <Container>
                <Title>Escolha a Dificuldade</Title>
                <Button onClick={() => startQuiz('Easy')}>Fácil</Button>
                <Button onClick={() => startQuiz('Medium')}>Normal</Button>
                <Button onClick={() => startQuiz('Hard')}>Difícil</Button>
            </Container>
        </DefaultLayout>
    );
}
