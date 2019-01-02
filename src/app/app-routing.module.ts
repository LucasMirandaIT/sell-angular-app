import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileConfigComponent } from './pages/profile-config/profile-config.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { AdmAreaComponent } from './pages/adm-area/adm-area.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'user-config', component: ProfileConfigComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'adm-area', component: AdmAreaComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
