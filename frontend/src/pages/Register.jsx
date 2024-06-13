import DefaultLayout from "../layouts/DefaultLayout.jsx";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import { register } from "../services/Auth.js";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../Context.js";
import LogoImage from "../assets/Logo.png";
import * as PropTypes from "prop-types";


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

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ContainerFooter = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;`;


export default function Register() {
    const { user, loading, setUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && !loading) {
            navigate("/login");
        }
    }, [user, loading, navigate]);

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        const registeredUser = await register(values.username, values.email, values.firstName, values.lastName, values.password);

        if (registeredUser) {
            setUser(registeredUser);
            navigate("/registration-success");
        } else {
            console.error("Registration failed");
        }

        setSubmitting(false);
    };
    const handleExit = () => {
        navigate("/login");
    };

    return (
        <DefaultLayout>
            <Container>
                <Logo src={LogoImage} alt="Quiz Logo" />
                <Title>Registar</Title>
                <Formik
                    initialValues={{ username: '', email: '', firstName: '', lastName: '', password: '', confirmPassword: '' }}
                    validationSchema={Yup.object({
                        username: Yup.string().required('Username is required'),
                        email: Yup.string().email('Invalid email address').required('Email is required'),
                        firstName: Yup.string().required('First name is required'),
                        lastName: Yup.string().required('Last name is required'),
                        password: Yup.string().required('Password is required'),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Passwords must match')
                            .required('Confirm Password is required')
                    })}
                    onSubmit={handleSubmit}
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
                            <InputContainer>
                                <Input
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username} />
                                <InputErrorLabel>{errors.username && touched.username && errors.username}</InputErrorLabel>
                            </InputContainer>
                            <InputContainer>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email} />
                                <InputErrorLabel>{errors.email && touched.email && errors.email}</InputErrorLabel>
                            </InputContainer>
                            <InputContainer>
                                <Input
                                    type="text"
                                    placeholder="First Name"
                                    name="firstName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.firstName} />
                                <InputErrorLabel>{errors.firstName && touched.firstName && errors.firstName}</InputErrorLabel>
                            </InputContainer>
                            <InputContainer>
                                <Input
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastName} />
                                <InputErrorLabel>{errors.lastName && touched.lastName && errors.lastName}</InputErrorLabel>
                            </InputContainer>
                            <InputContainer>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password} />
                                <InputErrorLabel>{errors.password && touched.password && errors.password}</InputErrorLabel>
                            </InputContainer>
                            <InputContainer>
                                <Input
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confirmPassword} />
                                <InputErrorLabel>{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</InputErrorLabel>
                            </InputContainer>
                            <ContainerFooter>
                                <Button type="submit" disabled={isSubmitting}>Registar</Button>
                                <Button type="submit" onClick={handleExit}>Sair</Button>
                            </ContainerFooter>

                        </FormContainer>
                    )}
                </Formik>
            </Container>
        </DefaultLayout>
    )
}
