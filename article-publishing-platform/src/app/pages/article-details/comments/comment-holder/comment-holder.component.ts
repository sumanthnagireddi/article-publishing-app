import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, effect, EventEmitter, input, Output, ViewChild } from '@angular/core';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'app-comment-holder',
  standalone: true,
  imports: [NgIf, NgFor, JsonPipe, CommentFormComponent],
  templateUrl: './comment-holder.component.html',
  styleUrl: './comment-holder.component.css'
})
export class CommentHolderComponent {
  comment: any = input();
  isReplying: boolean = false;
  replyingId: any;
  showReplies: boolean = false;
  @ViewChild('CommentFormComponent') commentForm = CommentFormComponent;
  @Output()exportCommentdata=new EventEmitter<any>();
  constructor(){
    effect(()=>{
      console.log(this.comment());
      
    })
  }
  ngOnInit() {
  }
  handleReply(id: any) {
    this.isReplying = !this.isReplying;
    this.replyingId = id;
  }
  getFormData(data:any){
    this.exportCommentdata.emit(data);
     this.isReplying = false;
    this.replyingId = ''
  }

}
