import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutmeComponent } from './pages/aboutme/aboutme.component';
import { WorksComponent } from './pages/works/works.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProjectsComponent } from './pages/projects/projects.component';



export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'about', component: AboutmeComponent },
            { path: 'resume', component: WorksComponent },
            { path: 'portfolio', component: ProjectsComponent },
            { path: 'contact', component: ContactComponent }
        ],
    },
];
