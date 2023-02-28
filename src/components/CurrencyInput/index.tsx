import React from "react";
import { Box, Input } from "@mui/material";
import styled from "styled-components";

interface Props {
  text: string;
  valueRef: any;
  symbolFixed?: boolean;
  symbolValue: string;
  symbolChanged?: any;
}

const CurrencyInput: React.FC<Props> = (props) => {
  const symbolChangeHandler = (e) => {
    e.preventDefault();
    if (!props.symbolFixed && e.target.value.length <= 5)
      props.symbolChanged(e.target.value);
  };
  return (
    <Container>
      <Header>
        <HeaderTitle>{props.text}</HeaderTitle>
      </Header>
      <InputGroup>
        <CurrencyValue>
          <input
            inputMode="decimal"
            autoComplete="off"
            autoCorrect="auto"
            type="text"
            pattern="^[0-9]*[.,]?[0-9]*$"
            placeholder="0.0000"
            min={0}
            minLength={1}
            maxLength={79}
            spellCheck={false}
            onBlur={(e) => {
              e.preventDefault();
              e.target.value = parseFloat(`0${e.target.value}`).toFixed(4);
              return e;
            }}
            ref={props.valueRef}
          ></input>
        </CurrencyValue>
        <CurrencyType>
          <Box>
            <CurrencySymbol>
              <Box>
                <Input
                  type="text"
                  value={props.symbolValue}
                  onChange={symbolChangeHandler}
                ></Input>
              </Box>
            </CurrencySymbol>
            {/* <ArrowDown
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              width="16"
              height="16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </ArrowDown> */}
          </Box>
        </CurrencyType>
      </InputGroup>
    </Container>
  );
};

const Container = styled(Box)`
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  border-radius: 16px;
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

const HeaderTitle = styled(Box)`
  color: #575757;
  font-weight: 500;
  white-space: nowrap;
  font-size: 0.85rem;
`;

const InputGroup = styled(Box)`
  background-color: #111;
  border-radius: 16px;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`;

const CurrencyValue = styled(Box)`
  padding: 0.75rem;
  background-color: #111;
  border-radius: 16px;
  display: flex;
  align-items: center;
  width: 100%;

  input {
    color: #ccc;
    outline: 2px solid transparent;
    outline-offset: 2px;
    font-weight: 700;
    font-size: 1.6rem;
    padding: 0;
    background-color: transparent;
    border: none;
    text-overflow: ellipsis;
    overflow: hidden;
    flex: 1 1 auto;
    width: 0;
    position: relative;
  }
`;

const CurrencyType = styled(Box)`
  outline: 2px solid transparent;
  background-color: transparent;
  outline-offset: 2px;
  color: #ccc;
  font-weight: 500;
  font-size: 1.35rem;
  border-style: none;
  align-items: center;
  user-select: none;
  width: 150px;
  height: 100%;
  margin: auto;

  > div {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    border-left: 2px solid #080808;
    align-items: center;
    display: flex;
  }
`;

const CurrencySymbol = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  flex: 1 1 0%;

  > div {
    display: flex;
    align-items: center;
    flex: 1 1 0%;
    font-weight: 700;
    font-size: 0.975rem;
    > div::after,
    > div::before {
      content: "";
      border: 0 !important  ;
    }
    input {
      color: white !important;
      text-transform: uppercase;
    }
  }
`;

const ArrowDown = styled.svg`
  stroke: #ccc;
  margin-left: 0.5rem;
  display: block;
`;

export default CurrencyInput;
