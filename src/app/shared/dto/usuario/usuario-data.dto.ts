import { UsuarioDto } from "../../../core/dto/usuario/usuario.dto";
import { OperationEnum } from "../../enum/operation.enum";

export interface UsuarioDataDto {
    data: UsuarioDto,
    operation: OperationEnum
}