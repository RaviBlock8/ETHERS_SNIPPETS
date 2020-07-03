const { ethers } = require("ethers");
const TestEthers = require("./build/contracts/TestEthers.json");
const abi = JSON.stringify(TestEthers.abi);

const loadWeb3 = () => {
  try {
    const providers = new ethers.providers.JsonRpcProvider(
      "HTTP://127.0.0.1:8545"
    );
    const contractAddress = "0x0bB1E8D98c69eA440Aa79Ca462484336599023bF";
    const contract = new ethers.Contract(
      contractAddress,
      abi,
      providers.getSigner(0)
    );
    providers.listAccounts().then((list) => {
      console.log("accounts:", list);
    });

    // return { providers, contract };
  } catch (err) {
    console.log(err);
  }
};

const walletTest = () => {
  const { providers, contract } = loadWeb3();
  console.log(providers.anyNetwork);
  try {
    const wallet = new ethers.Wallet(
      "0x65363032376130643132653033396461633138303366613530353465643134363738396135303030633366663034316461653437346434616631323338643238"
    );
    console.log("walle address:", wallet.address);
    wallet.provider = providers.network._defaultProvider;
    wallet.getBalance().then((balance) => {
      console.log("wallet balance:", balance);
    });
  } catch (err) {
    console.log(err);
  }
};
loadWeb3();
// walletTest();
