import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Store } from '@ngrx/store';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  router = inject(Router);
  private authService = inject(AuthenticationService)
  store = inject(Store);
  current_userData: any
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.store.select('loggedUser').subscribe(data => {
      this.current_userData = data?.user;
      
    })

  }
  navigate(category: string) {
    this.router.navigate(['me', 'data', category])
  }

  logout() {
    const confirmMessage = `Are you sure you want to logout?`
    if (confirm(confirmMessage)) {
      this.authService.logout().subscribe(res => console.log(res))
    }
  }
}
