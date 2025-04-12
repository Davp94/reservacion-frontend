import { HorarioDto } from "./horario.dto";

export interface ReservacionDto {
    id: number;
    comentario: string;
    horario: HorarioDto;
}