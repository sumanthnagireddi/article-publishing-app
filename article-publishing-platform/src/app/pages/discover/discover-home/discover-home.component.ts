import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router';
import { AuthorCardComponent } from '../../../components/author-card/author-card.component';
import { ReaderCardComponent } from '../../../components/reader-card/reader-card.component';
import { SearchComponent } from '../../../components/search/search.component';
import { ArticleServiceService } from '../../../services/article-service.service';
import { OnlinePublishingService } from '../../../services/online-publishing.service';
@Component({
  selector: 'app-discover-home',
  standalone: true,
  imports: [SearchComponent, NgFor, ReaderCardComponent, AuthorCardComponent, RouterOutlet],
  templateUrl: './discover-home.component.html',
  styleUrl: './discover-home.component.css'
})
export class DiscoverHomeComponent {
  keyWords: any = ['Science', 'sci-fi'];
  authors: any = []
  readersChoices = [];
  itemsPerPage = 4;
  currentPage = 0;
  currentAuthorPage = 0
  AuthorsPerpage=4
  private articleService = inject(OnlinePublishingService);

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe(data => {
      this.readersChoices = data
    })
    this.articleService.getAllAuthors().subscribe(data => {
      this.authors = data
    })
  }
  // Articles

  get currentItems() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.readersChoices.slice(startIndex, endIndex);
  }

  get maxPage() {
    return Math.floor((this.readersChoices.length - 1) / this.itemsPerPage);
  }

  nextRow() {
    if (this.currentPage < this.maxPage) {
      this.currentPage++;
    }
  }

  prevRow() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  // authors
  get currentAuthors() {
    const startIndex = this.currentAuthorPage * this.AuthorsPerpage;
    const endIndex = startIndex + this.AuthorsPerpage;
    return this.authors.slice(startIndex, endIndex);
  }
  get authorsMaxPage() {
    return Math.floor((this.authors.length - 1) / this.AuthorsPerpage);
  }
  nextauthorsRow() {
    if (this.currentAuthorPage < this.authorsMaxPage) {
      this.currentAuthorPage++;
    }
  }
  prevAuthorsRow() {
    if (this.currentAuthorPage > 0) {
      this.currentAuthorPage--;
    }
  }


}
