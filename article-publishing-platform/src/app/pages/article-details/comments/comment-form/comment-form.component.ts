import { NgIf } from '@angular/common';
import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticleServiceService } from '../../../../services/article-service.service';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css',
})
export class CommentFormComponent {
  showProfile = input(true);
  isNestedComment = input<boolean>();
  parentId = input<string>();
  comment: any;
  @Output() exportComment = new EventEmitter<any>();
  @Output() closeForm = new EventEmitter<any>()
  submitComment() {
    // console.log({
    //   body: this.comment,
    //   parentId: this.isNestedComment() && this.parentId() ? this.parentId() : null,
    // });
    
    this.exportComment.emit({
      body: this.comment,
      parentId: this.isNestedComment() && this.parentId() ? this.parentId() : null,
    });
  }
}
