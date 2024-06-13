import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import DefaultLayout from "../layouts/DefaultLayout.jsx";
import axios from 'axios';
import { AuthContext } from '../Context';
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
    text-align: center;
`;

const QuestionContainer = styled.div`
    margin: 20px;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    border: 2px solid #007bff;
    width: 80%;
    background-color: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const OptionsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
`;

const Option = styled.label`
    flex: 0 0 45%;
    margin: 5px;
    background-color: white;
    padding: 15px;
    border-radius: 10px;
    border: 2px solid #007bff;
    cursor: pointer;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;

    &:hover {
        background-color: #f0f0f0;
    }

    input {
        margin-right: 10px;
        cursor: pointer;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 600px;
    margin-top: 20px;
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

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

const SubmitButton = styled(Button)`
    background-color: #0056b3;

    &:hover {
        background-color: #0056b3;
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

export default function Quiz() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [userInput, setUserInput] = useState('');

    const difficulty = new URLSearchParams(location.search).get('difficulty');
    console.log('Difficulty:', difficulty);
    console.log('Questions:', questions);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/questions?difficulty=${difficulty}`);
                setQuestions(response.data);
                console.log('Fetched Questions:', response.data);
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
        console.log('Answers:', answers);
    };

    const handleUserInputChange = (e) => {
        setUserInput(e.target.value);
        setAnswers({
            ...answers,
            [currentQuestionIndex]: e.target.value
        });
        console.log('Answers:', answers);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setUserInput('');
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setUserInput('');
        }
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach((question, index) => {
            console.log('User Answer:', answers[index]);
            const correctOption = question.options.find(option => option.correct);
            console.log('Correct Option:', correctOption);

            const userAnswer = answers[index] ? answers[index].toLowerCase() : '';

            if (userAnswer === correctOption.value.toLowerCase()) {
                switch (difficulty.toLowerCase()) {
                    case 'easy':
                        score += 1;
                        break;
                    case 'medium':
                        score += 2;
                        break;
                    case 'hard':
                        score += 3;
                        break;
                    default:
                        score += 1;
                }
            }
        });
        console.log('Calculated Score:', score);
        return score;
    };

    const saveScore = async (score) => {
        const answersArray = Object.keys(answers).map(index => ({ questionIndex: index, answer: answers[index] }));
        try {
            await axios.post('http://localhost:8000/api/score', { score, difficulty, username: user.username, answers: answersArray });
            console.log('Score saved successfully');
        } catch (error) {
            console.error("Error saving score", error);
        }
    };

    const handleSubmit = async () => {
        const score = calculateScore();
        await saveScore(score);
        navigate('/score', { state: { score, difficulty } });
    };

    const handleExit = async () => {
        const score = calculateScore();
        await saveScore(score);
        navigate('/home');
    };

    if (questions.length === 0) {
        return <Container>Loading...</Container>;
    }

    const question = questions[currentQuestionIndex];
    let questionDescription = question.description;

    if (questionDescription.includes("$")) {
        questionDescription = (
            <>
                {question.description.split("$")[0]}
                <input
                    type="text"
                    name="answer"
                    id="answer"
                    value={userInput}
                    onChange={handleUserInputChange}
                />
                {question.description.split("$")[1]}
            </>
        );
    }

    return (
        <DefaultLayout>
            <Container>
                <Logo src={LogoImage} alt="Quiz Logo" />
                <Title>Quiz - {difficulty}</Title>
                <QuestionContainer>
                    <h2>{questionDescription}</h2>
                    {question.description.includes("$") ? null : (
                        <OptionsContainer>
                            {question.options.map((option, index) => (
                                <Option key={index}>
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestionIndex}`}
                                        value={option.value}
                                        checked={answers[currentQuestionIndex] === option.value}
                                        onChange={handleAnswerChange}
                                    />
                                    {String.fromCharCode(65 + index)}: {option.value}
                                </Option>
                            ))}
                        </OptionsContainer>
                    )}
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
                    )}
                    <Button onClick={handleExit}>Sair</Button>
                </ButtonContainer>
            </Container>
        </DefaultLayout>
    );
}
