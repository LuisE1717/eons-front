export interface INotifications{
    id: number;
    id_usuario: string | null;
    name: string | null;
    tipo: string | null;
    descripcion: string | null;
    estado: boolean | null;
    date: Date;
}