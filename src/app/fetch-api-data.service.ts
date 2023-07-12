import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Director, Genre, ILogin, IMovie, IUser, IUserCredentials, IUserRegistration, IUserUpdate} from "./types";

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://maryna-myflix-app.herokuapp.com/';
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

  allMovies: IMovie[] = []
  user: IUser | undefined
  favoriteIds: string[] = []
  token: string | undefined

  public userRegistration(userDetails: IUserRegistration): Observable<any> {
    return this.http.post( `${apiUrl}users`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userDetails: IUserCredentials): Observable<ILogin> {
    // @ts-ignore
    return this.http.post<ILogin>(`${apiUrl}login`, userDetails).pipe(
        tap(response => this.setUser(response.user)),
        tap(response => this.setToken(response.token)),
      catchError(this.handleError)
    );
  }

  fetchAllMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${apiUrl}movies`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken()}`,
        })
    }).pipe(
      map(this.extractResponseData),
      tap(allMovies => this.setAllMovies(allMovies)),
      catchError(this.handleError)
    );
  }

  getOneMovie(title: string): Observable<IMovie> {
    return this.http.get( `${apiUrl}movies/${title}`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken()}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getOneDirector(directorName: string): Observable<Director> {
    return this.http.get<Director>( `${apiUrl}movies/directors/${directorName}`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken()}`,
        })
    });
  }

  getOneGenre(genreName: string): Observable<Genre> {
    return this.http.get( `${apiUrl}movies/genres/${genreName}`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken()}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getOneUser(): Observable<any> {
    return this.http.get(`${apiUrl}users/${this.getUser().Username}`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken()}`
        }
      )
    }).pipe(
      map(this.extractResponseData),
      tap(user => this.user = user),
      catchError(this.handleError)
    );
  }

  getFavoriteMovies(): Observable<any> {
    return this.http.get( `${apiUrl}users/${this.getUser().Username}`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken()}`
        }
      )
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies),
      catchError(this.handleError));
  }

  addFavoriteMovie(movieId: string): Observable<IUser> {
    return this.http.post<IUser>(`${apiUrl}users/${this.getUser().Username}/movies/${movieId}`,  null, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken()}`
        }
      )
    }).pipe(
        map(this.extractResponseData),
        tap(user => this.setUser(user)),
      catchError(this.handleError)
    );
  }

  removeFavoriteMovie(movieId: string): Observable<IUser> {
    return this.http.delete(`${apiUrl}users/${this.getUser().Username}/movies/${movieId}`, {
      headers: new HttpHeaders(
          {
            Authorization: `Bearer ${this.getToken()}`
          }
      )
    }).pipe(
        map(this.extractResponseData),
        tap(user => this.setUser(user)),
        catchError(this.handleError)
    );
  }

  editOneUser(updatedUser: IUserUpdate): Observable<IUser> {
    return this.http.put(`${apiUrl}users/${this.getUser().Username}`, updatedUser, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken()}`
        }
      )
    }).pipe(
      map(this.extractResponseData),
      tap(user => this.setUser(user)),
      catchError(this.handleError)
    );
  }

  deleteOneUser(): Observable<any> {
    return this.http.delete(`${apiUrl}users/${this.getUser().Username}`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken()}`
        }
      )
    }).pipe(
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.'));
  }

  setAllMovies(movies: IMovie[]):void {
    this.allMovies = movies;
    localStorage.setItem('allmovies', JSON.stringify(movies));
  }
  getAllMovies(): IMovie[] {
    return this.allMovies.length ? this.allMovies : JSON.parse(localStorage.getItem('allmovies') || '[]') as IMovie[];
  }
  setUser(user: IUser):void {
    this.user = user;
    this.favoriteIds = user.FavoriteMovies;
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUser(): IUser {
    return this.user || JSON.parse(localStorage.getItem('user') || '{}') as IUser
  }
  setToken(token: string):void {
    this.token = token
    localStorage.setItem('token', token);
  }
  getToken(): string {
    return this.token || localStorage.getItem('token') || '';
  }
}