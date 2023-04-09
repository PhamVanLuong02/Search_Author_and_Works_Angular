import { AuthorWorksComponent } from './author-works/author-works.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { AuthorsComponent } from './authors/authors.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{path: '', component: AuthorsComponent},
{path: 'author/:key', component: AuthorDetailComponent},
{path: 'author/:key/works', component: AuthorWorksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
