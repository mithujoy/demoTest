import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './public/sidebar.component';
import { PageNotFoundComponent } from './public/page-not-found.component';
import { DistributionModule } from './distributionModule/distribution.module';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '', component: SidebarComponent, loadChildren: () => DistributionModule },
  // {
  //     path: '', component: SidebarComponent,
  //     children: [
  //         {
  //             path: '',
  //             loadChildren: './distributionModule/distribution.module.ts#distributionModule'

  //         }]
  // },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routedComponents = [LoginComponent, SidebarComponent, PageNotFoundComponent];