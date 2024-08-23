import { HttpClient } from '@angular/common/http';
import { inject, Injectable, NgZone } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAdditionalUserInfo,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from '@angular/fire/auth';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { login, logout } from '../store/userData.actions';
import { LoaderService, ToastType } from '../utilities/loader.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebase = inject(Auth);
  firestore = inject(Firestore);
  private toastService = inject(LoaderService)
  private store = inject(Store<{ loggedUser: string }>)
  private router = inject(Router)
  UserData: any;
  constructor() {
    this.firebase.onAuthStateChanged((user) => {
      if (user) {
        this.UserData = user;
        localStorage.setItem('user', JSON.stringify(this.UserData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
  }
  //get Authenticated user from firebase
  getAuthenticatedUser() {
    return this.firebase.currentUser
  }

  get isUserLoggedIn(): boolean {

    return true
  }

  register(email: string, username: string, password: string): Observable<any> {
    const promise = createUserWithEmailAndPassword(this.firebase, email, password)
    return from(promise).pipe(
      map(response => {
        return updateProfile(response.user, { displayName: username }).then(() => response);
      }),
      switchMap(response => from(response)),
      catchError(error => {
        this.toastService.addToToast({ type: ToastType.error, message: error.message });
        return throwError(error)
      })
    );
  }
  loginWithGoogle(): Observable<any> {
    const promise = signInWithPopup(this.firebase, new GoogleAuthProvider());
    return new Observable(observer => {
      promise.then((result: any) => {
        const credential: any = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        sessionStorage.setItem('token', result?.user?.accessToken)
        const user = result.user;
        if (user) {
          const { displayName, email, uid, metadata } = user;
          this.createAccountInFirestore({
            displayName: displayName,
            email: email,
            userUid: uid,
            joinedOn: metadata.creationTime
          }).then(() => {
            observer.next({ user, token });
            observer.complete()
          }).catch(error => {
            observer.error(error)
          })
        } else {
          observer.error('No user information available.');
        }
      }).catch((error) => {
        observer.error(error)
      })
    })
  }
  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebase, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        if (user) {
          const { displayName, email, uid, metadata, photoURL } = user;
          this.createAccountInFirestore({
            displayName: displayName,
            email: email,
            userUid: uid,
            joinedOn: metadata.creationTime,
            photo: photoURL
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    return from(promise);
  }

  async createAccountInFirestore(payload: any) {
    const userDocRef = doc(this.firestore, 'userAccounts', payload.userUid);
    const docSnap = await getDoc(userDocRef);
    this.store.dispatch(login(payload));

    if (!docSnap.exists()) {
      await setDoc(userDocRef, payload);
      console.log('Account created successfully');
    } else {
      console.log('Account already exists');
    }
    this.router.navigate(['/'])
  }
  getAuthState(): Observable<any> {
    this.firebase.onAuthStateChanged((user) => {
      return user
    })
    return from([])

  }
}
