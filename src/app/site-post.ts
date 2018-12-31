export class SitePost {
  _id?: number;
  title: string;
  url: string;
  votes: number;

  constructor() {
    this.title = '';
    this.url = '';
    this.votes = 0;
  }
}
