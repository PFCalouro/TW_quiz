import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../assets/BackGround.jpg';
import LogoImage from '../assets/Logo.png';

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 100%;
`;

const Logo = styled.img`
    width: 150px;
    height: auto;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
`;

export default function DefaultLayout({ children }) {
    return (
        <LayoutContainer>
            <Logo src={LogoImage} alt="Quiz Game Logo" />
            <Content>
                {children}
            </Content>
        </LayoutContainer>
    );
}
