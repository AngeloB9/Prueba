import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  border: solid 10px white;
  border-radius: 15px;
  width: 100%;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const IlustrativeBox = styled.div`
  width: 60%;
  padding: 1em;
  color: white;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const FormBox = styled.div`
  width: 40%;
  display: flex;
  padding: 3em;
  align-items: center;
  border-left: solid 1px gray;
  @media screen and (max-width: 768px) {
    width: 100%;
    border-left: none;
    border-top: solid 5px white;
    padding: 1em;
  }
`;
