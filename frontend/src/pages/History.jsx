import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React from "react";
import DefaultLayout from "../layouts/DefaultLayout.jsx";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    color: #333;
    min-height: 100vh;
`;

const Title = styled.h1`
    font-size: 36px;
    color: #f7ab1e;
    margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
`;

const Button = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    margin: 10px 0;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        background-color: #0056b3;
        transform: translateY(-5px);
    }
`;

const ScoreList = styled.ul`
    list-style-type: none;
    padding: 0;
    width: 80%;
    max-width: 600px;
`;

const ScoreItem = styled.li`
    background-color: #007bff;
    color: white;
    padding: 10px;
    margin: 10px 0;
    border-radius: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const History = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [allScores, setAllScores] = useState([]);
    const [userScores, setUserScores] = useState([]);
    const [showAllScores, setShowAllScores] = useState(true);

    useEffect(() => {
        const fetchAllScores = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/score/all');
                setAllScores(response.data);
            } catch (error) {
                console.error('Error fetching all scores:', error);
            }
        };

        const fetchUserScores = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/score/user/${user.username}`);
                setUserScores(response.data);
            } catch (error) {
                console.error('Error fetching user scores:', error);
            }
        };

        fetchAllScores();
        fetchUserScores();
    }, [user.username]);

    const handleExit = () => {
        navigate("/home");
    };

    return (
        <DefaultLayout>
            <Container>
                <Title>Histórico</Title>
                <ButtonContainer>
                    <Button onClick={() => setShowAllScores(true)}>Ranking Mundial</Button>
                    <Button onClick={() => setShowAllScores(false)}>Ranking Solo</Button>
                    <Button onClick={handleExit}>Sair</Button>
                </ButtonContainer>
                <ScoreList>
                    {showAllScores ? (
                        allScores.map((score, index) => (
                            <ScoreItem key={index}>
                                <span>User: {score.username}</span>
                                <span>Difficulty: {score.difficulty}</span>
                                <span>Score: {score.score}</span>
                                <span>Date: {new Date(score.createdAt).toLocaleString()}</span>
                            </ScoreItem>
                        ))
                    ) : (
                        userScores.map((score, index) => (
                            <ScoreItem key={index}>
                                <span>Difficulty: {score.difficulty}</span>
                                <span>Score: {score.score}</span>
                                <span>Date: {new Date(score.createdAt).toLocaleString()}</span>
                            </ScoreItem>
                        ))
                    )}
                </ScoreList>
            </Container>
        </DefaultLayout>
    );
};

export default History;
