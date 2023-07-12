import {Component, Input} from '@angular/core';
import {Director, IMovie} from "../types";
import {FetchApiDataService} from "../fetch-api-data.service";
import {MatDialog} from "@angular/material/dialog";
import {CardInfoModalComponent} from "../card-info-modal/card-info-modal.component";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent{
  @Input() movies: IMovie[] = []
  constructor(
      public fetchApiData: FetchApiDataService,
      public dialog: MatDialog,

  ) {}

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
    })
  }

  openGenre(genreName: string) {
    this.fetchApiData.getOneGenre(genreName).subscribe((resp) => {
      this.dialog.open(CardInfoModalComponent, {
        width: '500px',
        data: {
          title: ['Genre', resp.Name],
          description: [['Description', resp.Description]]
        }
      });
    })
  }

  openDirector(directorName: string) {
    this.fetchApiData.getOneDirector(directorName).subscribe((resp) => {
    this.dialog.open(CardInfoModalComponent, {
        width: '500px',
        data: {
          title: ['Director', resp.Name],
          description: [['Birthday', resp.Birth],['Biography', resp.Bio]]
        }
      });
    })
  }

  clickWishlist (id:string) {
    if(this.fetchApiData.favoriteIds.includes(id)) {
      this.fetchApiData.removeFavoriteMovie(id).subscribe(()=>{})
    }else {
      this.fetchApiData.addFavoriteMovie(id).subscribe(()=>{})
    }
  }
}
