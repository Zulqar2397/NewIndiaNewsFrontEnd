import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NewsappService } from '../service/newsapp.service';
import { News } from 'src/app/shared/models/news';
import { Comment } from '../../shared/models/comment'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {
  @ViewChild('myDiv') myDiv: ElementRef;
  news: News;
  updatedLikes: number;
  constructor(private newsService: NewsappService) { }

  ngOnInit(): void {
    this.newsService.newsSubjectAsObservable.subscribe(data => {
      this.news = data;
      this.updatedLikes = data?.likeCount;

    })
    if (this.news?.newsId != undefined) {
      this.newsService.updatePageHitCount(this.news?.newsId).subscribe();
    }
  }
  checkLike() {
    if (!this.myDiv.nativeElement.classList.contains('like-btn--disabled')) {
      this.updatedLikes = this.updatedLikes + 1;
      this.myDiv.nativeElement.disabled = true;
      this.newsService.updateLikeCount(this.news?.newsId).subscribe();
    }

  }
  //Adding comment
  commentGiven: Comment;
  commentDetails = new FormGroup({
    postedBy: new FormControl(),
    comment: new FormControl()
  });
  onSubmit() {
    this.commentGiven = new Comment();
    this.commentGiven.postedBy = this.commentDetails.value.postedBy;
    this.commentGiven.comment = this.commentDetails.value.comment;
    this.commentDetails.reset();
    this.newsService.postComment(this.news?.newsId, this.commentGiven).subscribe();
    this.news.comments.push(this.commentGiven);
  }

}
