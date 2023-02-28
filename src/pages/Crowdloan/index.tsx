import React, { useRef, useState } from "react";
import {
  Container,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "styled-components";
import { useSelector } from "react-redux";

import CurrencyCard from "../../components/CurrencyCard";
import CurrencyInput from "../../components/CurrencyInput";
import { walletSelector } from "../../store/walletReducer";
import ProjectInput from "../../components/ProjectInput";
import { useEos } from "../../hooks/useEos";

const Crowdloan: React.FC = () => {
  const eosRef = useRef<HTMLInputElement>(null);
  const leosRef = useRef<HTMLInputElement>(null);
  const leosProjectRef = useRef<HTMLInputElement>(null);
  const [leosProjectSymbol, setLeosProjectSymbol] = useState("EOS");
  const [leosCustomSymbol, setLeosCustomSymbol] = useState("EOS");
  const eosProjectRef = useRef<HTMLInputElement>(null);
  const leosCustomRef = useRef<HTMLInputElement>(null);
  const leosContractRef = useRef<HTMLInputElement>(null);
  const { account, loans } = useSelector(walletSelector);
  const { sendTransaction } = useEos();

  const stakeEosHandler = () => {
    if (eosProjectRef?.current.value === "") {
      return alert("Input project symbol");
    }
    const eosAmount = parseFloat("0" + eosRef?.current.value);
    if (account) {
      sendTransaction("depositeeos", {
        staker: account.name,
        loanId: loans.id,
        eosToken: eosAmount.toFixed(4) + " EOS",
        projectName: eosProjectRef?.current.value.toUpperCase(),
      });
    } else {
      alert("Connect to wallet first");
    }
  };

  const stakeLeosHandler = () => {
    const leosToken =
      parseFloat("0" + leosRef?.current.value).toFixed(4) + " LEOS";
    const projectToken =
      parseFloat("0" + leosProjectRef?.current.value).toFixed(4) +
      " " +
      leosProjectSymbol.toUpperCase();
    if (account) {
      sendTransaction("depositeleos", {
        staker: account.name,
        loanId: loans.id,
        leosToken,
        randomToken: projectToken,
      });
    } else {
      alert("Connect to wallet first");
    }
  };

  let totalEos = 0;
  if (Object.keys(loans).length > 0) {
    loans.projects.forEach((pro) => {
      totalEos += parseFloat(pro.value.totalLeos.slice(0, -5));
    });
  }

  return (
    <CrowdloanContainer>
      <Container>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          sx={{ marginTop: "10rem", marginBottom: "5rem" }}
        >
          <Grid item xs={12} sm={12} md={4}>
            <StatusCard>
              <Box sx={{ textAlign: "left" }}>
                <StatusTitle>Total LEOS Locked</StatusTitle>
                <Currency>{totalEos.toFixed(4) + " LEOS"}</Currency>
              </Box>
              <Box sx={{ marginTop: "1rem", textAlign: "left" }}>
                <StatusTitle>Total EOS Locked</StatusTitle>
                <ProjectTable>
                  <Table key="Status">
                    <TableHead>
                      <TableRow>
                        <TableCell>Project Name</TableCell>
                        <TableCell>EOS</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.keys(loans).length > 0
                        ? loans.projects.map((pro, i) => (
                            <TableRow>
                              <TableCell>{pro.key}</TableCell>
                              <TableCell>{pro.value.totalEos}</TableCell>
                            </TableRow>
                          ))
                        : null}
                    </TableBody>
                  </Table>
                </ProjectTable>
              </Box>
            </StatusCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CurrencyCard
              title="Stake LEOS"
              btntext="Stake LEOS"
              btnclick={stakeLeosHandler}
            >
              <CurrencyInput
                text="LEOS"
                valueRef={leosRef}
                symbolFixed
                symbolValue="LEOS"
              ></CurrencyInput>
              <CurrencyInput
                text="Project"
                valueRef={leosProjectRef}
                symbolValue={leosProjectSymbol}
                symbolChanged={setLeosProjectSymbol}
              ></CurrencyInput>
              <SeperateLine></SeperateLine>
              <ProjectInput
                text="Contract address"
                inputRef={leosContractRef}
                placeholder="Contract Address"
              ></ProjectInput>
              <CurrencyInput
                text="Custom project"
                valueRef={leosCustomRef}
                symbolValue={leosCustomSymbol}
                symbolChanged={setLeosCustomSymbol}
              ></CurrencyInput>
            </CurrencyCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CurrencyCard
              title="Stake EOS"
              btntext="Stake EOS"
              btnclick={stakeEosHandler}
            >
              <ProjectInput
                text="Project"
                inputRef={eosProjectRef}
                placeholder="HUB"
              ></ProjectInput>
              <CurrencyInput
                text="EOS"
                valueRef={eosRef}
                symbolFixed
                symbolValue="EOS"
              ></CurrencyInput>
            </CurrencyCard>
          </Grid>
        </Grid>
      </Container>
    </CrowdloanContainer>
  );
};

const CrowdloanContainer = styled(Box)`
  width: 100%;
  height: 100%;
  background-image: url(/assets/image/back.svg);
  background-size: cover;
  display: flex;
`;

const StatusCard = styled(Box)`
  background-color: hsla(0, 0%, 100%, 0.1);
  border-radius: 20px;
  padding: 1.5rem;
  height: 100%;
`;

const StatusTitle = styled(Box)`
  font-weight: 500;
  font-size: 1rem;
  color: #ccc;
`;

const Currency = styled(Box)`
  color: white;
  font-size: 1.6rem;
`;

const ProjectTable = styled(TableContainer)`
  margin-top: 0.3rem;
  color: white !important;
  table {
    border: 1px solid #bbb;
  }
  th {
    border: 1px solid #bbb;
    font-weight: 600;
    color: white;
  }
  td {
    color: white;
    border: none;
    border-right: 1px solid #bbb;
  }
`;

const SeperateLine = styled.hr`
  border-color: #444;
`;

export default Crowdloan;
