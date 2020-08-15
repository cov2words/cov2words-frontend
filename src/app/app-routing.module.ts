import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthPageModule'
    },
    {
        path: '',
        loadChildren: './home/home.module#HomePageModule',
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    },
    {
        path: 'questions',
        loadChildren: './questions/questions.module#QuestionsPageModule',
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
