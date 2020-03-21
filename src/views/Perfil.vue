<template>
  <v-container>
    <toolbar-principal></toolbar-principal>
    <v-row no-gutters>
        <v-col md="4" sm="12" xs="12">
            <section class="py-2">
                <h1 class="display-2 text-center">Perfil</h1>
                <v-row no-gutters align="center" justify="center">
                    <v-col md="12" sm="12" xs="12" class="py-10">
                        <v-img src="https://picsum.photos/id/11/500/300" alt="Foto de perfil">
                        </v-img>
                    </v-col>
                    <v-col md="12" sm="12" xs="12">
                          <v-file-input
                            label="Foto de perfil"
                            prepend-icon="mdi-camera"
                        ></v-file-input>
                    </v-col>
                </v-row>
            </section>
        </v-col>
        <v-col md="8" sm="12" xs="12">
            <section>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row justify="center">
                            <v-col class="no-padding" cols="8" sm="8" md="8" xs="12">
                                <v-text-field label="Nombre de usuario" v-model="userM.name" :rules="campoRequerido" required>
                                </v-text-field>
                            </v-col>
                            <v-col class="no-padding" cols="8" sm="8" md="8" xs="12" >
                                <v-text-field label="Nombre" v-model="userM.nombre" :rules="campoRequerido" required>
                                </v-text-field>
                            </v-col>
                            <v-col class="no-padding" cols="8" sm="8" md="8" xs="12">
                                <v-text-field label="Apellido" v-model="userM.apellido" :rules="campoRequerido" required>
                                </v-text-field>
                            </v-col>
                            <v-col class="no-padding" cols="8" sm="8" md="8" xs="12">
                                <v-text-field label="Email" v-model="userM.email_usuario" :rules="emailRules" required>
                                </v-text-field>
                            </v-col>
                            <v-col class="no-padding" cols="8" sm="8" md="8" xs="12">
                                <v-select v-model="userM.pais" :items="paises" label="País" :rules="campoRequerido">
                                </v-select>
                            </v-col>
                            <v-col class="no-padding" cols="8" sm="8" md="8" xs="12">
                                <v-text-field label="Compañia/Universidad" v-model="userM.compania_universidad" :rules="campoRequerido" required>
                                </v-text-field>
                            </v-col>
                            <v-col class="no-padding" cols="8" sm="8" md="8" xs="12">
                                <v-text-field label="Profesión" v-model="userM.profesion" :rules="campoRequerido" required>
                                </v-text-field>
                            </v-col>
                            <v-col class="no-padding text-center" cols="8" sm="8" md="8" xs="12" justify="center">
                                <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                                    Guardar
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </section>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import UserM from "../models/UserM";
import ToolbarPrincipal from "../components/ToolbarPrincipal";

export default {
    
    name: 'perfil',
    data:() => ({
        userM:{
            id: "",
            name: "",
            nombre: "",
            apellido: "",
            email_usuario: "",
            compania_universidad: "",
            profesion: "",
            pais: "",
            imagen_usuario: ""
        },
        valid: true,
        campoRequerido: [
            v => !!v || 'Este campo es requerido'
        ],
        emailRules: [
            v => !!v || 'El email es requerido',
            v => /.+@.+\..+/.test(v) || 'El imail debe ser valido',
        ],
        nombre: "",
        apellido:"",
        username:"",
        email:"",
        companiaUniversidad:"",
        profesion:"",
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
"Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"],
    }),
    beforeCreate(){
        let user = new UserM();
        this.$http
            .get("https://aquilesypedrotesis.host/wp-json/wp/v2/users/me")
            .then(request => {
                this.userM = request.data;
                this.find = true;
                console.log(this.userM);
                console.log(request.data.imagen_usuario);
            })
            .catch(error => console.log(error));
    },
    methods:{
        validate () {

            if (this.$refs.form.validate()) {
                this.$http
                    .post("https://aquilesypedrotesis.host/wp-json/wp/v2/users/" + this.userM.id, {
                        nombre: this.userM.nombre,
                        apellido: this.userM.apellido,
                        compania_universidad: this.userM.compania_universidad,
                        profesion: this.userM.profesion,
                        pais: this.userM.pais
                    })
                    .then(request => this.edicionExitoso(request))
                    .catch(() => this.edicionFallido());
            }

        },
        edicionExitoso(req) {
            console.log("Editado exitoso")
            this.$router.go();
        },
        edicionFallido() {
            this.error = "Edit failed!";
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
    },
    components:{
        ToolbarPrincipal
    }
}
</script>

<style scoped>
    .no-padding{
        padding: 0;
    }
</style>
