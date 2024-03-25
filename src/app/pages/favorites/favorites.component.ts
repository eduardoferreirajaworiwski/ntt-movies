import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/shared/services/favorites.service';
import { ApiMoviesService } from 'src/app/shared/services/api-movies.service';
import { MovieRequest } from 'src/app/shared/models/MovieRequest';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteMovies: MovieRequest[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private apiMoviesService: ApiMoviesService
  ) { }

  ngOnInit(): void {
    this.loadFavoriteMovies();
  }

  loadFavoriteMovies(): void {
    const favoriteMovieIds = this.favoritesService.getFavoriteMovies();
    if (favoriteMovieIds.length === 0) {
      this.favoriteMovies = [];
      return;
    }

    const observables = favoriteMovieIds.map(id => this.apiMoviesService.getMovieById(id));
    forkJoin(observables).subscribe(
      movies => {
        this.favoriteMovies = movies.filter(movie => movie); // Remova filmes nulos
      }
    );
  }

  removeFromFavorites(imdbID: string): void {
    this.favoritesService.removeFavorite(imdbID);
    this.favoriteMovies = this.favoriteMovies.filter(movie => movie.imdbID !== imdbID);
  }
}
