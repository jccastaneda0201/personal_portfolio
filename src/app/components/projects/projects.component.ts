import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { CarouselModule } from 'primeng/carousel';
import Project from '../../interfaces/project.interface';
import Icon from '../../interfaces/icon.interface';
import { ButtonModule } from 'primeng/button';
import { ContentfulService } from '../../services/contentful.service';
import ImgContent from '../../interfaces/imgcontent.interface';

const DEFAULT_IMG = 'images/default-img.jpg';
const DEFAULT_URL = 'https://marketplaceapps-project.netlify.app/';

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
  projectImg: ImgContent[] = [];

  ArrayIcons: Icon[] = [
    //fuente del icono es cdn
    { label: 'node.js', icon: 'icons/node.svg' },
    {
      label: 'Angular',
      icon: 'icons/angular.svg',
    },
    {
      label: 'react',
      icon: 'icons/react.svg',
    },
    { label: 'vitejs', icon: 'icons/vite.svg' },
    { label: 'mongoDB', icon: 'icons/mongo.svg' },
    { label: 'MySql', icon: 'icons/mysql.svg' },
    {
      label: 'typescript',
      icon: 'icons/ts.svg',
    },
    {
      label: 'javaScript',
      icon: 'icons/js.svg',
    },
    { label: 'CSS', icon: 'icons/css3.svg' },
    { label: 'Html-5', icon: 'icons/html.svg' },
    {
      label: 'Bootstrap',
      icon: 'icons/bootstrap.svg',
    },
    {
      label: 'Wordpress',
      icon: 'icons/wordpress.svg',
    },
    { label: 'Php', icon: 'icons/php.svg' },
    {
      label: 'Express',
      icon: 'icons/express.svg',
    },
    {
      label: 'tailwind',
      icon: 'icons/tailwind.svg',
    },
  ];

  async ngOnInit() {
    try {
      this.projects = await this.ProjectsService.getAllProjects();
      this.projectImg = await this.ContentfulService.getProjects();
      this.assignIcons();
      this.assignImages();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  normalizeString(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD') // elimina tildes
      .replace(/[\u0300-\u036f]/g, '') // elimina diacríticos
      .replace(/[^a-z0-9]/g, ''); // elimina todo lo que no sea letras/números
  }

  // Asegura que las URLs de Contentful que inician con "//" queden bien formadas
  fixProtocol(url?: string): string | undefined {
    if (!url) return url;
    if (url.startsWith('//')) return `https:${url}`;
    return url;
  }
  assignIcons(): void {
    this.projects.forEach((project) => {
      project.tecnologiasConIcono = project.tecnologias.map((tech) => {
        const normalizedHabilidad = this.normalizeString(tech);
        const iconData = this.ArrayIcons.find(
          (icon) => this.normalizeString(icon.label) === normalizedHabilidad
        );
        return {
          skill: tech,
          icon: iconData ? iconData.icon : 'icons/no-web.png', // Icono por defecto si no se encuentra
        };
      });
    });
  }
  assignImages(): void {
    this.projects.forEach((project) => {
      // Normalizar el título del proyecto para comparación
      const normalizedProjectTitle = this.normalizeString(project.titulo);

      // Buscar la imagen en Contentful que coincida con el título
      const matchingImage = this.projectImg.find((img) => {
        if (!img.title) return false;
        const normalizedImageTitle = this.normalizeString(img.title);
        return normalizedImageTitle === normalizedProjectTitle;
      });

      if (matchingImage) {
        // Si encontramos coincidencia, asignar URL de imagen y demo
        project.projectImg = [
          {
            id: matchingImage.id,
            title: matchingImage.title,
            img: this.fixProtocol(matchingImage.img) || DEFAULT_IMG,
            url: this.fixProtocol(matchingImage.url) || DEFAULT_URL,
          },
        ];
      } else {
        // Si no hay coincidencia, asignar valores por defecto
        project.projectImg = [
          {
            id: 'default',
            title: project.titulo,
            img: DEFAULT_IMG,
            url: DEFAULT_URL,
          },
        ];
      }
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

// img.img = img.img || 'images/default-img.jpg'; // Imagen por defecto si no hay
// img.url = img.url || 'https://marketplaceapps-project.netlify.app/';
