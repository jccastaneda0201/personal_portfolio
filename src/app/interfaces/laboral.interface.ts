export default interface Laboral {
    id?: number,
    tituloPuesto: string,
    empresa: string,
    ubicacion: string,
    fechaInicio: Date,
    fechaFin: Date,
    actual: boolean,
    descripcion: string,
    funciones: string,
    habilidades: string[],
    skillsConIcono?: { skill: string; icon: string }[]; // Nuevo campo 
}
