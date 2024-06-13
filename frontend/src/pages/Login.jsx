import DefaultLayout from "../layouts/DefaultLayout.jsx";
import { styled } from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import { login } from "../services/Auth.js";
import { useNavigate } from "react-router";
import { useAuth } from "../Context.js";
import { useEffect } from "react";
import LogoImage from "../assets/Logo.png";

const Title = styled.h1`
    font-size: 48px;
    color: #f7ab1e;
    margin-bottom: 40px;
`;

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

const Input = styled.input`
    height: 48px;
    width: 400px;
    font-size: large;
    border-radius: 8px;
    border: 1px solid grey;
    padding-left: 8px;
    margin-bottom: 20px;
`;

const InputErrorLabel = styled.label`
    color: red;
    font-size: 12px;
    margin-top: -15px;
    margin-bottom: 15px;
`;

const Button = styled.button`
    margin-top: 10px;
    background-color: #007bff;
    color: white;
    height: 48px;
    width: 150px;
    font-size: large;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    margin-right: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        background-color: #0056b3;
        transform: translateY(-5px);
    }
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Logo = styled.img`
    width: 150px;
    height: auto;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
`;

export default function Login() {
    const { user, loading, setUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && !loading) {
            navigate("/home");
        }
    }, [user, loading, navigate]);

    return (
        <DefaultLayout>
            <Container>
                <Logo src={LogoImage} alt="Quiz Logo" />
                <Title>Login</Title>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={Yup.object({
                        username: Yup.string().required('Username is required'),
                        password: Yup.string().required('Password is required'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        const user = await login(values.username, values.password);
                        if (user) {
                            setUser(user);
                            navigate("/home");
                        } else {
                            // TODO: Show an error message
                        }
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <FormContainer onSubmit={handleSubmit}>
                            <Input
                                type="text"
                                placeholder="Username"
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                            />
                            <InputErrorLabel>{errors.username && touched.username && errors.username}</InputErrorLabel>
                            <Input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <InputErrorLabel>{errors.password && touched.password && errors.password}</InputErrorLabel>
                            <div>
                                <Button type="submit" disabled={isSubmitting}>Entrar</Button>
                                <Button type="button" onClick={() => navigate("/register")}>Registar</Button>
                            </div>
                        </FormContainer>
                    )}
                </Formik>
            </Container>
        </DefaultLayout>
    );
}
