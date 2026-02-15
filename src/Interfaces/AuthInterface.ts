export interface SuccessAuthResponse {
  message: string;
  user: UserInterface;
  token: string;
  statusMsg: string;
}

export interface UserInterface {
    name: string;
    email: string;
    role: string;
};

