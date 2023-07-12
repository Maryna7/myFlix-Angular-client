import { Pipe, PipeTransform } from '@angular/core';
import {IMovie} from "../types";

@Pipe({
  name: 'filterProducts'
})
export class FilterMoviesPipe implements PipeTransform {
  transform(allMovies: IMovie[], favoriteIds: string[]): IMovie[] {
    return allMovies.filter(movie => favoriteIds.includes(movie._id));
  }
}
