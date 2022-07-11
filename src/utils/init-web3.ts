import Web3Modal from 'web3modal';

export const initWeb3 = async () => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const reload = () => window.location.reload();
  if (!connection) throw new Error('No "window.ethereum" found. do you have Metamask installed?');

  connection.on('chainChanged', reload);
  connection.on('accountsChanged', reload);

  return connection;
};
