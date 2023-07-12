export interface DialogData {
    title: string[]
    description: string[][]
}
export interface Director {
    "Name":string
    "Bio":string
    "Birth":string
}
export interface Genre {
    "Name":string
    "Description":string
}

export interface IMovie {
    "Genre": Genre,
    "Director": Director,
    "Actors": [],
    "_id":string
    "Title":string
    "Description":string
    "ImagePath":string
    "Featured": boolean
};

export interface IUser {
    "_id": string
    "Username": string
    "Password": string
    "Email": string
    "Birthday": string
    "FavoriteMovies": string[],
    "__v": number
};

export interface ILogin {
    user: IUser
    token: string
}

export interface IUserUpdate {
    Birthday: string
    ConfirmPassword: string
    Email: string
    Password: string
    Username: string
}
export interface IUserRegistration {
    Username: string
    Password: string
    Email: string
    Birthday: string
}
export interface IUserCredentials {
    Username: string
    Password: string
}