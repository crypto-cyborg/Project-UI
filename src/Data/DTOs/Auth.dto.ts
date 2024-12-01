export interface LoginDTO {
    Username: string,
    Password: string
}

export interface RegisterDTO {
    Username: string,
    Password: string,
    ConfirmPassword: string,
    Email: string,
    FirstName: string,
    LastName: string,
    SecretKey: string,
    ApiKey: string
}