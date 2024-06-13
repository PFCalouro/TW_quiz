import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from "../Context";
import { useNavigate } from "react-router";
import AvatarImage from '../assets/Avatar.png';
import LogoImage from '../assets/Logo.png';
import DefaultLayout from "../layouts/DefaultLayout";

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
const ContainerAvatar = styled.div`
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
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfileCard = styled.div`
    background: #ffffff;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 500px;
    text-align: center;
`;

const Button = styled.button`
    padding: 15px 30px;
    font-size: 18px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    margin: 20px 0;
    width: 200px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        background-color: #0056b3;
        transform: translateY(-5px);
    }
`;

const Avatar = styled.img`
    border-radius: 50%;
    width: 150px;
    height: 150px;
    margin-bottom: 20px;
`;

const FileInput = styled.input`
    display: none;
`;

const Label = styled.label`
    font-size: 18px;
    background-color: #007bff;
    color: white;
    padding: 15px 30px;
    border-radius: 50px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s, transform 0.3s;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

    &:hover {
        background-color: #0056b3;
        transform: translateY(-5px);
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    max-width: 400px;
    height: 100px;
    padding: 10px;
    margin: 20px 0;
    border: 2px solid #333;
    border-radius: 8px;
    font-size: 16px;
    resize: none;
`;

const Logo = styled.img`
    width: 150px;
    height: auto;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
`;

const Profile = () => {
    const { user, setUser } = useContext(AuthContext);
    const [avatar, setAvatar] = useState(user?.avatar || AvatarImage);
    const [description, setDescription] = useState(user?.description || '');
    const navigate = useNavigate();

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatar(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSaveProfile = () => {
        setUser({ ...user, avatar, description });
    };

    const handleGoBack = () => {
        navigate(-1); // Voltar à página anterior
    };

    return (
        <DefaultLayout>
            <Container>
                <Logo src={LogoImage} alt="Quiz Logo" />
                <Title>Editar Perfil</Title>
                <ProfileCard>
                    <ContainerAvatar>
                        <Avatar src={avatar} alt="User Avatar" />
                    </ContainerAvatar>
                    <FileInput type="file" id="avatarUpload" accept="image/*" onChange={handleAvatarChange} />
                    <Label htmlFor="avatarUpload">Mudar Avatar</Label>
                    <TextArea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descreve algo sobre ti!"
                    />
                    <Button onClick={handleSaveProfile}>Guardar</Button>
                    <Button onClick={handleGoBack}>Sair</Button>
                </ProfileCard>
            </Container>
        </DefaultLayout>
    );
};

export default Profile;
