import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import DefaultLayout from "../layouts/DefaultLayout.jsx";
import axios from 'axios';

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

const QuestionContainer = styled.div`
    margin: 20px;
    text-align: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 600px;
    margin-top: 20px;
`;

const Button = styled.button`
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

const SubmitButton = styled(Button)`
    background-color: #2a9d8f;

    &:hover {
        background-color: #21867a;
    }
`;

export default function Quiz() {
    const navigate = useNavigate();
    const location = useLocation();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    const difficulty = new URLSearchParams(location.search).get('difficulty');
    console.log(questions)
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/questions?difficulty=${difficulty}`);
                setQuestions(response.data);
            } catch (error) {
                console.error("Error fetching questions", error);
            }
        };

        fetchQuestions();
    }, [difficulty]);

    const handleAnswerChange = (e) => {
        setAnswers({
            ...answers,
            [currentQuestionIndex]: e.target.value
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = () => {
        // Submeter respostas
        console.log("Respostas:", answers);
        navigate('/home');
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <DefaultLayout>

            <Container>
                <Title>Quiz - {difficulty}</Title>
                <QuestionContainer>
                    <h2>{questions[currentQuestionIndex].description}</h2>
                    {questions[currentQuestionIndex].options.map((option, index) => (
                        <div key={index}>

                            <label>
                                <input
                                    type="radio"
                                    name={`question-${currentQuestionIndex}`}
                                    value={option.value}
                                    checked={answers[currentQuestionIndex] === option.value}
                                    onChange={handleAnswerChange}
                                />
                                {option.value}
                            </label>
                        </div>
                    ))}
                </QuestionContainer>
                <ButtonContainer>
                    <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                        Voltar
                    </Button>
                    {currentQuestionIndex < questions.length - 1 ? (
                        <Button onClick={handleNextQuestion}>
                            Próxima
                        </Button>
                    ) : (
                        <SubmitButton onClick={handleSubmit}>
                            Enviar
                        </SubmitButton>
                    )
                    }
                    <Button onClick={handleSubmit}>Sair</Button>
                </ButtonContainer>

            </Container>
        </DefaultLayout>
    );
}
