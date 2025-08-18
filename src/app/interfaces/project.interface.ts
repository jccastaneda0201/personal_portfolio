export default interface Project {
  id?: number;
  titulo: string;
  descripcion: string;
  tecnologias: string[]; // CORREGIDO: Usar 'string[]' en lugar de 'String'
  categoria: string;
  urlGitHub: string;
  urlDemo: string;
  tecnologiasConIcono?: { skill: string; icon: string }[]; // Nuevo campo opcional
}

export interface ProjectImg {
  id?: number;
  title: string;
  url: string;
  image?: string;
}
