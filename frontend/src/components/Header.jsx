import { Link } from "react-router-dom";
import styled from "styled-components";

const AppHeader = styled.header`
    font-size: calc(10px + 2vmin);
`;

const AppLogo = styled.img`
  height: 40vmin;
  pointer-events: none;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function Header({ logo }) {
    return (
        <AppHeader>
            <AppLogo src={logo} alt="logo" />
            <HeaderContainer>
                <p>
                    Hi! Welcome to TW Quiz
                </p>
            </HeaderContainer>
            <HeaderContainer>
                <Link to="/login">Login</Link>
            </HeaderContainer>
        </AppHeader>
    )
}
