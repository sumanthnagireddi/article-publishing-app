import { Component, inject } from '@angular/core';
import { ArticleCardComponent } from "../../components/article-card/article-card.component";
import { FeaturedComponent } from "../../components/featured/featured.component";
import { BLOGS } from '../../services/blogs';
import { NgClass, NgFor } from '@angular/common';
import { interval, map, timer } from 'rxjs';
import { ArticleServiceService } from '../../services/article-service.service';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OnlinePublishingService } from '../../services/online-publishing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ArticleCardComponent, FeaturedComponent, NgFor, NgClass, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  popular_blogs: any;
  selectedId: string = '';
  currentFeaturedBlog: any
  source$ = timer(0, 5000);
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  currentItems: any = []
  articleService = inject(OnlinePublishingService)
  store = inject(Store);
  currentuser: any
  ngOnInit(): void {
    this.getArticles()
  }
  getArticles() {
    this.store.select('loggedUser').subscribe(data => {
      console.log(data);
      
      if (data?.user) {
        this.currentuser = data?.user
        this.articleService.getAllArticles().subscribe(data => {
          console.log(data);
          
          this.popular_blogs = data
          this.totalPages = Math.ceil(this.popular_blogs.length / this.pageSize);
          this.loadItems()
          // todo 
            // pick based on most viewed and most commented...
          this.source$.pipe(
            map(() => this.popular_blogs?.[Math.floor(Math.random() * this.popular_blogs?.length)]),
          ).subscribe(data => {
            this.currentFeaturedBlog = data
          })
        })
      }
    })

  }
  greet() {
    const time = new Date();
    const hours = time.getHours();
    if (hours < 12) {
      return `Good Morning`
    } else if (hours < 18) {
      return 'Good Afternoon'
    } else {
      return 'Good Evening'
    }
  }

  loadItems() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentItems = this.popular_blogs.slice(start, end);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadItems();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadItems();
    }
  }
  getToValue() {
    return Math.min(this.currentPage * this.pageSize, this.popular_blogs?.length)
  }
}
