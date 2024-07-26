export interface Dialog {
  id: number;
  descripcion: string;
  respuesta: string;
  id_usuario: string;
  fecha: Date;
  tipo: string;
  favorito: boolean;
}

export interface ModalProps {
  id: number;
  type: "delete";
}
