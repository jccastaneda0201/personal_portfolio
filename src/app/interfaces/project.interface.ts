// src/app/interfaces/project.interface.ts

import ImgContent from './imgcontent.interface';

export default interface Project {
  _id: string; // ✅ Mongo devuelve _id
  titulo: string;
  descripcion: string;
  categoria: string;
  tecnologias: string[];
  urlGitHub: string;
  urlDemo: string;
  tecnologiasConIcono?: { skill: string; icon: string }[];
  projectImg?: ImgContent[]; // ✅ array de imágenes asociadas
}
