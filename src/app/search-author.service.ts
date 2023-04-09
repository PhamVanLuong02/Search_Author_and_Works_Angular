import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchAuthorService {

  main = 'https://openlibrary.org';

  constructor(private http: HttpClient) { }
// Search
  searchAuthors(query: string, page: number, pageSize: number) {
    const url = `${this.main}/search/authors.json?q=${query}&page=${page}&limit=${pageSize}`;
    return this.http.get(url);
  }
// Detail
  getAuthorInfo(key: string) {
    const url = `${this.main}/authors/${key}.json`;
    return this.http.get(url);
  }
// Works
  getAuthorWorks(key: string) {
    const url = `${this.main}/authors/${key}/works.json`;
    return this.http.get(url);
  }

}
