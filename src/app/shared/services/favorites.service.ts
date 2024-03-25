import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { MovieRequest } from '../models/MovieRequest';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private readonly FAVORITE_MOVIES_KEY: string = 'favoriteMovies'; // Chave de armazenamento local

  constructor(private localStorageService: LocalStorageService) { }

  public isFavorite(imdbID: string): boolean {
    const favoriteMovies: string[] = this.getFavoriteMovies();
    return favoriteMovies.includes(imdbID);
  }

  public addFavorite(movie: MovieRequest): void {
    const favoriteMovies: string[] = this.getFavoriteMovies();
    if (!favoriteMovies.includes(movie.imdbID)) {
      favoriteMovies.push(movie.imdbID);
      this.setFavoriteMovies(favoriteMovies);
      console.log('Filme adicionado aos favoritos:', movie.Title);
      console.log('Favoritos:', favoriteMovies);
    }
  }

  public removeFavorite(imdbID: string): void {
    let favoriteMovies: string[] = this.getFavoriteMovies();
    favoriteMovies = favoriteMovies.filter(id => id !== imdbID);
    this.setFavoriteMovies(favoriteMovies);
    console.log('Filme removido dos favoritos:', imdbID);
    console.log('Favoritos:', favoriteMovies);
  }

  public getFavoriteMovies(): string[] {
    const favoriteMoviesJSON = this.localStorageService.getItem(this.FAVORITE_MOVIES_KEY);
    try {
      if (favoriteMoviesJSON) {
        const favoriteMoviesArray = favoriteMoviesJSON.split(','); // Dividir a string em um array
        return favoriteMoviesArray;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Erro ao analisar o JSON de filmes favoritos:', error);
      return [];
    }
  }
  
  private setFavoriteMovies(favoriteMovies: string[]): void {
    const favoriteMoviesString = favoriteMovies.join(',');
    this.localStorageService.setItem(this.FAVORITE_MOVIES_KEY, favoriteMoviesString);
  }
}
