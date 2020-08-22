import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NewsappService } from '../service/newsapp.service';
import { News } from 'src/app/shared/models/news';
import { Comment } from '../../shared/models/comment'
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {
  @ViewChild('myDiv') myDiv: ElementRef;
  news: News;
  updatedLikes: number;
  trendingNewsList: News[] = [];
  constructor(private newsService: NewsappService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.newsService.newsSubjectAsObservable.subscribe(data => {
      this.news = data;
      this.updatedLikes = data?.likeCount;

    })
    if (this.news?.newsId != undefined) {
      this.newsService.updatePageHitCount(this.news?.newsId).subscribe();
    }
    this.newsService.getTrendingNews().subscribe(data => {
      this.trendingNewsList = data.data;
    })
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
    this.newsService.postComment(this.news?.newsId, this.commentGiven).subscribe(data => {
      if (data.success === true) {
        this.toastr.success("Comment Posted!");
      }
    });
    this.news.comments.push(this.commentGiven);
  }

  sendSelectedNews(trendingNewsList) {
    this.newsService.sendSelectedNews(trendingNewsList);
    this.redirectTo("/news-details");
  }
//this is used because when user is inside newsdetails and chose to select any news, oninit is not called on same route redirct
redirectTo(uri) {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([uri]));
}
}
