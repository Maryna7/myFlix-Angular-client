import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
})
export class AllMoviesComponent {
  movies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.fetchApiData.fetchAllMovies().subscribe();
  }
}
