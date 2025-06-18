import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { CarouselModule } from 'primeng/carousel';
import Project from '../../interfaces/project.interface';
import Icon from '../../interfaces/icon.interface';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-projects',
  imports: [CarouselModule, ButtonModule],
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  ProjectsService = inject(ProjectsService)
  projects: Project[] = [];



  ArrayIcons: Icon[] = [
    //fuente del icono es cdn
    { label: "Nodejs", icon: "https://img.icons8.com/fluency/48/node-js.png" },
    { label: "Angular", icon: "https://img.icons8.com/fluency/48/angularjs.png" },
    { label: "React", icon: "https://img.icons8.com/color/48/react-native.png" },
    { label: "ViteJs", icon: "https://img.icons8.com/fluency/48/vite.png" },
    { label: "MongoDB", icon: "https://img.icons8.com/color/48/mongo-db.png" },
    { label: "MySql", icon: "https://img.icons8.com/color/48/my-sql.png" },
    { label: "typescript", icon: "https://img.icons8.com/fluency/48/typescript--v1.png" },
    { label: "JavaScript", icon: "https://img.icons8.com/color/48/javascript--v1.png" },
    { label: "CSS", icon: "https://img.icons8.com/color/48/css3.png" },
    { label: "Html 5", icon: "https://img.icons8.com/color/48/html-5--v1.png" },
    { label: "Bootstrap", icon: "https://img.icons8.com/fluency/48/bootstrap.png" },
    { label: "Wordpress", icon: "https://img.icons8.com/color/48/wordpress.png" },
    { label: "Php", icon: "https://img.icons8.com/offices/50/php-logo.png" },
    { label: "Express", icon: "https://img.icons8.com/nolan/64/express-js.png" }

  ];



  async ngOnInit() {
    try {
      this.projects = await this.ProjectsService.getAllProjects();
      this.asignarIconosATecnologias();
      console.log(this.projects);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  asignarIconosATecnologias(): void {
    this.projects.forEach(project => {
      project.tecnologiasConIcono = project.tecnologias.map(tech => {
        const normalizedHabilidad = tech.toLowerCase().replace('.', '').replace(/\s+/g, '').replace(' ', '-');
        const iconData = this.ArrayIcons.find(icon => icon.label.toLowerCase().replace('.', '').replace(/\s+/g, '').replace(' ', '-') === normalizedHabilidad);
        return {
          skill: tech,
          icon: iconData ? iconData.icon : 'https://img.icons8.com/color/48/no-web.png' // Icono por defecto si no se encuentra
        };
      });
    });
  }

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];


}




