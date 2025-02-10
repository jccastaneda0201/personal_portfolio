import { Component, inject } from '@angular/core';
import { LaboralService } from '../../services/laboral.service';
import Laboral from '../../interfaces/laboral.interface';
import { ProjectsService } from '../../services/projects.service';
import Project from '../../interfaces/project.interface';
import { DatePipe } from '@angular/common';
import { EducationService } from '../../services/education.service';
import Education from '../../interfaces/education.interface';

@Component({
  selector: 'app-works',
  imports: [DatePipe],
  templateUrl: './works.component.html',
  styleUrl: './works.component.css'
})
export class WorksComponent {

  ProjectsService = inject(ProjectsService)
  projects: Project[] = []

  LaboralService = inject(LaboralService)
  laboral: Laboral[] = []

  EducationService = inject(EducationService)
  education: Education[] = []

  habilidadesObjetos: any[] = [];
  descripcionObj: any[] = [];


  async ngOnInit() {
    try {
      this.projects = await this.ProjectsService.getAllProjects();

      const dataEdu = await this.EducationService.getAllEducation();
      this.education = dataEdu.sort((a, b) => {
        if (a.actual && !b.actual) return -1;
        if (!a.actual && b.actual) return 1;
        return new Date(b.fechaFin || 0).getTime() - new Date(a.fechaFin || 0).getTime();
      });

      const data = await this.LaboralService.getAllLaboral();
      this.laboral = data.sort((a, b) => {
        if (a.actual && !b.actual) return -1;
        if (!a.actual && b.actual) return 1;
        return new Date(b.fechaFin || 0).getTime() - new Date(a.fechaFin || 0).getTime();
      });

      console.log(this.laboral);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  extraerHabilidades() {
    this.habilidadesObjetos = []; // Limpia el array antes de agregar nuevos elementos

    this.laboral.forEach(experiencia => {
      if (experiencia.habilidades && Array.isArray(experiencia.habilidades)) {
        experiencia.habilidades.forEach(habilidad => {
          // Verifica si la habilidad ya existe en el array
          if (!this.habilidadesObjetos.some(obj => obj.habilidad === habilidad)) {
            this.habilidadesObjetos.push({ habilidad: habilidad });
          }
        });
      }
    });
    console.log('Habilidades como objetos (sin duplicados):', this.habilidadesObjetos);
  }

  extraerFunciones() {
    this.descripcionObj = []; // Limpia el array antes de agregar nuevos elementos

    this.laboral.forEach(experiencia => {
      if (experiencia.funciones && Array.isArray(experiencia.funciones)) {
        experiencia.funciones.forEach(funcion => {
          // Verifica si la funcion ya existe en el array
          if (!this.descripcionObj.some(obj => obj.funcion === funcion)) {
            this.descripcionObj.push({ funcion: funcion });
          }
        });
      }
    });
    console.log('Funciones como objetos (sin duplicados):', this.descripcionObj);
  }


}
