import { ChangeDetectorRef, Component } from '@angular/core';
import { Header } from '../header/header';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../services/interfaces';
import { CommonModule } from '@angular/common';
import { db } from '../../services/firbase.config';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';
import { setCookie, getCookie, deleteCookie } from '../../services/cookieSitting';

@Component({
  imports: [Header, ReactiveFormsModule, CommonModule],
  selector: 'app-sign-up',
  styleUrl: './sign-up.scss',
  templateUrl: './sign-up.html',
})
export class SignUp {
  pattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

  currentUser: string = '';
  userExistsValue: boolean = false;
  emailExistsValue: boolean = false;

  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  userInfo = new FormGroup(
    {
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      img: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator },
  );

  passwordMatchValidator(g: any) {
    return g.get('password')?.value === g.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;

        this.userInfo.patchValue({ img: reader.result as string });
        this.userInfo.get('img')?.markAsTouched();

        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    try {
      if (this.userInfo.invalid) return;

      const formData = this.userInfo.value;
      let imageUrl = '';

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(formData.password || '', salt);

      const refData = collection(db, 'users');
      const newUserId = doc(refData);
      const generatedId = newUserId.id;

      const newUser: User = {
        id: generatedId,
        uid: generatedId,
        userName: formData.userName || '',
        email: formData.email || '',
        password: hashedPassword,
        confirmPassword: hashedPassword,
        gender: formData.gender || '',
        img: formData.img || '',
        createdAt: new Date(),
      };

      this.currentUser = generatedId;
      localStorage.setItem('currentUser', this.currentUser);

      await setDoc(newUserId, newUser);

      setCookie('UserId', generatedId, 365, '/');
      setCookie('UserName', formData.userName || '', 365);

      this.router.navigate([''], { queryParams: { id: generatedId, userName: formData.userName } });
    } catch (error) {
      console.log(error);
    }
  }

  async checkFieldExists(field: 'userName' | 'email', value: string): Promise<boolean> {
    if (!value) return false;
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where(field, '==', value));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }
}
