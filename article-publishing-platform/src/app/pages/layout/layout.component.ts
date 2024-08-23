import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Firestore } from 'firebase/firestore';
import { ArticleServiceService } from '../../services/article-service.service';
import { AuthService } from '../../services/auth.service';
import { LoaderService } from '../../utilities/loader.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../../auth/components/login/login.component';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { LoaderComponent } from '../../utilities/loader/loader.component';
import { ToastComponent } from '../../utilities/toast/toast.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, ArticleCardComponent, NavbarComponent, SidebarComponent, LoaderComponent, NgIf, AsyncPipe, LoginComponent, ToastComponent],

  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  // authService = inject(AuthService)
  loaderService = inject(LoaderService)
  articles: any;
  accesToken:any
  ngOnInit(): void {
    this.accesToken=sessionStorage.getItem('token')
  }
}
