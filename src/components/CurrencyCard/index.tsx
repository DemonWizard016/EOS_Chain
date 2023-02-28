import React from "react";
import { Box, Button } from "@mui/material";
import styled from "styled-components";

interface Props {
  title: string;
  children: React.ReactNode;
  btntext: string;
  btnclick: any;
}

const CurrencyCard: React.FC<Props> = (props) => {
  return (
    <Container>
      <CurrencyCardHeader>{props.title}</CurrencyCardHeader>
      <CurrencyCardBody>{props.children}</CurrencyCardBody>
      <CurrencyCardButton onClick={props.btnclick} variant="outlined" fullWidth>
        {props.btntext}
      </CurrencyCardButton>
    </Container>
  );
};

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: #080808;
  padding: 1.5rem;
  height: 100%;
`;

const CurrencyCardHeader = styled(Box)`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  color: white;
  font-weight: 500;
`;

const CurrencyCardBody = styled(Box)`
  flex: 1 1 0%;
  margin-bottom: 1rem;
`;

const CurrencyCardButton = styled(Button)`
  border-color: #11a0cc !important;
  border-radius: 30px !important;
  color: #ccc !important;
  padding: 1rem 1.5rem !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  text-transform: none !important;
`;

export default CurrencyCard;
