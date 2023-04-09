import { SearchAuthorService } from './../search-author.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {

  authorKey = '';
  authorInfo: any = {};

  constructor(private route: ActivatedRoute, private apiService: SearchAuthorService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.authorKey = params['key'];
      this.loadAuthorInfo();
    });
  }

  loadAuthorInfo() {
    this.apiService.getAuthorInfo(this.authorKey).subscribe((response: any) => {
      this.authorInfo = response;
    });
  }

}
