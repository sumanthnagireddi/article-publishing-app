import { DatePipe, NgClass } from '@angular/common';
import { Component, effect, EventEmitter, inject, input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ArticleServiceService } from '../../services/article-service.service';
import { Store } from '@ngrx/store';
import { OnlinePublishingService } from '../../services/online-publishing.service';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [RouterModule, DatePipe, NgClass],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css'
})
export class ArticleCardComponent {
  router = inject(Router)
  data: any = input();
  isSaved: boolean = false
  @Output() refreshEvent = new EventEmitter<boolean>()
  articleService = inject(OnlinePublishingService)
  private store = inject(Store<{ loggedUser: String }>)
  constructor() {
    effect(() => {
      this.isSavedArticle(this.data()?._id)
    })
  }
  ngOnInit(): void {
    this.readingTime()
  }
  readingTime() {
    const text: any = document.getElementById("article")?.innerText;
    const wpm = 300;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time
  }
  navigate(_id: string, views: number) {
    this.router.navigate(['discover', 'article-details', _id, views])
  }
  navigateToAuthorPage(author: string) {
    this.router.navigate(['discover', 'author-details', author])
  }
  addTosave(articleId: any) {
    this.store.select('loggedUser').subscribe(data => {
      if (data?.user) {
        if (this.isSaved) {
          this.articleService.removeFromSaved(articleId, data?.user?.userUid).subscribe(data => {
            this.isSavedArticle(this.data()?._id)
            this.refreshEvent.emit(true)
          })
        } else {
          this.articleService.addToSaved(articleId, data?.user?.userUid).subscribe(data => {
            this.isSavedArticle(this.data()?._id)
            this.refreshEvent.emit(true)
          })
        }
      }
    })

  }
  isSavedArticle(id: any) {
    this.store.select('loggedUser').subscribe(data => {
      console.log(id);
      if (data?.user) {
        this.articleService.isSavedArticle('saved',data?.user?.userUid, id).subscribe(data => {
          this.isSaved = data
        })
      }
    })

  }
}
