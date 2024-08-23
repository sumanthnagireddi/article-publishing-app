import { DatePipe, NgFor } from '@angular/common';
import { Component, effect, inject, input, OnInit } from '@angular/core';
import { ReaderCardComponent } from '../../components/reader-card/reader-card.component';
import { SidebarModule } from 'primeng/sidebar';
import { CommentsComponent } from "./comments/comments.component";
import { ArticleServiceService } from '../../services/article-service.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { filter, map, take, tap } from 'rxjs';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { OnlinePublishingService } from '../../services/online-publishing.service';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [NgFor, ReaderCardComponent, SidebarModule, CommentsComponent, DatePipe],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css'
})
export class ArticleDetailsComponent implements OnInit {
  articleName = input<string>();
  title: any;
  sidebarVisible2: boolean = false
  readersChoices: any = []
  currentData: any;
  editorContent: any
  articleService = inject(OnlinePublishingService)
  sanitizer = inject(DomSanitizer)
  views = input<any>()
  constructor() {
    effect(() => {
      this.getData(this.articleName());
    })
  }
  ngOnInit(): void {
    this.articleService.handlePageViews(this.articleName())
  }
  getData(id: any) {
    this.articleService.getArticleById('published', id).subscribe(data => {
      this.currentData = data[0];
      this.editorContent = this.transformHtml()
      this.articleService.getAllArticles().subscribe((articles: any[]) => {
        this.readersChoices = articles
      });
    })


  }
  transformHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.currentData?.editorContent);
  }
  openComments() {
    this.sidebarVisible2 = true
  }
}
