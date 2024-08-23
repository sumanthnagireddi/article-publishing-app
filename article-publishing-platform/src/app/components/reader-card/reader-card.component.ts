import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reader-card',
  standalone: true,
  imports: [],
  templateUrl: './reader-card.component.html',
  styleUrl: './reader-card.component.css'
})
export class ReaderCardComponent {
  data = input<any>();
  private router = inject(Router);
  
  navigate(_id: string) {
    this.router.navigate(['discover', 'article-details', _id,this.data()?.views])
  }
}
