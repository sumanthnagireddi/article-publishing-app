import { Component, effect, inject, input, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ArticleServiceService } from '../../services/article-service.service';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { OnlinePublishingService } from '../../services/online-publishing.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ArticleCardComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  currentTab = signal<string>('Home');
  tabNames: string[] = ['Home', 'About', 'Following']
  articleService = inject(OnlinePublishingService)
  loggedUser$: any
  store$ = inject(Store<{ loggedUser: String }>)
  myDetails: any
  myArticles: any = []
  constructor() {

  }
  ngOnInit(): void {
    this.getMyDetails()
  }
  updateCurrentTab(tab: string) {
    this.currentTab.set(tab)

  }
  getMyDetails() {
    this.store$.select('loggedUser').subscribe(user => {
      if (user) { }
      this.loggedUser$ = user?.user
      if (this.loggedUser$?.userUid) {
        this.articleService.getMyAccount(this.loggedUser$?.userUid).subscribe(data => {
          this.myDetails = data
          if (data.articles) {
            this.articleService.getArticlesByIds('published', data.articles).subscribe(data => {
              this.myArticles = data?.flat()
            })
          }
        })

      }

    });
  }

  getArticles() {
    this.store$.select('loggedUser').subscribe(user => {
      this.loggedUser$ = user?.user
      this.articleService.getAllArticlesByLoggedInUser(
        'published', this.loggedUser$?.uid).subscribe(data => {
          console.log(data);
          // this.articles = data
        })
    })

  }
}
