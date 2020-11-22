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
import { AdminComponent } from './pages/admin/admin.component';
import { StartupEditComponent } from './pages/startup-edit/startup-edit.component';

const routes: Routes = [
    {path:"", component:DiscoverComponent, canActivate: [AuthGuard]},
    {path:"discover", component:DiscoverComponent, canActivate: [AuthGuard]},
    {path:"login", component:LogInComponent},
    {path:"register", component:RegisterComponent},
    {path:"forgot-password", component: ForgotPasswordComponent },
    {path:"lists", component:ListsComponent, canActivate: [AuthGuard]},
    {path:"archive", component:ArchiveComponent, canActivate: [AuthGuard]},
    {path:"startup/:id", component:StartupDetailComponent, canActivate: [AuthGuard]},
    {path:"list/:id", component:ListDetailComponent, canActivate: [AuthGuard]},

    //TODO: admin pages should have own module and routing
    {path:"admin", component:AdminComponent, canActivate: [AuthGuard]},
    {path:"admin/startup-edit/:id", component:StartupEditComponent, canActivate: [AuthGuard]},
    {path:"admin/startup-edit", component:StartupEditComponent, canActivate: [AuthGuard]},

    // other
    { path: '**', redirectTo: '' },
]
@NgModule({
    imports: [RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }