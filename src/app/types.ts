/**
 * Interface representing dialog data.
 */
export interface DialogData {
    title: string[];
    description: string[][];
}

/**
 * Interface representing a movie director.
 */
export interface Director {
    "Name": string;
    "Bio": string;
    "Birth": string;
}

/**
 * Interface representing a movie genre.
 */
export interface Genre {
    "Name": string;
    "Description": string;
}

/**
 * Interface representing a movie.
 */
export interface IMovie {
    "Genre": Genre;
    "Director": Director;
    "Actors": [];
    "_id": string;
    "Title": string;
    "Description": string;
    "ImagePath": string;
    "Featured": boolean;
}

/**
 * Interface representing a user.
 */
export interface IUser {
    "_id": string;
    "Username": string;
    "Password": string;
    "Email": string;
    "Birthday": string;
    "FavoriteMovies": string[];
    "__v": number;
}

/**
 * Interface representing a login response.
 */
export interface ILogin {
    user: IUser;
    token: string;
}

/**
 * Interface representing user update information.
 */
export interface IUserUpdate {
    Birthday: string;
    ConfirmPassword: string;
    Email: string;
    Password: string;
    Username: string;
}

/**
 * Interface representing user registration information.
 */
export interface IUserRegistration {
    Username: string;
    Password: string;
    Email: string;
    Birthday: string;
}

/**
 * Interface representing user credentials.
 */
export interface IUserCredentials {
    Username: string;
    Password: string;
}