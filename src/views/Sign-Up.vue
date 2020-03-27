<template >
    <v-container class="background-img" fill-height fluid>
        <toolbar-principal></toolbar-principal>
        <v-row>
            <v-col 
                cols="9"
                xs="7"
                md="7"
                sm="9"
                lg="6"
                xl="7"
                offset="2"
                offset-xs="5"
                offset-md="2"
                offset-sm="2"
                offset-xl="2"
                offset-lg="3"
                class="background-form my-10"
                align="center"
                justify="center"
            >
            <h1 class="display-1 py-10">Regístrate</h1>
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                class="px-7 pb-5"
            >
                <v-text-field
                    v-model="nombreUsuario"
                    :rules="nombreRules"
                    label="Nombre de Usuario"
                    required
                    color="success"
                ></v-text-field>

                <v-text-field
                    v-model="nombre"
                    :rules="nombreRules"
                    label="Nombre"
                    required
                    color="success"
                ></v-text-field>

                <v-text-field
                    v-model="apellido"
                    :rules="nombreRules"
                    label="Apellido"
                    required
                    color="success"
                ></v-text-field>

                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Correo electronico"
                    required
                    color="success"
                ></v-text-field>

                <v-text-field
                    :append-icon="showContrasena ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showContrasena ? 'text' : 'password'"
                    hint="Debe tener al menos 8 caracteres"
                    counter
                    @click:append="showContrasena = !showContrasena"
                    v-model="contrasena"
                    :rules="contrasenaRules"
                    label="Contraseña"
                    required
                    color="success"
                ></v-text-field>

                <v-text-field
                    v-model="contrasenaVef"
                    :rules="contrasenaRules"
                    label="Confirma la contraseña"
                    required
                    color="success"
                    :append-icon="showContrasenaVef ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showContrasenaVef ? 'text' : 'password'"
                    hint="Debe tener al menos 8 caracteres"
                    counter
                    @click:append="showContrasenaVef = !showContrasenaVef"
                ></v-text-field>

                <v-select
                    v-model="pais" 
                    :items="paises" 
                    color="success"
                    label="País" 
                    :rules="campoRequerido">
                </v-select>

                <v-text-field 
                    color="success"
                    label="Compañia/Universidad" 
                    v-model="companiaUniversidad" 
                    :rules="campoRequerido" 
                    required>
                </v-text-field>

                <v-text-field 
                    label="Profesión" 
                    v-model="profesion" 
                    :rules="campoRequerido" 
                    color="success"
                    required>
                </v-text-field>

                <v-btn
                    color="verde"
                    @click="crearCuenta"
                >
                    <span class="font-color">Crear mi cuenta</span>
                </v-btn>
            </v-form>
            <v-snackbar
                v-model="snackbar"
                >
                {{snackbartext}}
                <v-btn
                    light
                    color="error"
                    text
                    @click="snackbar = false"
                >
                    Cerrar
            </v-btn>
            </v-snackbar>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import light from '../plugins/vuetify'
import { mapGetters } from "vuex";
import ToolbarPrincipal from '../components/ToolbarPrincipal';
import UserM from "../models/UserM";

export default {
    data () {
        return {
            snackbar: false,
            snackbartext:"",
            primary:light.primary,
            nombreUsuario:"",
            nombre:"",
            apellido:"",
            email:"",
            contrasena:"",
            showContrasena:false,
            contrasenaVef:"",
            showContrasenaVef:false,
            companiaUniversidad:"",
            emailRepetido:false,
            contrasenaRules:[
                v => !!v || 'Este campo es obligatorio',
                v => v.length >= 8 || 'Este campo debe tener minimo 4 caracteres',
            ],
            profesion:"",
            nombreRules: [
                v => !!v || 'Este campo es obligatorio',
                v => v.length >= 4 || 'Este campo debe tener minimo 4 caracteres',
            ],
            emailRules: [
                v => !!v || 'El email es requerido',
                v => /.+@.+/.test(v) || 'Este email debe ser válido',
                v => !this.emailRepetido || "Este email ya se encuentra en uso"
            ],
            campoRequerido:[
                v => !!v || 'Este campo es obligatorio',
            ],
            pais:"",
            valid:true,
            paises: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antarctica", "Antigua and Barbuda",
"Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
"Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana",
"Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
"Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic",
"Congo, Republic of the", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark",
"Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
"Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
"Greece", "Greenland", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong",
"Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
"Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
"Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar",
"Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
"Moldova", "Mongolia", "Morocco", "Monaco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
"Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru",
"Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Samoa", "San Marino", " Sao Tome",
"Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
"Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden",
"Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago",
"Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
"Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"]
      }
    },
    methods:{
        registroExitoso(){
            this.$router.push("/login");
        },
        crearCuenta(){        
            const self = this;
            const http = this.$http;
            
            if (this.$refs.form.validate()){

                let userM = new UserM({
                        username: this.nombreUsuario,
                        nombre:this.nombre,
                        apellido:this.apellido,
                        compania_universidad:this.companiaUniversidad,
                        profesion:this.profesion,
                        pais:this.pais,
                        email:this.email,
                        email_usuario:this.email,
                        password:this.contrasena
                    });
                
                    this.$http.post("my_rest_server/v1/users/register", userM)
                        .then((response) => {
    
                            this.registroExitoso();

                        })
                        .catch( (error) =>{
                                
                            self.snackbar = true;
                            self.snackbartext = error.response.data.message;

                        }); 
            }
            
        }

    },
    components:{
        ToolbarPrincipal
    }
}
</script>

<style>
    .background-img{
        background-image: url("../assets/fondo.jpg")
    }
    .background-form{
        background-color: #E6E6E6;
        border-radius: 20px;
    }
    .font-color{
        color: white;
    }
</style>