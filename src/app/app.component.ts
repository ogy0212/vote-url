import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

import { PostsService } from './posts.service';
import { SitePost } from './site-post';
import { Post } from './post.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  newPost: Post = {
    _id: null,
    title: '',
    url: '',
    votes: 0
  };
  postList: Post[];
  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getAllPosts().subscribe((data: Post[]) => {
      this.postList = data;
      this.sortPosts();
    });
  }

  addPost(): void {
    const reqPost = {
      title: this.newPost.title,
      url: this.newPost.url,
    };
    this.postsService.createPost(reqPost).subscribe((data: Post) => {
      this.postList.push(data);
      this.sortPosts();
    }, (err) => {
      console.log(err);
    });
    // this.postList.push(reqPost);
    // this.sortPosts();

    this.newPost = {
      _id: 0,
      title: '',
      url: '',
      votes: 0
    };
  }
  deletePost(post: Post): void {
    this.postsService.deletePost(post._id).subscribe((data: Post) => {
      _.pull(this.postList, post);
    }, (err) => {
      console.log(err);
    });
  }
  upVote(post: Post): void {
    post.votes++;
    this.postsService.upVote(post._id, post.votes).subscribe((data: Post) => {
      console.log(data);
    }, (err) => {
      console.log(err);
    });
    this.sortPosts();
  }
  downVote(post: Post): void {
    post.votes--;
    this.postsService.downVote(post._id, post.votes).subscribe((data: Post) => {
      console.log(data);
    }, (err) => {
      console.log(err);
    });
    this.sortPosts();
  }
  sortPosts(): void {
    this.postList = _.sortBy(this.postList, 'votes').reverse();
  }
}
