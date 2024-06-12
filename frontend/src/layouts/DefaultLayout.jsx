import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #0f044c;
  color: white;
`;

const DefaultLayout = ({ children }) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

export default DefaultLayout;
