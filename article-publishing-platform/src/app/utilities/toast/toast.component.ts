import { Component, inject, OnInit } from '@angular/core';
import { ArticleServiceService } from '../../services/article-service.service';
import { LoaderService } from '../loader.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgFor,NgIf,NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit {
  private toastService=inject(LoaderService);
  toast:any

  ngOnInit(): void {
    this.toastService.toastSubject$.subscribe((data:any)=>{
      this.toast=data
    })
  }
  ngOnDestroy(): void {
    
  }
}
