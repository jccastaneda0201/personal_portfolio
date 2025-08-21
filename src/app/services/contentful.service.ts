import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { createClient } from 'contentful';
import ImgContent from '../interfaces/imgcontent.interface';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private client = createClient({
    space: environment.contentful.CONTENTFUL_SPACE_ID, // mejor desde environment
    environment: 'master',
    accessToken: environment.contentful.CONTENTFUL_API_KEY,
  });

  @Injectable({
    providedIn: 'root',
  })
  async getProjects(): Promise<ImgContent[]> {
    try {
      const response = await this.client.getEntries({
        content_type: 'projects',
      });

      return response.items.map((item: any) => {
        const { title, url, image } = item.fields;
        const id = item.sys.id;
        const img = image?.fields?.file?.url;
        return { title, url, img, id } as ImgContent;
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }
}
