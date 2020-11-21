import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { DiscoverComponent } from './pages/discover/discover.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { ListsComponent } from './pages/lists/lists.component';
import { StartupDetailComponent } from './pages/startup-detail/startup-detail.component';
import { ListDetailComponent } from './pages/list-detail/list-detail.component';
import { LogInComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgotPasswordComponent } from './pages/auth/forgotPassword/forgotPassword.component';

import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
    {path:"", component:LogInComponent},
    {path:"login", component:LogInComponent},
    {path:"register", component:RegisterComponent},
    {path:"forgot-password", component: ForgotPasswordComponent },
    {path:"discover", component:DiscoverComponent, canActivate: [AuthGuard]},
    {path:"lists", component:ListsComponent, canActivate: [AuthGuard]},
    {path:"archive", component:ArchiveComponent, canActivate: [AuthGuard]},
    {path:"startup/:id", component:StartupDetailComponent, canActivate: [AuthGuard]},
    {path:"list/:id", component:ListDetailComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }