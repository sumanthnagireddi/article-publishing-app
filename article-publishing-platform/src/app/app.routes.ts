import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { AuthorDetailsComponent } from './pages/author-details/author-details.component';
import { DiscoverHomeComponent } from './pages/discover/discover-home/discover-home.component';
import { ArticleDetailsComponent } from './pages/article-details/article-details.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { MyBlogsComponent } from './pages/my-blogs/my-blogs.component';
import { BlogsChildComponent } from './pages/my-blogs/blogs-child/blogs-child.component';
import { SavedComponent } from './pages/saved/saved.component';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { LayoutComponent } from './pages/layout/layout.component';
import { RouteGuard } from './auth/guards/route.guard';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent,  children: [
            { path: '', component: HomeComponent },
            { path: 'create-post', component: CreatePostComponent },

            {
                path: 'discover', component: DiscoverComponent, canActivateChild: [AuthGuard], children:
                    [
                        { path: '', component: DiscoverHomeComponent },
                        { path: 'author-details/:id', component: AuthorDetailsComponent },
                        { path: 'article-details/:articleName/:views', component: ArticleDetailsComponent }
                    ]
            },
            {
                path: 'me', component: MyBlogsComponent, children:
                    [
                        { path: 'blogs/:category', component: BlogsChildComponent },
                        { path: 'saved', component: SavedComponent },
                        { path: 'account', component: AccountComponent },
                    ]
            },
        ]
    },
    { path: 'login', component: LoginComponent, },
    { path: 'register', component: RegisterComponent, },
    // { path: '**', redirectTo: 'login' }
];
