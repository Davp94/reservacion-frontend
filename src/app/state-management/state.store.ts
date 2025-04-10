import { computed } from "@angular/core";
import { StateModel } from "./state.model.type"
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { UsuarioDto } from "../core/dto/usuario/usuario.dto";
import { EmpresaDto } from "../core/dto/empresa.dto";
type AppState = {
    resState: StateModel,
}

const initialState: AppState = {
    resState: {
        userData: null,
        empresa: null,
    }
}

export const ResStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({resState}) => ({
        userData: computed(() => resState.userData()),
        username: computed(() => resState.userData()?.username),
        empresa: computed(() => resState.empresa())
    })),
    withMethods(store => ({
        addUserData(userData: UsuarioDto){
            patchState(store, {
                resState: {
                    ...store.resState(),
                    userData: userData
                }
            })
        },
        addEmpresa(empresa: EmpresaDto){
            patchState(store, {
                resState: {
                    ...store.resState(),
                    empresa: empresa
                }
            })
        },
        restartState(){
            patchState(store, {
                resState: {
                    userData: null,
                    empresa: null, 
                }
            })
        }
    }))
)