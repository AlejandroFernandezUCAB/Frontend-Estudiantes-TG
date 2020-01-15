<template >
    <v-container class="background-img" fill-height fluid>
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
            <h1 class="display-1 py-10">Iniciar sesión</h1>
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                class="px-7 py-5"
            >
                <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Correo electrónico"
                required
                color="success"
                ></v-text-field>

                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Contraseña"
                required
                color="success"
                ></v-text-field>

                <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="¿Recordar contraseña?"
                required
                ></v-checkbox>

                <v-btn
                color="success"
                class="mr-4"
                @click="reset"
                >
                Olvíde la contraseña
                </v-btn>

                <v-btn
                color="verde"
                @click="resetValidation"
                >
                    <span class="font-color">Ingresar</span>
                </v-btn>
            </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import light from '../plugins/vuetify'

export default {
    data () {
      return {
          primary:light.primary
      }
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