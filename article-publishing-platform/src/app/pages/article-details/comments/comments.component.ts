import { Component, effect, EventEmitter, inject, input, Output, output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { CommentHolderComponent } from "./comment-holder/comment-holder.component";
import { CommentFormComponent } from "./comment-form/comment-form.component";
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid'
import { Store } from '@ngrx/store';
import { ArticleServiceService } from '../../../services/article-service.service';
import { OnlinePublishingService } from '../../../services/online-publishing.service';
interface Comment {
  _id: string;
  body: string;
  username: string;
  userId: string;
  parentId: string | null;
  createdAt: string;
  children?: Comment[];
}
@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [NgFor, CommentHolderComponent, CommentFormComponent, NgIf],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  service = inject(AuthService);
  private articleService = inject(OnlinePublishingService)
  comments: any = [];
  currentCommentId: any;
  currentArticle = input<any>()
  store$ = inject(Store<{ loggedUser: String }>)
  sort_Criteria:any='most_recent'
  @Output() commentsUpdated = new EventEmitter<any>()
  loggedUser$: any

  constructor() {
    effect(() => {
      this.store$.select('loggedUser').subscribe(user => {
        this.loggedUser$ = user.user
        // this.getComments(this.currentArticle()?._id)
        this.comments = this.handleComments(this.currentArticle()?.comments)
      })
    })
  }
  ngOnInit(): void {
  }

  getComments(id: any) {
    // this.articleService.getComments(id).subscribe((data) => {
    //   const comments: any = data
    //   this.comments = this.handleComments(comments?.comments)
    // })
  }
  handleComments(comments: Comment[]): Comment[] {

  const commentObj: any = {};
    const topLevelComments: Comment[] = [];

    comments?.forEach(comment => {
      commentObj[comment._id] = { ...comment, children: [] };
    });
    comments?.forEach(comment => {
      if (comment.parentId) {
        const parent = commentObj[comment.parentId];
        if (parent) {
          parent.children?.push(commentObj[comment._id]);
        }
      } else {
        topLevelComments.push(commentObj[comment._id]);
      }
    });
    
    return topLevelComments;

  }
  getComment(event: any) {
    const { body, parentId } = event;
    const payload = {
      "_id": uuidv4(),
      "articleId": this.currentArticle()?._id,
      "body": body,
      "username": this.loggedUser$?.displayName,
      "userId": this.loggedUser$?.userUid,
      "parentId": parentId,
      "createdAt": new Date().toDateString()
    }
    // console.log(payload);/
    this.articleService.createComment(payload).subscribe(_ => {
      // console.log("success");
      this.getComments(this.currentArticle()?._id);
      this.commentsUpdated.emit(true)
    })
  }
  filter(){

  }

}
