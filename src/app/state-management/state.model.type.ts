import { EmpresaDto } from "../core/dto/empresa.dto"
import { UsuarioDto } from "../core/dto/usuario/usuario.dto"

export type StateModel = {
    userData: UsuarioDto | null,
    empresa: EmpresaDto | null
}