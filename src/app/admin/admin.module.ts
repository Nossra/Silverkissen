import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { CatLittersModule } from './cat-litters/cat-litters.module';
import { CatParentsModule } from './cat-parents/cat-parents.module';
import { OutletContext, RouterModule } from '@angular/router';
import { AdminImagesComponent } from './admin-images/admin-images.component';

@NgModule({
  imports: [
    CommonModule,
    CatLittersModule,
    CatParentsModule,
    RouterModule
  ],
  declarations: [AdminIndexComponent,AdminNavComponent, AdminImagesComponent]
})
export class AdminModule { }
 