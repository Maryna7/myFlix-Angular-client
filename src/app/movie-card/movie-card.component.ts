import { Component, Input } from '@angular/core';
import { Director, IMovie } from "../types";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatDialog } from "@angular/material/dialog";
import { CardInfoModalComponent } from "../card-info-modal/card-info-modal.component";

/**
 * Component for displaying movie cards.
 */
@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
    /**
     * The array of movies to be displayed.
     */
    @Input() movies: IMovie[] = [];

    /**
     * Creates an instance of MovieCardComponent.
     * @constructor
     * @param {FetchApiDataService} fetchApiData - The FetchApiDataService used to fetch movie data.
     * @param {MatDialog} dialog - The MatDialog used for opening the card info modal.
     */
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialog: MatDialog,
    ) {}

    /**
     * Opens the movie description modal for the selected movie.
     * @param {string} title - The title of the selected movie.
     * @memberof MovieCardComponent
     * @returns {void}
     */
    openMovieDescription(title: string) {
        this.fetchApiData.getOneMovie(title).subscribe((resp) => {
            this.dialog.open(CardInfoModalComponent, {
                width: '500px',
                data: {
                    title: ['Movie title', resp.Title],
                    description: [
                        ['Director', resp.Director.Name],
                        ['Genre', resp.Genre.Name],
                        ['Description', resp.Genre.Description]
                    ]
                }
            });
        });
    }

    /**
     * Opens the genre info modal for the selected genre.
     * @param {string} genreName - The name of the selected genre.
     * @memberof MovieCardComponent
     * @returns {void}
     */
    openGenre(genreName: string) {
        this.fetchApiData.getOneGenre(genreName).subscribe((resp) => {
            this.dialog.open(CardInfoModalComponent, {
                width: '500px',
                data: {
                    title: ['Genre', resp.Name],
                    description: [['Description', resp.Description]]
                }
            });
        });
    }

    /**
     * Opens the director info modal for the selected director.
     * @param {string} directorName - The name of the selected director.
     * @memberof MovieCardComponent
     * @returns {void}
     */
    openDirector(directorName: string) {
        this.fetchApiData.getOneDirector(directorName).subscribe((resp) => {
            this.dialog.open(CardInfoModalComponent, {
                width: '500px',
                data: {
                    title: ['Director', resp.Name],
                    description: [['Birthday', resp.Birth],['Biography', resp.Bio]]
                }
            });
        });
    }

    /**
     * Handles the click event for adding or removing a movie from the wishlist.
     * @param {string} id - The ID of the selected movie.
     * @memberof MovieCardComponent
     * @returns {void}
     */
    clickWishlist (id:string) {
        if (this.fetchApiData.favoriteIds.includes(id)) {
            this.fetchApiData.removeFavoriteMovie(id).subscribe(() => {});
        } else {
            this.fetchApiData.addFavoriteMovie(id).subscribe(() => {});
        }
    }
}