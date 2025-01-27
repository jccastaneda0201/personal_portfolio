import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AboutmeComponent } from "../aboutme/aboutme.component";
import { WorksComponent } from "../works/works.component";

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, AboutmeComponent, WorksComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
