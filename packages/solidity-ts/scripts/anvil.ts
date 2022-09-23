import { ethers } from 'ethers';
import shell from 'shelljs';
import { invariant } from 'ts-invariant';

import { getMnemonic, getMnemonicPath } from '~helpers/functions';

interface IAnvilScriptsRequiredArgs {
  sender?: string;
}

export const anvil = async (): Promise<void> => {
  const cmd = await createFoundryDeployArgs({});

  shell.exec(cmd, { silent: false, async: true });
};

export const createFoundryDeployArgs = async ({ sender }: IAnvilScriptsRequiredArgs): Promise<string> => {
  const mnemonicPaths = await getMnemonicPath(sender);
  const mnemonic = getMnemonic(mnemonicPaths);
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  invariant(wallet.address, 'Could not find find mnemonic and address, run yarn generate and yarn account');

  const cmd = `anvil --mnemonic "${mnemonic}"`;
  return cmd;
};

void anvil();
