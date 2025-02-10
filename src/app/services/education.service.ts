import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import Education from '../interfaces/education.interface';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private httpClient = inject(HttpClient);
  private apiUrlEducation = `${environment.apiUrl}/api/education`;

  async getAllEducation(): Promise<Education[]> {
    return lastValueFrom(this.httpClient.get<Education[]>(this.apiUrlEducation));
  }

  async getEducationById(id: number): Promise<Education> {
    return lastValueFrom(this.httpClient.get<Education>(`${this.apiUrlEducation}/${id}`));
  }

}
