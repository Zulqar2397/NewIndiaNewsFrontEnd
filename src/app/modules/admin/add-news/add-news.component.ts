import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/shared/models/news';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewsappService } from 'src/app/core/service/newsapp.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/shared/models/category';
import { Image } from 'src/app/shared/models/image';
import { Admins } from 'src/app/shared/models/admins';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
  news: News;
  selectedCategory: Category;
  categoryList: Category[];
  imageArray: Image[] = [];
  image: Image;
  admin: Admins;
  newsDetails = new FormGroup({
    title: new FormControl("", [Validators.required]),
    source: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    image: new FormControl("", [Validators.required])
  });
  constructor(private newsService: NewsappService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.newsService.getAllCategories().subscribe(data => {
      this.categoryList = data.data

    })
  }
  onSubmit() {
    var images = this.newsDetails.value.image;
    var imagesArray = images.split(',');
    imagesArray.forEach(element => {
      this.image = new Image();
      this.image.imageUrl = element;
      this.imageArray.push(this.image);
    });
    this.admin = new Admins(JSON.parse(localStorage.getItem("admin")), null, null, null);

    this.news = new News(this.newsDetails.value.title, this.newsDetails.value.source, this.selectedCategory, this.newsDetails.value.description, this.imageArray, this.admin);

    this.newsService.postNews(this.news).subscribe(
      data => {
        if (data.success === true) {
          this.toastr.success("News Added Successfully!");
          this.newsDetails.reset();
        }
      }, error => {
        if (error.error.success === false) {
          this.toastr.error(error.error.message);
        }
      }

    );
  }
  selectOption(args) {
    this.selectedCategory = new Category();
    this.selectedCategory.categoryId = args.target.value;
  }

}
