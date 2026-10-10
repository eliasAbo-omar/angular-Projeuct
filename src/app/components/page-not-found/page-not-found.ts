import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-page-not-found',
  styleUrl: './page-not-found.scss',
  templateUrl: './page-not-found.html',
})
export class PageNotFound {
  constructor(private router: Router) {}

  isNoHeader(): boolean {
    const url = this.router.url;
    return url.includes('/login') || url.includes('/signup');
  }
}
