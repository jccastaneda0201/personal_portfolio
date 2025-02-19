import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeComponent } from "../home/home.component";
import { AboutmeComponent } from "../aboutme/aboutme.component";
import { WorksComponent } from "../works/works.component";
import { ProjectsComponent } from "../projects/projects.component";
import { ContactComponent } from "../contact/contact.component";
import { AppComponent } from "../../app.component";



@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    AboutmeComponent,
    WorksComponent,
    HomeComponent,
    ProjectsComponent,
    ContactComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
