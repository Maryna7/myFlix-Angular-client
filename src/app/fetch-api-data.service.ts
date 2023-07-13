import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Director, Genre, ILogin, IMovie, IUser, IUserCredentials, IUserRegistration, IUserUpdate} from "./types";

//Declaring the api url that will provide data for the client app
const apiUrl = 'some';

/**
 * Injectable service for fetching data from the API.
 */
@Injectable({
    providedIn: 'root'
})
export class FetchApiDataService {
    constructor(private http: HttpClient) {
        const user = this.getUser();
        const token = this.getToken();
        const movies = this.getAllMovies();
        this.favoriteIds = user.FavoriteMovies;
        this.user = user;
        this.token = token;
        this.allMovies = movies;
    }

    /**
     * An array of all movies.
     */
    allMovies: IMovie[] = [];

    /**
     * The currently logged-in user.
     */
    user: IUser | undefined;

    /**
     * An array of favorite movie IDs for the logged-in user.
     */
    favoriteIds: string[] = [];

    /**
     * The authentication token for the logged-in user.
     */
    token: string | undefined;

    /**
     * Registers a new user.
     * @param userDetails - The user registration details.
     * @returns An Observable of the HTTP response.
     */
    public userRegistration(userDetails: IUserRegistration): Observable<any> {
        return this.http.post(`${apiUrl}users`, userDetails).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Logs in a user.
     * @param userDetails - The user login credentials.
     * @returns An Observable of the login response.
     */
    public userLogin(userDetails: IUserCredentials): Observable<ILogin> {
        return this.http.post<ILogin>(`${apiUrl}login`, userDetails).pipe(
            tap(response => this.setUser(response.user)),
            tap(response => this.setToken(response.token)),
            catchError(this.handleError)
        );
    }

    /**
     * Fetches all movies.
     * @returns An Observable of an array of movies.
     */
    fetchAllMovies(): Observable<IMovie[]> {
        return this.http.get<IMovie[]>(`${apiUrl}movies`, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.getToken()}`,
            })
        }).pipe(
            map(this.extractResponseData),
            tap(allMovies => this.setAllMovies(allMovies)),
            catchError(this.handleError)
        );
    }

    /**
     * Fetches a single movie by title.
     * @param title - The title of the movie.
     * @returns An Observable of the movie.
     */
    getOneMovie(title: string): Observable<IMovie> {
        return this.http.get(`${apiUrl}movies/${title}`, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.getToken()}`,
            })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    /**
     * Fetches a single director by name.
     * @param directorName - The name of the director.
     * @returns An Observable of the director.
     */
    getOneDirector(directorName: string): Observable<Director> {
        return this.http.get<Director>(`${apiUrl}movies/directors/${directorName}`, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.getToken()}`,
            })
        });
    }

    /**
     * Fetches a single genre by name.
     * @param genreName - The name of the genre.
     * @returns An Observable of the genre.
     */
    getOneGenre(genreName: string): Observable<Genre> {
        return this.http.get(`${apiUrl}movies/genres/${genreName}`, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.getToken()}`,
            })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    /**
     * Fetches the logged-in user.
     * @returns An Observable of the user.
     */
    getOneUser(): Observable<any> {
        return this.http.get(`${apiUrl}users/${this.getUser().Username}`, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.getToken()}`
            })
        }).pipe(
            map(this.extractResponseData),
            tap(user => this.user = user),
            catchError(this.handleError)
        );
    }

    /**
     * Fetches the favorite movies of the logged-in user.
     * @returns An Observable of the favorite movies.
     */
    getFavoriteMovies(): Observable<any> {
        return this.http.get(`${apiUrl}users/${this.getUser().Username}`, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.getToken()}`
            })
        }).pipe(
            map(this.extractResponseData),
            map((data) => data.FavoriteMovies),
            catchError(this.handleError)
        );
    }

    /**
     * Adds a movie to the favorites of the logged-in user.
     * @param movieId - The ID of the movie.
     * @returns An Observable of the updated user.
     */
    addFavoriteMovie(movieId: string): Observable<IUser> {
        return this.http.post<IUser>(`${apiUrl}users/${this.getUser().Username}/movies/${movieId}`, null, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.getToken()}`
            })
        }).pipe(
            map(this.extractResponseData),
            tap(user => this.setUser(user)),
            catchError(this.handleError)
        );
    }

    /**
     * Removes a movie from the favorites of the logged-in user.
     * @param movieId - The ID of the movie.
     * @returns An Observable of the updated user.
     */
    removeFavoriteMovie(movieId: string): Observable<IUser> {
        return this.http.delete(`${apiUrl}users/${this.getUser().Username}/movies/${movieId}`, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.getToken()}`
            })
        }).pipe(
            map(this.extractResponseData),
            tap(user => this.setUser(user)),
            catchError(this.handleError)
        );
    }

    /**
     * Edits the details of the logged-in user.
     * @param updatedUser - The updated user details.
     * @returns An Observable of the updated user.
     */
    editOneUser(updatedUser: IUserUpdate): Observable<IUser> {
        return this.http.put(`${apiUrl}users/${this.getUser().Username}`, updatedUser, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.getToken()}`
            })
        }).pipe(
            map(this.extractResponseData),
            tap(user => this.setUser(user)),
            catchError(this.handleError)
        );
    }

    /**
     * Deletes the logged-in user.
     * @returns An Observable of the HTTP response.
     */
    deleteOneUser(): Observable<any> {
        return this.http.delete(`${apiUrl}users/${this.getUser().Username}`, {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.getToken()}`
            })
        }).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Extracts the response data from an HTTP response.
     * @param res - The HTTP response.
     * @returns The response data.
     */
    private extractResponseData(res: any): any {
        const body = res;
        return body || {};
    }

    /**
     * Handles HTTP errors.
     * @param error - The HTTP error response.
     * @returns An Error object.
     */
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('Some error occurred:', error.error.message);
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                `Error body is: ${error.error}`
            );
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    /**
     * Sets the array of all movies and stores it in localStorage.
     * @param movies - The array of movies.
     */
    setAllMovies(movies: IMovie[]): void {
        this.allMovies = movies;
        localStorage.setItem('allmovies', JSON.stringify(movies));
    }

    /**
     * Retrieves the array of all movies from localStorage.
     * @returns The array of movies.
     */
    getAllMovies(): IMovie[] {
        return this.allMovies.length ? this.allMovies : JSON.parse(localStorage.getItem('allmovies') || '[]') as IMovie[];
    }

    /**
     * Sets the currently logged-in user and stores it in localStorage.
     * @param user - The user object.
     */
    setUser(user: IUser): void {
        this.user = user;
        this.favoriteIds = user.FavoriteMovies;
        localStorage.setItem('user', JSON.stringify(user));
    }

    /**
     * Retrieves the currently logged-in user from localStorage.
     * @returns The user object.
     */
    getUser(): IUser {
        return this.user || JSON.parse(localStorage.getItem('user') || '{}') as IUser;
    }

    /**
     * Sets the authentication token and stores it in localStorage.
     * @param token - The authentication token.
     */
    setToken(token: string): void {
        this.token = token;
        localStorage.setItem('token', token);
    }

    /**
     * Retrieves the authentication token from localStorage.
     * @returns The authentication token.
     */
    getToken(): string {
        return this.token || localStorage.getItem('token') || '';
    }
}