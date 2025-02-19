export default interface Education {
    id: number,
    institucion: String,
    tituloObtenido: String,
    fechaInicio: Date,
    fechaFin: Date,
    actual: Boolean,
    logros: String,
    tecnologias: String,
}

export interface FtEducation {
    icon: string;
    label: string;
}
