import { SearchAuthorService } from './../search-author.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-works',
  templateUrl: './author-works.component.html',
  styleUrls: ['./author-works.component.css']
})
export class AuthorWorksComponent implements OnInit {

  authorKey = '';
  worksList: any[] = [];

  //Phân trang
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  //Lưu giá trị works list ở từng trang
  works: any[] = [];
  constructor(private route: ActivatedRoute, private apiService: SearchAuthorService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.authorKey = params['key'];
      this.loadAuthorWorks();
    });
  }

  loadAuthorWorks() {
    this.apiService.getAuthorWorks(this.authorKey).subscribe((response: any) => {
      this.works = response.entries;
      this.totalPages = Math.ceil(this.works.length / this.pageSize);
      this.updateWorksList();
    });
  }

  //cập nhật data phân trang works
  updateWorksList() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.worksList = this.works.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateWorksList();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateWorksList();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateWorksList();
    }
  }
}
