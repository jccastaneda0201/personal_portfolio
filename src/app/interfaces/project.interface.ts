export default interface Project {
    id?: number;
    titulo: string;
    descripcion: string;
    tecnologias: string[]; // CORREGIDO: Usar 'string[]' en lugar de 'String'
    categoria: string;
    urlGitHub: string;
    urlDemo: string;
    imagenDestacada: string;
    tecnologiasConIcono?: { skill: string; icon: string }[]; // Nuevo campo opcional
}
