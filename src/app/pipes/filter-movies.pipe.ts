import { Pipe, PipeTransform } from '@angular/core';
import { IMovie } from "../types";

/**
 * Custom pipe for filtering movies based on favorite movie IDs.
 */
@Pipe({
    name: 'filterProducts'
})
export class FilterMoviesPipe implements PipeTransform {
    /**
     * Transforms the list of all movies by filtering them based on favorite movie IDs.
     * @param {IMovie[]} allMovies - The array of all movies.
     * @param {string[]} favoriteIds - The array of favorite movie IDs.
     * @returns {IMovie[]} The filtered list of movies.
     */
    transform(allMovies: IMovie[], favoriteIds: string[]): IMovie[] {
        return allMovies.filter(movie => favoriteIds.includes(movie._id));
    }
}
