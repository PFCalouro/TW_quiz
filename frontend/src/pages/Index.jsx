import styled from "styled-components";
import { Link } from "react-router-dom";
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

const StyledLink = styled(Link)`
  font-size: 24px;
  color: #f4a261;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Logo = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
`;

export default function Index() {
  return (
    <DefaultLayout>
      <Container>
        <Logo src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" />
        <Title>Hi! Welcome to TW Quiz</Title>
        <StyledLink to="/login">Login</StyledLink>
      </Container>
    </DefaultLayout>
  );
}
