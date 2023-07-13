import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FilterMoviesPipe } from './pipes/filter-movies.pipe';

const appRoutes: Routes = [
    { path: 'welcome', component: WelcomePageComponent },
    { path: 'movies', component: AllMoviesComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

/**
 * Angular module for the root application.
 */
@NgModule({
    /**
     * Declarations of components, pipes, and directives in the module.
     */
    declarations: [
        AppComponent,
        MovieCardComponent,
        AllMoviesComponent,
        WelcomePageComponent,
        UserProfileComponent,
        NavBarComponent,
        FilterMoviesPipe
    ],

    /**
     * Imports of other modules required by this module.
     */
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatDialogModule,
        MatSnackBarModule,
        MatToolbarModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        MatIconModule,
        ReactiveFormsModule
    ],

    /**
     * Providers for services within the module.
     */
    providers: [],

    /**
     * The root component that Angular creates and inserts into the index.html host web page.
     */
    bootstrap: [AppComponent]
})
export class AppModule { }