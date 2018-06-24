import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModule } from '../admin.module';
import { CatParentsIndexComponent } from './cat-parents-index/cat-parents-index.component';
import { CatParentsEditComponent } from './cat-parents-edit/cat-parents-edit.component';
import { CatParentsCreateComponent } from './cat-parents-create/cat-parents-create.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [CatParentsIndexComponent, CatParentsEditComponent, CatParentsCreateComponent]
})
export class CatParentsModule { }
