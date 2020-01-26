import { Model } from 'vue-mc'

/**
 * Task model
 */
export default class UserM extends Model {

    // Default attributes that define the "empty" state.
    defaults() {
        return {
            username:   null,
            nombre: null,
            apellido: false,
            companiaUniversidad: null,
            profesion:null,
            pais:null,
            email:null,
            email_usuario:null,
            password:null
        }
    }

}