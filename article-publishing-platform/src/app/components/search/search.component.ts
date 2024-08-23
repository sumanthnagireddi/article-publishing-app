import { CommonModule, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticleServiceService } from '../../services/article-service.service';
import { OnlinePublishingService } from '../../services/online-publishing.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  width = input(400);
  showSearchIcon: boolean = true
  searchValue: any
  showCOntent: boolean = false
  showDropdown: boolean = false;
  currentValue: string = 'Articles';
  articles: any = [];
  authors: any = [];
  filteredItems: any = []
  dropdownMenu: string[] = ['Articles', 'Authors', 'Tags']
  articleService = inject(OnlinePublishingService)
  keyInput(event: any) {
    if (this.searchValue) {
      this.showCOntent = true;
      this.showDropdown = false
      this.search()
    } else {
      this.showCOntent = false;
      this.showDropdown = false
    }
  }

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe(data => {
      this.articles = data
    })
    // this.articleService.getAllAuthors().subscribe(data => {
    //   this.authors = data
    // })
  }
  setCurrentSelector(selector: string) {
    this.currentValue = selector
    this.showDropdown = false
  }

  search() {
    this.filteredItems = this.articles.filter((element: any) => {
      const searchValue = this.searchValue.toLowerCase();
      if (this.currentValue === 'Articles') {
        return (
          element?.title?.toLowerCase().includes(searchValue) ||
          element?.description?.toLowerCase().includes(searchValue)
        );
      } else if (this.currentValue === 'Authors') {
        return (
          element?.author?.toLowerCase().includes(searchValue)
        );
      } else if (this.currentValue === 'Tags') {
        return (
          element?.tags?.toLowerCase().includes(searchValue)
        );
      }
    });

  }
}
