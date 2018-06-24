import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatLittersIndexComponent } from './cat-litters-index/cat-litters-index.component';
import { AdminModule } from '../admin.module';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatLittersEditComponent } from './cat-litters-edit/cat-litters-edit.component';
import { RouterModule } from '@angular/router';
import { CatLittersCreateComponent } from './cat-litters-create/cat-litters-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [CatLittersIndexComponent, CatLittersEditComponent, CatLittersCreateComponent]
})
export class CatLittersModule { }
