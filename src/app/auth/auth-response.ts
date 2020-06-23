export interface AuthResponse {
    user: {
        id: number,
        name: string,
        email: string,
        auth_token: string,
        expires_in: number
    }
}
