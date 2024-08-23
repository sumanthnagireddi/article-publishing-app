import { DatePipe } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css',
})
export class FeaturedComponent {
  featuredData = input<any>();
  router = inject(Router)
  constructor() {
    effect(() => {
      // console.log(this.featuredData());
    })
  }
  ngOnInit(): void {
    this.readingTime()
  }
  readingTime() {
    const wpm = 300;
    const words = this.featuredData()?.title.trim().split(/\s+/).length + this.featuredData()?.editorContent.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time
  }
  navigate(title: string) {
    this.router.navigate(['discover', 'article-details', title?.toLowerCase().replace(/ /g, '-')])
  }
  navigateToAuthorPage(author: string) {
    this.router.navigate(['discover', 'author-details', author?.toLowerCase().replace(/ /g, '-')])
  }
}
