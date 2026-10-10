import { Component, effect, OnInit, signal, WritableSignal } from '@angular/core';
import { MenuService } from '../../services/menu-service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-menu',
  styleUrl: './menu.scss',
  templateUrl: './menu.html',
})
export class Menu implements OnInit {
  products$!: Observable<any>;
  menuForm!: FormGroup;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.products$ = this.menuService.getData();
    this.menuForm = new FormGroup({});

    this.products$.subscribe((items: any[]) => {
      const group: { [key: string]: FormControl } = {};

      items.forEach((item: any) => {
        const itemId = item.size;

        itemId.forEach((size: any) => {
          if (item.selection && Array.isArray(item.selection)) {
            item.selection.forEach((selection: any) => {
              const controlName = `${size.name}-${selection.formControlName}`;
              const value = selection.defaultValue || false;
              group[controlName] = new FormControl(value);
            });
          }
        });
      });

      this.menuForm = new FormGroup(group);

      items.forEach((item: any) => {
        const itemId = item.size;

        itemId.forEach((size: any) => {
          const creamKey = `${size.name}-cream`;
          const blackCuminKey = `${size.name}-blackCumin`;

          this.menuForm.get(creamKey)?.valueChanges.subscribe((isCreamSelected) => {
            const blackCuminControl = this.menuForm.get(blackCuminKey);
            if (isCreamSelected) {
              blackCuminControl?.disable();
              blackCuminControl?.setValue(false);
            } else {
              blackCuminControl?.enable();
            }
          });
        });
      });
    });
  }

  onSubmit() {
    if (this.menuForm.status === 'VALID') {
      console.log('done');
    }
  }
}
