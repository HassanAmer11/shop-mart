export interface SuccessAuthResponse {
    message: string;
    user: UserInterface;
    token: string;
}

export interface UserInterface {
    name: string;
    email: string;
    role: string;
};

export interface FailedAuthResponse {
    message: string;
    statusMsg: string;
}