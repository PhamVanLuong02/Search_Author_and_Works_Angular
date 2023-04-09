import { Subscription, timer } from 'rxjs';
import { SearchAuthorService } from './../search-author.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit{

  query: string = '';
  authorsList: any[] = [];

  //Phân trang
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  //Lưu giá trị author list ở từng trang
  authors: any[] = [];
  //Khai báo search sau 1 giây
  querySubscription: Subscription | undefined;

  constructor(private apiService: SearchAuthorService) { }

  ngOnInit(): void {
  }
  // search
  onSearch() {
    this.apiService.searchAuthors(this.query, 1, 1000).subscribe((response: any) => {
      this.authors = response?.docs.map((author: any) => {
        return {
          name: author?.name,
          key: author?.key.replace('/authors/', ''),
          work_count: author?.work_count
        };
      });
      this.totalPages = Math.ceil(this.authors.length / this.pageSize);
      this.updateAuthorsList();
    });
  }
// search sau 1 giây
  onQueryChange() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
    this.querySubscription = timer(1000).subscribe(() => {
      this.onSearch();
    });
  }
//cập nhật data phân trang author
  updateAuthorsList() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.authorsList = this.authors.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.onSearch();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.onSearch();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.onSearch();
    }
  }
//

}
