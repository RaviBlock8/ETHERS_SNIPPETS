const { ethers } = require("ethers");
const TestEthersAbi = require("./build/contracts/TestEthers.json");
const JSBI = require("jsbi");

const loadweb3 = () => {
  try {
    //here we are getting the provider , provider is basically the node through which we
    //will be interacting with blockchain , it can an test rpc or may be connected to
    //metamask which in turn as we know connects us to rpc url , or it can be http provider like
    //ganache or an client implementation like geth or parity
    const provider = new ethers.providers.JsonRpcProvider(
      "HTTP://127.0.0.1:8545"
    );

    // const contractAddress = "0x82c76540644E78Acb893797Cc9Db9D6166854d08";
    const contractAddress = "0xeA3024c3084D3c42CdE63E4a4638C8F262eDED54";
    //here we are basically creating an instance of contract at that address to interact
    //we provide the signer in the beginning , so unlike web3js we do not have to provide it
    //in every step of the way
    const testEthers = new ethers.Contract(
      contractAddress,
      JSON.stringify(TestEthersAbi.abi),
      provider
    );
    return testEthers;
  } catch (err) {
    return null;
  }
};

const startListening = (testEthers) => {
  testEthers.on("StudentAdded", (rollno, name, _class, eve) => {
    console.log("name,", name.toString());
  });
};

const startL = (testEthers) => {
  let filter = testEthers.filters.StudentAdded(10, null, null);
  testEthers.on(filter, (rollno, name, _class, eve) => {
    console.log("name,", name.toString());
  });
};

const studentAdd = (rollno, name, _class) => {
  const testEthers = loadweb3();
  startListening(testEthers);
  testEthers.addStudent(rollno, name, _class).then((tx) => {
    console.log("transaction sent");
    tx.wait().then(() => {
      console.log("transaction confirmed.....");
    });
  });
};

const getStudent = (rollno) => {
  const testEthers = loadweb3();
  testEthers.getStudentName(rollno).then((tx) => {
    console.log(tx.toString());
  });
};

// studentAdd(JSBI.BigInt(1), "Sahil", "SE");
// getStudent(1);

const createWallet = () => {
  var utils = ethers.utils;
  const provider = new ethers.providers.JsonRpcProvider(
    "HTTP://127.0.0.1:8545"
  );
  const wallet = new ethers.Wallet(
    "0x65363032376130643132653033396461633138303366613530353465643134363738396135303030633366663034316461653437346434616631323338643238",
    provider
  );
  console.log("wallet address:", wallet.address);
  var transaction = {
    nonce: utils.hexValue(0),
    gasLimit: utils.hexValue(210000),
    gasPrice: JSBI.BigInt("20000000000"),

    to: "0xFd8792A7e1fb078F3De1CeEceFc223fE6189DA27",

    value: utils.parseEther("1.0"),
    data: "0x",
  };

  var signedTransaction = wallet.signTransaction(transaction);

  console.log(signedTransaction);
  // "0xf86c808504a817c8008252089488a5c2d9919e46f883eb62f7b8dd9d0cc45bc2" +
  //   "90880de0b6b3a7640000801ca0d7b10eee694f7fd9acaa0baf51e91da5c3d324" +
  //   "f67ad827fbe4410a32967cbc32a06ffb0b4ac0855f146ff82bef010f6f2729b4" +
  //   "24c57b3be967e2074220fca13e79"

  provider.sendTransaction(signedTransaction).then(function (hash) {
    console.log("Hash: " + hash);
    // Hash:
  });
};

createWallet();
