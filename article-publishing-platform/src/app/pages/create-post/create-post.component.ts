import { Component, inject, input } from '@angular/core';
import { QuillConfigModule } from 'ngx-quill/config';
import { QuillEditorComponent } from 'ngx-quill';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgClass, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { ArticleServiceService } from '../../services/article-service.service';
import { Store } from '@ngrx/store';
import { OnlinePublishingService } from '../../services/online-publishing.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [QuillEditorComponent, NgIf, ReactiveFormsModule, NgClass],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  isBasicDetailsFilled: boolean = false;
  isFirstPageSubmitted = false
  articleForm!: FormGroup;
  fb = inject(FormBuilder);
  articleService = inject(OnlinePublishingService);
  router = inject(Router);
  store$ = inject(Store<{ loggedUser: String }>)
  loggedUser$: any
  currentTime = new Date()
  ngOnInit(): void {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['', Validators.required],
      articlePhoto: ['', Validators.required],
      editorContent: ['', Validators.required],
    });
    this.store$.select('loggedUser').subscribe(user => {
      this.loggedUser$ = user.user;
    })
  }
  handleContent(data: any) {
    this.articleForm.get('editorContent')?.setValue(data?.html);
  }
  uploadImages(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      this.articleForm.get('articlePhoto')?.setValue(event.target?.result);
    };
    reader.readAsDataURL(file);
  }
  removePicture() {
    this.articleForm.get('articlePath')?.setValue('');
  }
  handleNext() {
    if (
      this.articleForm.get('title')?.valid &&
      this.articleForm.get('description')?.valid &&
      this.articleForm.get('tags')?.valid &&
      this.articleForm.get('articlePhoto')?.valid
    ) {
      this.isBasicDetailsFilled = true
    } else {
      this.isFirstPageSubmitted = true;
    }
  }
  readingTime() {
    const wpm = 300;
    const words = this.articleForm.value?.title.trim().split(/\s+/).length + this.articleForm.value?.editorContent.trim().split(/\s+/).length + this.articleForm.value?.description.trim().split(/\s+/).length;;
    const time = Math.ceil(words / wpm);
    return time
  }
  handlePublishArticle() {
    const payload = {
      _id: uuidv4(),
      ...this.articleForm.value,
      authorId: this.loggedUser$?.userUid,
      author: this.loggedUser$.displayName,
      status: 'published',
      readTime: this.readingTime(),
      published: this.currentTime.toDateString(),
      updated: this.currentTime.toDateString(),
      comments:[],
      views:0
    };
    this.articleService.createArticle(payload).subscribe((data) => {
      console.log(data);
    });
  }
  getDescription() {
    return this.isBasicDetailsFilled
      ? this.articleForm.value?.description
      : 'Please fill all therequired fields';
  }
  isControlInvalid(controlName: string) {
    const control: any = this.articleForm?.get(controlName);
    return (
      (this.isFirstPageSubmitted &&
        !this.articleForm.value[controlName]) ||
      (control.touched && !this.articleForm.value[controlName])
    );
  }
}
