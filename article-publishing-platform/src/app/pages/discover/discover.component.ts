import { Component } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { NgFor } from '@angular/common';
import { ReaderCardComponent } from '../../components/reader-card/reader-card.component';
import { AuthorCardComponent } from '../../components/author-card/author-card.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [SearchComponent,NgFor,ReaderCardComponent,AuthorCardComponent,RouterOutlet],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.css'
})
export class DiscoverComponent {
  keyWords:any=['Science','sci-fi'];
  readersChoices:any=Array(4)
}
