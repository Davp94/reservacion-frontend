import { StateDto } from "../dto/state.dto";
import { StateEnum } from "../enum/state.enum";

export const stateValues: StateDto[] = [
    {
        key: StateEnum.INACTIVO,
        value: 'Inactivo'
    },
    {
        key: StateEnum.ACTIVO,
        value: 'Activo'
    },
]