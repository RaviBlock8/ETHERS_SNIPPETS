const { ethers } = require("ethers");
const TestEthers = require("./build/contracts/TestEthers.json");
const abi = JSON.stringify(TestEthers.abi);

const loadWeb3 = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rinkeby.infura.io/v3/5ed2cd4c8dc34422891f01c34d67461a"
  );
  console.log("provider:", provider._lastBlockNumber);
  provider.listAccounts().then((list) => {
    console.log("accounts:", list);
  });
  const pk =
    "0xE0B3EBBE39C8DBA38A2D2035002571FED3A99DCFEAB87FDF9BF840F7A359805A";
  const wallet = new ethers.Wallet(pk, provider);
  //   console.log("wallet", wallet);
  wallet.getBalance().then((balance) => {
    console.log("balance:", balance.toString());
  });
  wallet.getTransactionCount().then((count) => {
    console.log("transaction count:", count.toString());
  });
  console.log(wallet.publicKey);
  return wallet;
};

const sendTransaction = () => {
  const wallet = loadWeb3();
  const reciever = "0x627C001823dF74384eE25aBa90B61f7F95FAAC39";
  const wei = ethers.utils.parseEther("1.0");
  const tx = {
    to: reciever,
    value: wei,
  };
  console.log("wei:", wei);
  wallet.sendTransaction(tx).then((tx) => {
    console.log(tx);
  });
};
// loadWeb3();
sendTransaction();
