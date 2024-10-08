import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  userData: any = {};
  favoriteMovies: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router
  ) {
    this.userData = JSON.parse(localStorage.getItem('user') || '');
  }

  ngOnInit(): void {
    this.getUser();
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (res: any) => {
        this.userData = {
          ...res,
          id: res._id,
          password: this.userData.password,
          token: this.userData.token,
        };
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.getfavoriteMovies();
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  getfavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (res: any) => {
        this.favoriteMovies = res.filter((movie: any) => {
          return this.userData.FavoriteMovies.includes(movie._id);
        });
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  getUser(): void {
    /*this.fetchApiData.getUser().subscribe((res: any) => {
      this.userData = {
        ...res,
        id: res._id,
        password: this.userData.password,
        token: this.userData.token,
      };*/
    this.userData = this.fetchApiData.getUser();
    localStorage.setItem('user', JSON.stringify(this.userData));
    this.getfavoriteMovies();
  }

  removeFromFavorite(movie: any): void {
    this.fetchApiData.deleteFavoriteMovies(movie).subscribe(
      (res: any) => {
        this.userData.favoriteMovies = res.favoriteMovies;
        this.getfavoriteMovies();
      },
      (err: any) => {
        console.error(err);
      }
    );
  }
}
