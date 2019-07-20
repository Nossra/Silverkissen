import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component'; 
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { LitterService } from './services/litterService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { CatLittersModule } from './admin/cat-litters/cat-litters.module';
import { CatParentsModule } from './admin/cat-parents/cat-parents.module';
import { AdminIndexComponent } from './admin/admin-index/admin-index.component';
import { UserService } from './services/UserService';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { Helpers } from './Helpers/helper';
import { CatService } from './services/CatService';
import { AuthGuardService } from './services/AuthGuard';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt'; 
import { ImageService } from './services/ImageService';

export function tokenGetterFn() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    JwtModule.forRoot({
      config: {
        tokenGetter:tokenGetterFn
      }
    })
  ],
  providers: [
    LitterService,
    UserService,
    CatService,
    Helpers,
    ImageService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
