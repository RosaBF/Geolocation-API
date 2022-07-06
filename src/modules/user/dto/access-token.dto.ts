export interface IAccessTokenDTO {
    token: string
}

export interface ITimeExpiresToken extends IAccessTokenDTO {
    expiresIn: number;
}