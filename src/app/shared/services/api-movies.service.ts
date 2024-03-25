import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/app/environment/environment';
import { FavoritesService } from './favorites.service';
import { MovieRequest } from '../models/MovieRequest';

@Injectable({
  providedIn: 'root'
})
export class ApiMoviesService {
  private readonly baseUrl: string = environment.apiUrl;
  private readonly apiKey: string = environment.apiKey;

  constructor(
    private http: HttpClient,
    private favoritesService: FavoritesService
  ) { }

  loadFavoriteMovies(): Observable<MovieRequest[]> {
    const favoriteIds: string[] = this.favoritesService.getFavoriteMovies();
    const requests = favoriteIds.map(id => this.getMovieById(id));
    return forkJoin(requests);
  }

  public getMoviesByTitle(title: string): Observable<MovieRequest[]> {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&s=${title}`;
    return this.http.get<any>(url)
      .pipe(
        map(response => this.mapMovies(response.Search as MovieRequest[]))
      );
  }

  public getMovieById(id: string): Observable<MovieRequest> {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&i=${id}`;
    return this.http.get<MovieRequest>(url);
  }

  public getRandomMovies(): Observable<MovieRequest[]> {
    const randomTitles = [
      'matrix', 'star wars', 'game of thrones', 'harry potter', 'inception', 'interstellar', 'stranger things', 
      'breaking bad', 'the godfather', 'back to the future', 'blade runner', 'jurassic park', 'the matrix', 
      'forrest gump', 'the lord of the rings', 'the dark knight', 'pulp fiction', 'fight club', 
      'the shawshank redemption', 'the silence of the lambs', 'the lion king', 'titanic', 
      'eternal sunshine of the spotless mind', 'the great gatsby', 'the wizard of oz', 'citizen kane', 
      'gone with the wind', 'casablanca', 'psycho', 'goodfellas'
    ];

    const randomIndex = Math.floor(Math.random() * randomTitles.length);
    const randomTitle = randomTitles[randomIndex];

    return this.getMoviesByTitle(randomTitle);
  }

  private mapMovies(movies: MovieRequest[]): MovieRequest[] {
    const favoriteMovieIds = this.favoritesService.getFavoriteMovies();
    return movies.map(movie => ({
      ...movie,
      isFavorite: favoriteMovieIds.includes(movie.imdbID)
    }));
  }
}
