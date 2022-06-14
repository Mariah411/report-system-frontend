
// модель пользователя
export interface IUser{
    email: string;
    password: string;
    fio: string;
    roles: string[],
    places: string[]
}