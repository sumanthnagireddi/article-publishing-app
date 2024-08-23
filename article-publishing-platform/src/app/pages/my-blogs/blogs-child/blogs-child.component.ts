import { Component, effect, inject, input } from '@angular/core';
import { ArticleServiceService } from '../../../services/article-service.service';
import { ArticleCardComponent } from '../../../components/article-card/article-card.component';
import { NgFor, NgIf } from '@angular/common';
import { NoDataComponent } from '../../../components/no-data/no-data.component';
import { Store } from '@ngrx/store';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { OnlinePublishingService } from '../../../services/online-publishing.service';

@Component({
  selector: 'app-blogs-child',
  standalone: true,
  imports: [ArticleCardComponent, NgFor, NgIf, NoDataComponent],
  templateUrl: './blogs-child.component.html',
  styleUrl: './blogs-child.component.css'
})
export class BlogsChildComponent {
  category: any = input<string>();
  articles: any = []
  publishedArticles: any = []
  articleService = inject(OnlinePublishingService)
  loggedUser$: any
  store$ = inject(Store<{ loggedUser: String }>)
  constructor() {
    effect(() => {
      this.getArticles(this.category());
    })
  }
  ngOnInit(): void {

  }
  getArticles(category: any) {
    this.store$.select('loggedUser').subscribe(user => {
      this.loggedUser$ = user?.user
      if(user?.user){
        this.articleService.getAllArticlesByLoggedInUser(category, this.loggedUser$?.userUid).subscribe(data => {
          console.log(data);
          this.articles = data?.flat()
        })
      }
    })

  }
}
