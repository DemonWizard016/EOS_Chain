import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoans, walletSelector } from "../store/walletReducer";
import { ScatterJS, ScatterEOS } from "scatter-ts";
import { JsonRpc, Api } from "eosjs";

export const useEos = () => {
  const dispatch = useDispatch();
  const { account } = useSelector(walletSelector);
  const network = ScatterJS.Network.fromJson({
    blockchain: "eos",
    chainId: "2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840",
    host: "jungle3.cryptolions.io",
    port: 443,
    protocol: "https",
  });
  const rpc = new JsonRpc(network.fullhost());
  const eos = ScatterJS.eos(network, Api, { rpc });

  const getLoanData = async () => {
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

  const sendTransaction = (action, data) => {
    eos
      .transact(
        {
          actions: [
            {
              account: "crowdloan123",
              name: action,
              authorization: [
                {
                  actor: account.name,
                  permission: account.authority,
                },
              ],
              data,
            },
          ],
        },
        { blocksBehind: 3, expireSeconds: 30 }
      )
      .then((res) => {
        console.log(res);
        getLoanData();
      })
      .catch((err) => console.log(err));
  };
  return { getLoanData, sendTransaction };
};
