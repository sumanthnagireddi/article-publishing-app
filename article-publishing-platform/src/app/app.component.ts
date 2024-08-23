import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { AuthService } from './services/auth.service';
import { addDoc, collection, collectionData, doc, Firestore, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoaderComponent } from "./utilities/loader/loader.component";
import { LoaderService } from './utilities/loader.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { update } from '@angular/fire/database';
import { ArticleServiceService } from './services/article-service.service';
import { LoginComponent } from "./auth/components/login/login.component";
import { ToastComponent } from "./utilities/toast/toast.component";
import { Auth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { login } from './store/userData.actions';
import { OnlinePublishingService } from './services/online-publishing.service';
import { AuthenticationService } from './services/authentication.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ArticleCardComponent, NavbarComponent, SidebarComponent, LoaderComponent, NgIf, AsyncPipe, LoginComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'article-publishing-platform';
  authService = inject(AuthenticationService)
  firebase = inject(Auth)
  loaderService = inject(LoaderService)
  changeDetector = inject(ChangeDetectorRef)
  articleService = inject(OnlinePublishingService)
  articles: any;
  accesToken: any
  http=inject(HttpClient)
  private store = inject(Store<{ loggedUser: string }>)

  ngOnInit(): void {
    this.accesToken = sessionStorage.getItem('token')
    // this.authService.registerUser("dummy2@mail.com", "dummy", "123456").subscribe(data => {
    //   console.log(data);

    // })
    // this.authService.loginWithUserNameandPassword("dummy2@mail.com", "123456").subscribe(data => {
    //   console.log(data);
    // })
    this.firebase.onIdTokenChanged((id) => {
      if (id) {
        const payload = {
          displayName: id?.displayName,
          email: id?.email,
          userUid: id?.uid,
          joinedOn: id?.metadata.creationTime,
          photoUrl: id?.photoURL,
        }
        this.store.dispatch(login(payload))
      }
    })
  }
}
