<template >
  <v-parallax
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <v-container fill-height>
        <v-row>
            <v-col 
                cols="6"
                sm="6"
                lg="6"
                xl="6"
                offset-md="3"
                class="background-form my-10"
                align="center"
                justify="center"
            >
            <h1 class="display-1 py-10">Iniciar sesión</h1>
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
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
                label="Do you agree?"
                required
                ></v-checkbox>

                <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
                >
                Validate
                </v-btn>

                <v-btn
                color="error"
                class="mr-4"
                @click="reset"
                >
                Reset Form
                </v-btn>

                <v-btn
                color="warning"
                @click="resetValidation"
                >
                Reset Validation
                </v-btn>
            </v-form>
            </v-col>
        </v-row>
    </v-container>
  </v-parallax>
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
</style>