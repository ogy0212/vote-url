import { Component } from '@angular/core';

import { SitePost } from './site-post';

import * as _ from 'lodash';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  newPost: SitePost = {
    _id: null,
    title: '',
    url: '',
    votes: 0
  };
  postList: SitePost[];
  constructor() {
    this.postList = [{
      _id: 1,
      title: 'yahoo',
      url: 'https://www.yahoo.co.jp/',
      votes: 85
    }, {
      _id: 2,
      title: 'google',
      url: 'https://www.bing.com/',
      votes: 93
    }, {
      _id: 3,
      title: 'bing',
      url: 'https://www.bing.com/',
      votes: 38
    }, {
      _id: 4,
      title: 'twitter',
      url: 'https://twitter.com',
      votes: 38
    }];
    this.sortPosts();
  }

  addPost(): void {
    const reqPost: SitePost = {
      _id: this.postList.length + 1,
      title: this.newPost.title,
      url: this.newPost.url,
      votes: 0
    };
    this.postList.push(reqPost);
    this.sortPosts();

    this.newPost = new SitePost();
  }
  deletePost(post: SitePost): void {
    _.pull(this.postList, post);
  }
  upVote(post: SitePost): void {
    post.votes++;
    this.sortPosts();
  }
  downVote(post: SitePost): void {
    post.votes--;
    this.sortPosts();
  }
  sortPosts(): void {
    this.postList = _.sortBy(this.postList, 'votes').reverse();
  }
}
