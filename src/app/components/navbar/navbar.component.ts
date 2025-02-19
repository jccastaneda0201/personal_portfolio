import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import User from '../../interfaces/user.interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  userService = inject(UsersService)
  usuario: User[] = []
  router = inject(Router)

  async ngOnInit() {
    try {
      this.usuario = await this.userService.getAllUsers()
      window.onload = () => {
        console.log("✅ Toda la página (incluyendo imágenes) ha sido cargada!");
        this.scrollToSection(window.location.pathname.replace('/', ''));
      };
      console.log(this.usuario);
    }
    catch (error) {
      console.error('Error:', error);
    }
  }

  isSobreMiActive: boolean = false;

  updateNavbarClass(route: string) {
    switch (route) {
      case '/sobremi':
        this.isSobreMiActive = true;
        break;
      case '/':
        this.isSobreMiActive = false;
        break;
      default:
        this.isSobreMiActive = false;
        break;
    }
  }


  scrollToSection(sectionId: string) {
    if (!sectionId) return;

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }



}
