import { inject, Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanDeactivate,
    GuardResult,
    MaybeAsync,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Auth } from '@angular/fire/auth';
import { LoaderService, ToastType } from '../../utilities/loader.service';
import { Store } from '@ngrx/store';
import { login } from '../../store/userData.actions';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
    private store = inject(Store<{ loggedUser: string }>)
    router = inject(Router);
    authService = inject(AuthenticationService);
    firebase = inject(Auth);
    toastService = inject(LoaderService)
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this.checkAuth();
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this.checkAuth()
    }
    private checkAuth(): boolean {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['login'])
            return false
        }
        return true
        // const session_token = sessionStorage.getItem('token');
        // let user_token: any;
        // if (!session_token) {
        //     this.router.navigate(['/login']);
        //     return false;
        // }
        // try {
        //     this.firebase.onIdTokenChanged((id) => {
        //         id?.getIdToken().then((token: any) => {
        //             user_token = token;
        //             if (user_token) {
        //                 if (user_token === session_token) {
        //                     // this.toastService.addToToast({ type: ToastType.success, message: `Welcome ${id.displayName}` })
        //                     return true;
        //                 } else {
        //                     this.toastService.addToToast({ type: ToastType.error, message: `Invalid User, Please login again` })
        //                     this.router.navigate(['/login']);
        //                     return false;
        //                 }
        //             } else {
        //                 this.toastService.addToToast({ type: ToastType.error, message: `Invalid User, Please login again` })
        //                 this.router.navigate(['/login']);
        //                 return false
        //             }
        //         });
        //     });

        //     return true;
        // } catch (error) {
        //     console.error('Error verifying token:', error);
        //     this.router.navigate(['/login']);
        //     return false;
        // }
    }
}
