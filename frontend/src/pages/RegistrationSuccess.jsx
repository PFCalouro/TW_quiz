import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from "../Context"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #4caf50;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 18px;
  color: #333;
  margin-bottom: 30px;
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

// const RegistrationSuccess = ({ username }) => {
const RegistrationSuccess = () => {
    const { user} = useContext(AuthContext)
    const navigate = useNavigate();

    return (
        <Container>
            <Title>Registration Successful!</Title>
            <Message>Your account has been created successfully, {user?.fullName}</Message>
            <LoginButton onClick={() => navigate('/login')}>Go to Login</LoginButton>
        </Container>
    );
};

export default RegistrationSuccess;
