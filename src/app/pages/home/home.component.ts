import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { MovieRequest } from 'src/app/shared/models/MovieRequest';
import { ApiMoviesService } from 'src/app/shared/services/api-movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  @ViewChild(SearchBarComponent) searchBarComponent!: SearchBarComponent;


  public movies: MovieRequest[] = [];

  constructor(private apiMoviesService: ApiMoviesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const searchTerm = params['search'];
      if (searchTerm) {
        this.searchMovies(searchTerm);
      }
    });
  }

  public handleSearch(): void {
    // Obtenha a string de pesquisa do componente SearchBar
    const searchTerm = this.searchBarComponent.searchedTerm;
    // Utilize a string de pesquisa para navegação ou chamadas à API
    this.router.navigate(['/'], { queryParams: { search: searchTerm } });
  }

  private searchMovies(searchTerm: string): void {
    this.apiMoviesService.getMoviesByTitle(searchTerm)
      .subscribe(
        (movies: MovieRequest[]) => this.movies = movies
      );
  }
}
