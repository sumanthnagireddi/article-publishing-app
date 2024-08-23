import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentHolderComponent } from './comment-holder.component';

describe('CommentHolderComponent', () => {
  let component: CommentHolderComponent;
  let fixture: ComponentFixture<CommentHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentHolderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
