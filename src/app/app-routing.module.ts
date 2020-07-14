import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { DiscoverComponent } from './pages/discover/discover.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { ListsComponent } from './pages/lists/lists.component';
import { StartupDetailComponent } from './pages/startup-detail/startup-detail.component';
import { ListDetailComponent } from './pages/list-detail/list-detail.component';

const routes: Routes = [
    {path:"", component:DiscoverComponent},
    {path:"discover", component:DiscoverComponent},
    {path:"lists", component:ListsComponent},
    {path:"archive", component:ArchiveComponent},
    {path:"startup/:id", component:StartupDetailComponent},
    {path:"list/:id", component:ListDetailComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }