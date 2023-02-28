import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Crowdloan from "./pages/Crowdloan";
import { ScatterJS, ScatterEOS } from "scatter-ts";
import { JsonRpc, Api } from "eosjs";
import { useDispatch, useSelector } from "react-redux";
import { setLoans, walletSelector } from "./store/walletReducer";

function App() {
  const dispatch = useDispatch();
  const { account } = useSelector(walletSelector);

  const connectEos = async () => {
    const network = ScatterJS.Network.fromJson({
      blockchain: "eos",
      chainId:
        "2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840",
      host: "jungle3.cryptolions.io",
      port: 443,
      protocol: "https",
    });
    const rpc = new JsonRpc(network.fullhost());
    const connected = await ScatterJS.connect("LiqueosAPP", { network });
    if (!connected) {
      return alert("Scatter Desktop should be installed and open");
    }
    const eos = ScatterJS.eos(network, Api, { rpc });

    const loans = await rpc.get_table_rows({
      json: true,
      code: "crowdloan123",
      scope: "crowdloan123",
      table: "loans",
      limit: 1,
      reverse: true,
    });
    dispatch(setLoans({ loans: loans.rows[loans.rows.length - 1] }));
  };

  useEffect(() => {
    connectEos();
  }, []);
  return (
    <div className="App">
      <Header></Header>
      <Crowdloan></Crowdloan>
    </div>
  );
}

export default App;
