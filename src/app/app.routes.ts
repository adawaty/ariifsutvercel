import { Routes } from '@angular/router';
import { MainLayout } from './shared/layouts/main-layout/main-layout';

export const routes: Routes = [
    {path: '', redirectTo:'home', pathMatch:'full'},
    {
        path: '', component: MainLayout, children: [
            { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
            { path: 'guidelines', loadComponent: () => import('./pages/guidelines/guidelines').then(m => m.Guidelines) },
            { path: 'competitions-tracks', loadComponent: () => import('./pages/competitions-tracks/competitions-tracks').then(m => m.CompetitionsTracks) },
            { path: 'about-us', loadComponent: () => import('./pages/about-us/about-us').then(m => m.AboutUs) },
            { path: 'submission', loadComponent: ()=> import('./pages/submission/submission').then(m => m.Submission)}
        ]
    }

];
