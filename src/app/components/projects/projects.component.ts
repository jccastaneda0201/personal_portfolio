import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { CarouselModule } from 'primeng/carousel';
import Project, { ProjectImg } from '../../interfaces/project.interface';
import Icon from '../../interfaces/icon.interface';
import { ButtonModule } from 'primeng/button';
import { ContentfulService } from '../../services/contentful.service';

@Component({
  selector: 'app-projects',
  imports: [CarouselModule, ButtonModule],
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  ProjectsService = inject(ProjectsService);
  ContentfulService = inject(ContentfulService);
  projects: Project[] = [];
  projectsImg: ProjectImg[] = [];

  ArrayIcons: Icon[] = [
    //fuente del icono es cdn
    { label: 'node.js', icon: 'https://img.icons8.com/fluency/48/node-js.png' },
    {
      label: 'angular',
      icon: 'https://img.icons8.com/fluency/48/angularjs.png',
    },
    {
      label: 'react',
      icon: 'https://img.icons8.com/color/48/react-native.png',
    },
    { label: 'vite', icon: 'https://img.icons8.com/fluency/48/vite.png' },
    { label: 'mongoDB', icon: 'https://img.icons8.com/color/48/mongo-db.png' },
    { label: 'MySql', icon: 'https://img.icons8.com/color/48/my-sql.png' },
    {
      label: 'typescript',
      icon: 'https://img.icons8.com/fluency/48/typescript--v1.png',
    },
    {
      label: 'javaScript',
      icon: 'https://img.icons8.com/color/48/javascript--v1.png',
    },
    { label: 'CSS', icon: 'https://img.icons8.com/color/48/css3.png' },
    { label: 'Html-5', icon: 'https://img.icons8.com/color/48/html-5--v1.png' },
    {
      label: 'Bootstrap',
      icon: 'https://img.icons8.com/fluency/48/bootstrap.png',
    },
    {
      label: 'Wordpress',
      icon: 'https://img.icons8.com/color/48/wordpress.png',
    },
    { label: 'Php', icon: 'https://img.icons8.com/offices/50/php-logo.png' },
    {
      label: 'Express',
      icon: 'https://img.icons8.com/nolan/64/express-js.png',
    },
    {
      label: 'tailwind',
      icon: '../../../assets/icons/tailwind-icon.svg',
    },
  ];

  async ngOnInit() {
    try {
      this.projects = await this.ProjectsService.getAllProjects();
      this.projectsImg = await this.ContentfulService.getProjects();
      this.asignarIconosATecnologias();
      console.log(this.projects);
      console.log(this.projectsImg);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  asignarIconosATecnologias(): void {
    this.projects.forEach((project) => {
      project.tecnologiasConIcono = project.tecnologias.map((tech) => {
        const normalizedHabilidad = tech
          .toLowerCase()
          .replace('.', '')
          .replace(/\s+/g, '')
          .replace(' ', '-');
        const iconData = this.ArrayIcons.find(
          (icon) =>
            icon.label
              .toLowerCase()
              .replace('.', '')
              .replace(/\s+/g, '')
              .replace(' ', '-') === normalizedHabilidad
        );
        return {
          skill: tech,
          icon: iconData
            ? iconData.icon
            : 'https://img.icons8.com/color/48/no-web.png', // Icono por defecto si no se encuentra
        };
      });
    });
  }

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
}
