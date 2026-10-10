import { inject, Injectable } from '@angular/core';
import { db, auth, analytics } from './firbase.config';
import {
  Firestore,
  addDoc,
  doc,
  collection,
  getDocs,
  onSnapshot,
  getFirestore,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { User } from './interfaces';
import { from, map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  getData(): Observable<any> {
    return new Observable((subscribe) => {
      const colRef = collection(db, 'menu');

      const unsubscribe = onSnapshot(
        colRef,
        (snapshot) => {
          const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          subscribe.next(items);
        },
        (error) => {
          subscribe.error(error);
        },
      );

      return () => unsubscribe;
    });
  }
}
