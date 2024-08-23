import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthenticationService } from '../../services/authentication.service';

export const RouteGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const authService = inject(AuthenticationService);
    if (authService.isLoggedIn()) {
        router.navigate(['/'])
        return true
    }
    return false
};