import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { EarlierLittersComponent } from './litter/earlier-litters/earlier-litters.component';
import { PlannedLittersComponent } from './litter/planned-litters/planned-litters.component';
import { IndexLitterComponent } from './litter/index-litter/index-litter.component';
import { ReadmoreLitterComponent } from './litter/readmore-litter/readmore-litter.component';
import { AdminIndexComponent } from './admin/admin-index/admin-index.component';
import { CatLittersIndexComponent } from './admin/cat-litters/cat-litters-index/cat-litters-index.component';
import { CatParentsIndexComponent } from './admin/cat-parents/cat-parents-index/cat-parents-index.component';
import { CatLittersEditComponent } from './admin/cat-litters/cat-litters-edit/cat-litters-edit.component';
import { componentFactoryName } from '@angular/compiler';
import { CatLittersCreateComponent } from './admin/cat-litters/cat-litters-create/cat-litters-create.component';
import { AuthGuardService } from './services/AuthGuard';
import { CatParentsEditComponent } from './admin/cat-parents/cat-parents-edit/cat-parents-edit.component';
import { CatParentsCreateComponent } from './admin/cat-parents/cat-parents-create/cat-parents-create.component';

const routes: Routes = [
  { path: '', pathMatch:'full', component: LoginComponent }, 
  // { path: 'login', component: LoginComponent },
  // { path: 'tidigare-kullar', component: EarlierLittersComponent },
  // { path: 'planerade-kullar', component: PlannedLittersComponent },
  // { path: 'kattungar', component: IndexLitterComponent },
  // { path: 'kattungar/:id', component: ReadmoreLitterComponent },
  { path: 'admin', component: AdminIndexComponent, canActivate: [AuthGuardService] ,children:[
    { path: 'litters/:id', component: CatLittersEditComponent, canActivate: [AuthGuardService], outlet: 'adminOutlet'},
    { path: 'litters', component: CatLittersIndexComponent, canActivate: [AuthGuardService], outlet: 'adminOutlet' },
    { path: 'createlitter', component: CatLittersCreateComponent, canActivate: [AuthGuardService], outlet: 'adminOutlet' },
    { path: 'parents', component: CatParentsIndexComponent, canActivate: [AuthGuardService], outlet: 'adminOutlet' },
    { path: 'parents/:id', component: CatParentsEditComponent, canActivate: [AuthGuardService], outlet: 'adminOutlet' },
    { path: 'createparent', component: CatParentsCreateComponent, canActivate: [AuthGuardService], outlet: 'adminOutlet' },
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
