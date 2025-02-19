import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { WorksComponent } from './components/works/works.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { MainComponent } from './components/main/main.component';





export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: "home", component: HomeComponent },
            { path: 'about', component: AboutmeComponent },
            { path: 'resume', component: WorksComponent },
            { path: 'portfolio', component: ProjectsComponent },
            { path: 'contact', component: ContactComponent }
        ]
    },
];


