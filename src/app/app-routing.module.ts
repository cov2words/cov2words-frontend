import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: './home/home.module#HomePageModule'
    },
    {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsPageModule'
    }
];

@NgModule ({
    imports: [RouterModule.forRoot (routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
