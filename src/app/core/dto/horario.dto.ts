export interface HorarioDto {
    id: number;
    fecha: Date;
    hora_inicio: string;
    hora_fin: string;
    estado: number;
    empresaNombre: string;
    empresaId: number;
}