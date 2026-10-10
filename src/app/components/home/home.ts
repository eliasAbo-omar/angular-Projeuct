import { Component } from '@angular/core';
import { Content } from '../content/content';

@Component({
  imports: [Content],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {}
