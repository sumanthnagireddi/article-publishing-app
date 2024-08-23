import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { LoaderService, ToastType } from '../../../utilities/loader.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthenticationService);
  private toastService=inject(LoaderService)
  router=inject(Router)

  loginWithProvider(provider:string){
    this.authService.loginWithProvider(provider).subscribe(res=>{
      if (res) {
        this.toastService.addToToast({ type: ToastType.success, message: `Welcome To Online Publishing Platform ${res?.user?.displayName || res?.user?.email}` })
        this.router.navigate(['/'])
      }
    })
  }
}
