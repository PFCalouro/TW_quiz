import DefaultLayout from "../layouts/DefaultLayout.jsx";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import { register } from "../services/Auth.js";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../Context.js";

const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #f4a261;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    padding: 30px;
    background-color: #0f044c;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
`;

const Input = styled.input`
    height: 48px;
    width: 100%;
    font-size: large;
    border-radius: 8px;
    border: 1px solid grey;
    padding-left: 8px;
    margin-bottom: 10px;
`;

const InputErrorLabel = styled.label`
    color: red;
    font-size: 12px;
    margin-bottom: 10px;
`;

const SubmitButton = styled.button`
    margin-top: 10px;
    background-color: #f4a261;
    color: white;
    height: 48px;
    width: 100%;
    font-size: large;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #e76f51;
    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export default function Register() {
    const { user, loading, setUser } = useAuth();
    // const { user, loading } = useAuth();
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
            // navigate("/login");
            navigate("/registration-success");
        } else {
            console.error("Registration failed");
        }

        setSubmitting(false);
    };

    return (
        <DefaultLayout>
            <Container>
                <Title>Register</Title>

                <Formik
                    initialValues={{ username: '', email: '',firstName:'', lastName: '', password: '', confirmPassword: '' }}
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
                        <form onSubmit={handleSubmit}>

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
                            <SubmitButton type="submit" disabled={isSubmitting}>Register</SubmitButton>
                        </form>
                    )}
                </Formik>
            </Container>
        </DefaultLayout>
    )
}
