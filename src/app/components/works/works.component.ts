import { Component, inject } from '@angular/core';
import { LaboralService } from '../../services/laboral.service';
import Laboral from '../../interfaces/laboral.interface';
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


  LaboralService = inject(LaboralService)
  laboral: Laboral[] = []

  EducationService = inject(EducationService)
  education: Education[] = []





  async ngOnInit() {
    try {

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

}

