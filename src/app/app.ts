import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';

@Component({
  imports: [RouterOutlet, Header, Sidebar],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  constructor(private router: Router) {}

  isAuthPage(): boolean {
    const url = this.router.url;
    return url.includes('/login') || url.includes('/signup');
  }
}
