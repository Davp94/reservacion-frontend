import { EmpresaDto } from "../core/dto/empresa.dto"
import { HorarioDto } from "../core/dto/horario.dto"
import { UsuarioDto } from "../core/dto/usuario/usuario.dto"

export type StateModel = {
    userData: UsuarioDto | null,
    empresa: EmpresaDto | null
    horarios: HorarioDto[] | null,
}