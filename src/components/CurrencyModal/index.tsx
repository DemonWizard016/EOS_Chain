import React from "react";
import styled from "styled-components";
import { Box } from "@mui/material";

const CurrencyModal: React.FC = () => {
  return (
    <>
      <Container>
        <Box>Select a Token</Box>
        <SymbolList></SymbolList>
      </Container>
      <Overlay>
        <Box sx={{ overflow: "visible", height: "0px" }}>
          <Box
            sx={{
              position: "relative",
              height: "488px",
              width: "100%",
              overflow: "auto",
              willChange: "transform",
              direction: "ltr",
            }}
          >
            <Box sx={{ height: "1176px", width: "100%" }}>
              <Symbol>
                <Box>EOS</Box>
                <Box>EOSIO chain</Box>
              </Symbol>
            </Box>
          </Box>
        </Box>
      </Overlay>
    </>
  );
};

const Container = styled(Box)`
  max-width: 420px;
  max-height: 80vh;
  width: 65vw;
  border-radius: 16px;
  padding: 1rem 1.25rem;
  background-color: #111;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Overlay = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.7);
`;
const SymbolList = styled(Box)`
  flex: 1 1 0%;
  height: 100%;
`;
const Symbol = styled(Box)`
  height: 56px;
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
`;
export default CurrencyModal;
