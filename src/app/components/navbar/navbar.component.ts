import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';
import User from '../../interfaces/user.interface';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
    {
      id: 'home',
      routeLink: '/',
      icon: 'fal fa-home',
      label: 'Home',
    },
    {
      id: 'about',
      routeLink: '/',
      icon: 'far fa-user-circle',
      label: 'Sobre mí',
    },
    {
      id: 'resume',
      routeLink: '/',
      icon: 'far fa-file',
      label: 'Resumen',
    },
    {
      id: 'portfolio',
      routeLink: '/',
      icon: 'far fa-folder-open',
      label: 'Proyectos',
    },
    {
      id: 'contact',
      routeLink: '/',
      icon: 'far fa-paper-plane',
      label: 'Contacto',
    },
  ];

  userService = inject(UsersService)
  usuario: User[] = []
  isNavbarCollapsed = true;


  async ngOnInit() {
    try {
      this.usuario = await this.userService.getAllUsers();
      console.log("Usuarios cargados: ", this.usuario);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }

  scrollToSection(sectionId: string) {
    if (!sectionId) return;

    setTimeout(() => {
      let element = document.getElementById(sectionId);

      if (!element) {
        console.warn(`⚠️ No se encontró la sección con id: "${sectionId}". Esperando...`);
        const observer = new MutationObserver(() => {
          element = document.getElementById(sectionId);
          if (element) {
            observer.disconnect();
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.changeIsLeftSidebarCollapsed.emit(true);
      }
    }, 200);
  }
}



// import { Component } from '@angular/core';
// import { Router, RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-navbar',
//   imports: [RouterLink],
//   templateUrl: './navbar.component.html',
//   styleUrl: './navbar.component.css'
// })
// export class NavbarComponent {
//   isSobreMiActive: boolean = false;

//   updateNavbarClass(route: string) {
//     switch (route) {
//       case '/sobremi':
//         this.isSobreMiActive = true;
//         break;
//       case '/':
//         this.isSobreMiActive = false;
//         break;
//       default:
//         this.isSobreMiActive = false;
//         break;
//     }
//   }
// }







// import { Component, inject } from '@angular/core';
// import { Router, RouterLink } from '@angular/router';
// import { UsersService } from '../../services/users.service';
// import User from '../../interfaces/user.interface';

// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [RouterLink],
//   templateUrl: './navbar.component.html',
//   styleUrl: './navbar.component.css'
// })
// export class NavbarComponent {

//   userService = inject(UsersService)
//   usuario: User[] = []
//   router = inject(Router)
//   isNavbarCollapsed = true;


//   async ngOnInit() {
//     try {
//       this.usuario = await this.userService.getAllUsers();
//       console.log("Usuarios cargados: ", this.usuario);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

//   toggleNavbar() {
//     this.isNavbarCollapsed = !this.isNavbarCollapsed; 
//     console.log("Navbar colapsado:", this.isNavbarCollapsed);
//   }

//   scrollToSection(sectionId: string) {
//     if (!sectionId) return; 

//     setTimeout(() => {
//       let element = document.getElementById(sectionId);

//       if (!element) {
//         console.warn(`⚠️ No se encontró la sección con id: "${sectionId}". Esperando...`);
//         const observer = new MutationObserver(() => {
//           element = document.getElementById(sectionId);
//           if (element) {
//             observer.disconnect(); 
//             element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//           }
//         });
//         observer.observe(document.body, { childList: true, subtree: true });
//       } else {
//         element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }
//     }, 200); 
//   }


// }

