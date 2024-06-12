import DefaultLayout from "../layouts/DefaultLayout.jsx";
import { styled } from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import { login } from "../services/Auth.js";
import { useNavigate } from "react-router";
import { useAuth } from "../Context.js";
import { useEffect } from "react";

const Title = styled.h1`
    font-size: 64px;
    font-weight: bolder;
    margin-bottom: 10px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
`;

const Input = styled.input`
    height: 48px;
    width: 400px;
    font-size: large;
    border-radius: 8px;
    border: 1px solid grey;
    padding-left: 8px;
`;

const InputErrorLabel = styled.label`
    color: red;
    font-size: 12px;
`;

const SubmitButton = styled.button`
    margin-top: 10px;
    background-color: #61dbfb;
    color: white;
    height: 48px;
    width: 150px;
    font-size: large;
    border-radius: 8px;
    border: 1px solid grey;
    padding-left: 8px;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    margin-bottom: 20px ;
`;

const RegisterButton = styled.button`
    margin-top: 10px;
    background-color: #ff6347;
    color: white;
    height: 48px;
    width: 150px;
    font-size: large;
    border-radius: 8px;
    border: 1px solid grey;
    padding-left: 8px;
    margin-left: 10px; // add some spacing between the buttons
`;

export default function Login() {
    const { user, loading, setUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && !loading) {
            // navigate("/home");
            navigate("/login");
        }
    }, [user, loading, navigate]);

    return (
        <DefaultLayout>
            <Container>
                <Title>Login</Title>

                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={Yup.object({
                        username: Yup.string()
                            .required('Username is required'),
                        password: Yup.string()
                            .required('Password is required')
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        const user = await login(values.username, values.password);

                        if (user) {
                            setUser(user);
                            navigate("/home");
                        } else {
                            // TODO: Show a error message
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
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password} />
                                <InputErrorLabel>{errors.password && touched.password && errors.password}</InputErrorLabel>
                            </InputContainer>
                            <div>
                                <SubmitButton type="submit" disabled={isSubmitting}>Entrar</SubmitButton>
                                <RegisterButton type="button" onClick={() => navigate("/register")}>Registrar</RegisterButton>
                            </div>
                        </form>
                    )}
                </Formik>
            </Container>
        </DefaultLayout>
    )
}