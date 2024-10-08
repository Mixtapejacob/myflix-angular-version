import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchMovies: UserRegistrationService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  //navigate to profile
  navigateToUserProfile(): void {
    this.router.navigate(['/user-profile']);
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  addToFavorites(movie: any): void {
    this.fetchMovies.addFavoriteMovies(movie).subscribe((resp: any) => {
      const user = JSON.parse(localStorage.getItem('user') || '');
      user.FavoriteMovies.push(movie.Title);
      localStorage.setItem('user', JSON.stringify(user));
      this.snackBar.open('Movie added to favorites!', 'OK', {
        duration: 2000,
      });
    });
  }

  removeFromFavorites(movie: any): void {
    this.fetchMovies.deleteFavoriteMovies(movie).subscribe((resp: any) => {
      const user = JSON.parse(localStorage.getItem('user') || '');
      user.FavoriteMovies = user.FavoriteMovies.filter(
        (title: string) => title !== movie.Title
      );
      localStorage.setItem('user', JSON.stringify(user));
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
    });
  }

  showGenre(movie: any): void {
    alert(`Name: ${movie.Genre.Name}
    Description:  ${movie.Genre.Description}`);
  }

  showDirector(movie: any): void {
    alert(`Name: ${movie.Director.Name}
    Bio:  ${movie.Director.Bio}
    Birth:  ${movie.Director.Birth}
    Death:  ${movie.Director.Death}`);
  }

  /**
   * @param {any} movie
   * @return {void}
   * This function shows the synopsis
   */
  showSynopsis(movie: any): void {
    alert(`Synopsis: Description:  ${movie.Description}`);
  }
}
