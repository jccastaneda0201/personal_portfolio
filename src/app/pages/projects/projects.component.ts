import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import Project from '../../interfaces/project.interface';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  ProjectsService = inject(ProjectsService)
  projects: Project[] = []


  async ngOnInit() {
    try {
      this.projects = await this.ProjectsService.getAllProjects()
      console.log(this.projects);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
