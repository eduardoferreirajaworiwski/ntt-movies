import { Component, Input, OnInit } from '@angular/core';
import { MovieRequest } from 'src/app/shared/models/MovieRequest';
import { FavoritesService } from 'src/app/shared/services/favorites.service';

@Component({
  selector: 'app-movie-cards',
  templateUrl: './movie-cards.component.html',
  styleUrls: ['./movie-cards.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie!: MovieRequest; // Entrada de dados do filme
  public isFavorite: boolean = false; // Estado do favorito

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.isFavorite = this.favoritesService.isFavorite(this.movie.imdbID);
  }

  public toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      this.favoritesService.addFavorite(this.movie);
    } else {
      this.favoritesService.removeFavorite(this.movie.imdbID);
    }
  }
}
