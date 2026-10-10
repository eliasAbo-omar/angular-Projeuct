import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faPhoneAlt,
  IconDefinition,
  faEnvelope,
  faLocation,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [FaIconComponent],
  selector: 'app-content',
  styleUrl: './content.scss',
  templateUrl: './content.html',
})
export class Content {
  content: string = 'التواصل معنا';

  selectedOption: string = 'left';

  phone: IconDefinition = faPhoneAlt;
  email: IconDefinition = faEnvelope;
  road: IconDefinition = faLocation;

  selectOption(option: string) {
    this.selectedOption = option;
  }
}
