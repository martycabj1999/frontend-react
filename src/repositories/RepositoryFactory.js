import AuthRepository from "./authRepository";
import UserRepository from "./userRepository";
import WalletRepository from "./walletRepository";

const repositories = {
  auth: AuthRepository,
  user: UserRepository,
  wallet: WalletRepository,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};
