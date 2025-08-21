export default interface ImgContent {
  id: string; // ID del asset en Contentful (obligatorio)
  title?: string; // Título descriptivo (opcional)
  img?: string; // URL de la imagen optimizada (opcional)
  url?: string; // Enlace externo o de navegación (opcional)
}
