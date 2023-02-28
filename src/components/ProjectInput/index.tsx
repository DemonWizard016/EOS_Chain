import React from "react";
import { Box } from "@mui/material";
import styled from "styled-components";

interface Props {
  text: string;
  inputRef: any;
  placeholder: string;
}

const ProjectInput: React.FC<Props> = (props) => {
  return (
    <Container>
      <Header>
        <HeaderTitle>{props.text}</HeaderTitle>
      </Header>
      <InputGroup>
        <ProjectValue>
          <input
            autoComplete="off"
            autoCorrect="auto"
            type="text"
            placeholder={props.placeholder}
            spellCheck={false}
            ref={props.inputRef}
          ></input>
        </ProjectValue>
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

const ProjectValue = styled(Box)`
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
    font-weight: 500;
    font-size: 1.25rem;
    padding: 0;
    padding-left: 5px;
    text-transform: uppercase;
    background-color: transparent;
    border: none;
    text-overflow: ellipsis;
    overflow: hidden;
    flex: 1 1 auto;
    width: 0;
    position: relative;
  }
`;

export default ProjectInput;
