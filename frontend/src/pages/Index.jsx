import styled from "styled-components";
import { Link } from "react-router-dom";
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
  color: #333;
  margin-bottom: 40px;
`;

const StyledLink = styled(Link)`
  font-size: 24px;
  color: white;
  background-color: #007bff;
  padding: 15px 30px;
  border-radius: 50px;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #0056b3;
    transform: translateY(-5px);
  }
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 40px;
`;

export default function Index() {
  return (
    <DefaultLayout>
      <Container>
        <Logo src={LogoImage} alt="Quiz Logo" />
        <Title>Bem-Vindos ao Quiz dos Açores!</Title>
        <StyledLink to="/login">Começar!</StyledLink>
      </Container>
    </DefaultLayout>
  );
}
