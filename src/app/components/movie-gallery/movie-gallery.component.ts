import { Component, OnInit } from '@angular/core';
import { ApiMoviesService } from 'src/app/shared/services/api-movies.service';
import { MovieRequest } from 'src/app/shared/models/MovieRequest';
import { FavoritesService } from 'src/app/shared/services/favorites.service';

@Component({
  selector: 'app-movie-gallery',
  templateUrl: './movie-gallery.component.html',
  styleUrls: ['./movie-gallery.component.scss']
})
export class MovieGalleryComponent implements OnInit {
  movies: MovieRequest[] = [];

  constructor(
    private apiMoviesService: ApiMoviesService,
    private favoritesService: FavoritesService
  ) { }

  ngOnInit(): void {
    this.getRandomMovies();
  }

  getRandomMovies(): void {
    this.apiMoviesService.getRandomMovies().subscribe(movies => {
      if (movies && movies.length > 0) {
        this.movies = movies;
      }
    });
  }

  isFav(imdbID: string): boolean {
    return this.favoritesService.isFavorite(imdbID); 
  }

  toggleFav(imdbID: string): void {
    if (this.isFav(imdbID)) {
      this.favoritesService.removeFavorite(imdbID);
    } else {
      const movie = this.movies.find(m => m.imdbID === imdbID);
      if (movie) {
        this.favoritesService.addFavorite(movie);
      }
    }
  }
}
