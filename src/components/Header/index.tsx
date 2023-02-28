import React from "react";
import { Box } from "@mui/material";
import styled from "styled-components";
import { ScatterJS, ScatterEOS } from "scatter-ts";
import { useDispatch, useSelector } from "react-redux";
import { setAccount, walletSelector } from "../../store/walletReducer";

ScatterJS.plugins(new ScatterEOS());

const Header: React.FC = () => {
  const { account } = useSelector(walletSelector);
  const dispatch = useDispatch();

  const ConnectWallet = async () => {
    const id = await ScatterJS.login();
    if (!id) {
      return alert("No identify exist");
    }
    const account = ScatterJS.account("eos");
    dispatch(setAccount({ account }));
  };

  const LogoutWallet = () => {
    ScatterJS.logout();
    dispatch(setAccount({ account: undefined }));
  };

  return (
    <HeaderContainer>
      <Box>
        <Logo component="a">
          <Box component="img" {...{ src: "/assets/image/logo.png" }}></Box>
        </Logo>
        <Box>
          {/* <NavLink component="a" {...{ to: "#" }}>
            Swap
          </NavLink>
          <NavLink component="a" {...{ to: "#" }}>
            Pool
          </NavLink>
          <NavLink component="a" {...{ to: "#" }}>
            Farm
          </NavLink>
          <NavLink component="a" {...{ to: "#" }}>
            Stake
          </NavLink>
          <NavLink component="a" {...{ to: "#" }}>
            Bridge
          </NavLink>
          <NavLink component="a" {...{ to: "#" }}>
            Mint Hedge
          </NavLink> */}
          <NavLink component="a" {...{ to: "#" }}>
            Crowd Loan
          </NavLink>
        </Box>
      </Box>
      <Box>
        <NavLink
          component="a"
          sx={{ marginRight: "20px" }}
          onClick={() =>
            account === undefined ? ConnectWallet() : LogoutWallet()
          }
        >
          {account === undefined ? "Wallet" : (account as any).name}
        </NavLink>
      </Box>
    </HeaderContainer>
  );
};

const HeaderContainer = styled(Box)`
  width: 100%;
  height: 70px;
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    height: 100%;
  }
`;

const NavLink = styled(Box)`
  color: #ddd;
  text-decoration: none;
  cursor: pointer;
  padding: 5px 10px;
`;

const Logo = styled(Box)`
  margin-left: 10px;
  margin-right: 30px;
  height: 90%;
  display: inline-block;

  img {
    height: 100%;
  }
`;

export default Header;
