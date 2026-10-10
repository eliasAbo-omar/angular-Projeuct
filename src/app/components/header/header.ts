import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PathLink } from '../../services/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterLink, CommonModule],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  Links: PathLink[] = [
    { name: 'home', path: '' },
    { name: 'menu', path: '/menu' },
    { name: 'new', path: '/new' },
    { name: 'profile', path: '/profile' },
    { name: 'about us', path: '/about' },
  ];

  srcImage: string = 'logo.png';
}
