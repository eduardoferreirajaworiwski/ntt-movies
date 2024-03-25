import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieRequest } from 'src/app/shared/models/MovieRequest';
import { ApiMoviesService } from 'src/app/shared/services/api-movies.service';
import { EMPTY, catchError } from 'rxjs'; // Import catchError and EMPTY

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  public movie: MovieRequest | undefined;
  public isLoading: boolean = false;
  public errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Inject Router for error handling navigation
    private apiMoviesService: ApiMoviesService
  ) {}

  ngOnInit(): void {
    this.isLoading = true; // Set loading state initially

    this.route.paramMap.subscribe(params => {
      const movieId = params.get('id');
      if (movieId) {
        this.apiMoviesService.getMovieById(movieId)
          .pipe(
            catchError(error => {
              this.isLoading = false;
              this.errorMessage = 'An error occurred while fetching movie details.'; // Set error message
              console.error('Error fetching movie details:', error);
              // Optionally redirect to an error page using this.router.navigate(['/error'])
              return EMPTY; // Return an empty observable to stop the subscription chain
            })
          )
          .subscribe(
            (movie: MovieRequest) => {
              this.movie = movie;
              this.isLoading = false;
            }
          );
      } else {
        this.isLoading = false;
        this.errorMessage = 'Invalid movie ID provided.'; // Set error message for missing ID
        // Optionally redirect to a not found page using this.router.navigate(['/not-found'])
      }
    });
  }
}
