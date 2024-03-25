import { Component, OnInit } from '@angular/core';
import { ApiMoviesService } from 'src/app/shared/services/api-movies.service';
import { MovieRequest } from 'src/app/shared/models/MovieRequest';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { FavoritesService } from 'src/app/shared/services/favorites.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  public noResultsFound: boolean = false;
  public searchedTerm: string = '';
  public searchMovie: MovieRequest[] = [];
  public isLoading: boolean = false;

  constructor(
    private apiMoviesService: ApiMoviesService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    // Optional: Perform any initial actions here
  }

  public search(): void {
    if (this.searchedTerm.trim() !== '') {
      this.isLoading = true;
      this.apiMoviesService.getMoviesByTitle(this.searchedTerm)
        .pipe(
          catchError(error => {
            console.error('Error fetching movies:', error);
            this.isLoading = false;
            this.searchMovie = []; // Reset search results
            this.noResultsFound = true; // Set noResultsFound to true
            return EMPTY;
          })
        )
        .subscribe(
          (movies: MovieRequest[]) => {
            this.searchMovie = movies;
            this.noResultsFound = this.searchMovie.length === 0; // Update noResultsFound based on search results
            this.isLoading = false;
          }
        );
    } else {
      this.searchMovie = []; // Reset search results
      this.noResultsFound = false; // Reset noResultsFound if search term is empty
    }
  }
  

  // Check if movie is a favorite
  public isFavorite(imdbID: string): boolean {
    return this.favoritesService.isFavorite(imdbID);
  }

  // Add movie to favorites
  public addToFavorites(movie: MovieRequest): void {
    this.favoritesService.addFavorite(movie);
  }

  // Remove movie from favorites
  public removeFromFavorites(imdbID: string): void {
    this.favoritesService.removeFavorite(imdbID);
  }
}
