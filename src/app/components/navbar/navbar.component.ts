import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import User from '../../interfaces/user.interface';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  userService = inject(UsersService)
  usuario: User[] = []
  router = inject(Router)
  isNavbarCollapsed = true;


  async ngOnInit() {
    try {
      this.usuario = await this.userService.getAllUsers();
      console.log("Usuarios cargados: ", this.usuario);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed; // Cambiar estado del navbar
    console.log("Navbar colapsado:", this.isNavbarCollapsed);
  }

  scrollToSection(sectionId: string) {
    if (!sectionId) return; // Evita errores si el ID es undefined o vacío

    setTimeout(() => {
      let element = document.getElementById(sectionId);

      if (!element) {
        console.warn(`⚠️ No se encontró la sección con id: "${sectionId}". Esperando...`);

        // Observamos cambios en el DOM para esperar a que la sección aparezca
        const observer = new MutationObserver(() => {
          element = document.getElementById(sectionId);
          if (element) {
            observer.disconnect(); // Detenemos la observación cuando se encuentra el elemento
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });

        observer.observe(document.body, { childList: true, subtree: true });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200); // Se retrasa un poco para evitar errores por renderizado
  }


}

