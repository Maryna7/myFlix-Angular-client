import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Angular component for displaying all movies.
 */
@Component({
    selector: 'app-all-movies',
    templateUrl: './all-movies.component.html',
})
export class AllMoviesComponent {
    /**
     * Creates an instance of AllMoviesComponent.
     * @constructor
     * @param {FetchApiDataService} fetchApiData - The FetchApiDataService used to fetch movie data.
     */
    constructor(public fetchApiData: FetchApiDataService) { }

    /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     */
    ngOnInit(): void {
        this.fetchApiData.fetchAllMovies().subscribe();
    }
}