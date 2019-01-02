import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SitePost } from './site-post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<any> {
    return this.http.get('/api/posts');
  }
  createPost(data): Observable<any> {
    return this.http.post('/api/posts', data);
  }
  upVote(id, votes): Observable<any> {
    return this.http.put(`/api/posts/${id}/upvote`, {votes: votes});
  }
  downVote(id, votes): Observable<any> {
    return this.http.put(`/api/posts/${id}/downvote`, {votes: votes});
  }
  deletePost(id): Observable<any> {
    return this.http.delete(`/api/posts/${id}`);
  }
}
