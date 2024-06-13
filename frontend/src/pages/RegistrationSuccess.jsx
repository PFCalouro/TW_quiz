import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from "../Context";
import LogoImage from '../assets/Logo.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  color: #333;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #333;
  margin-bottom: 40px;
`;

const Message = styled.p`
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
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

const RegistrationSuccess = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Container>
      <Logo src={LogoImage} alt="Quiz Logo" />
      <Title>Registou-se com sucesso!</Title>
      <Message>A tua conta foi criada, diverte-te, {user?.fullName}</Message>
      <Button onClick={() => navigate('/login')}>Login</Button>
    </Container>
  );
};

export default RegistrationSuccess;
