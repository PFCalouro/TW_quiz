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
    margin: 20px 0;
    border-radius: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px; 
    letter-spacing: 0.05em;
    margin-right: 20px;
`;


const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
`;

const History = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [allScores, setAllScores] = useState([]);
    const [userScores, setUserScores] = useState([]);
    const [showAllScores, setShowAllScores] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [scoresPerPage] = useState(5);

    useEffect(() => {
        const fetchAllScores = async () => {
            try {
                //const response = await axios.get('http://localhost:8000/api/score/all');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/score/all`);
                setAllScores(response.data);
            } catch (error) {
                console.error('Error fetching all scores:', error);
            }
        };

        const fetchUserScores = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/score/user/${user.username}`);
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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginateScores = (scores) => {
        const indexOfLastScore = currentPage * scoresPerPage;
        const indexOfFirstScore = indexOfLastScore - scoresPerPage;
        return scores.slice(indexOfFirstScore, indexOfLastScore);
    };

    const renderScores = (scores) => (
        paginateScores(scores).map((score, index) => (
            <ScoreItem key={index}>
                {showAllScores && <span>User {score.username}</span>}
                <span>Difficulty {score.difficulty}</span>
                <span>Score {score.score}</span>
                <span>Date {new Date(score.createdAt).toLocaleString()}</span>
            </ScoreItem>
        ))
    );

    const scoresToShow = showAllScores ? allScores : userScores;
    const totalPages = Math.ceil(scoresToShow.length / scoresPerPage);

    return (
        <DefaultLayout>
            <Container>
                <Title>Histórico</Title>
                <ButtonContainer>
                    <Button onClick={() => { setShowAllScores(true); setCurrentPage(1); }}>Ranking Mundial</Button>
                    <Button onClick={() => { setShowAllScores(false); setCurrentPage(1); }}>Ranking Solo</Button>
                    <Button onClick={handleExit}>Sair</Button>
                </ButtonContainer>
                <ScoreList>
                    {renderScores(scoresToShow)}
                </ScoreList>
                <PaginationContainer>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Button key={i + 1} onClick={() => handlePageChange(i + 1)}>
                            {i + 1}
                        </Button>
                    ))}
                </PaginationContainer>
            </Container>
        </DefaultLayout>
    );
};

export default History;
