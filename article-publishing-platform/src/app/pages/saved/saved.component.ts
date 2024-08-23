import { Component, inject, OnInit } from '@angular/core';
import { ArticleServiceService } from '../../services/article-service.service';
import { NgFor, NgIf } from '@angular/common';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { NoDataComponent } from '../../components/no-data/no-data.component';
import { forkJoin } from 'rxjs';
import { Store } from '@ngrx/store';
import { OnlinePublishingService } from '../../services/online-publishing.service';

@Component({
  selector: 'app-saved',
  standalone: true,
  imports: [NgIf, NgFor, ArticleCardComponent, NoDataComponent],
  templateUrl: './saved.component.html',
  styleUrl: './saved.component.css'
})
export class SavedComponent implements OnInit {
  articleService = inject(OnlinePublishingService);
  savedArticleIds: any = []
  savedArticles: any = []
  store$ = inject(Store<{ loggedUser: String }>)
  loggedUser$: any
  ngOnInit(): void {

    this.getData()
  }
  getData() {
    this.store$.select('loggedUser').subscribe(user => {
      this.loggedUser$ = user?.user
      if (this.loggedUser$) {
        this.articleService.getAllSavedArticlesByLoggedInUser('published', this.loggedUser$?.userUid).subscribe((data: any) => {
          this.savedArticles=data?.flat()
        })
      } else {
        // alert("no data")
      }
    })
  }

}
