<template>
  <v-container>
    <v-row no-gutters>
        <v-col md="12">
            <h1 class="display-2 text-center">Perfil</h1>
            <section>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row justify="center">
                            <v-col class="no-padding" cols="8"  sm="8" md="8">
                                <v-text-field label="Nombre de usuario" v-model="username" :rules="nameRules" required>
                                </v-text-field>
                            </v-col>
                            <v-col class="no-padding" cols="8" sm="8" md="8">
                                <v-text-field label="Nombre" v-model="nombre" :rules="nameRules" required>
                                </v-text-field>
                            </v-col>
                            <v-col class="no-padding" cols="8" sm="8" md="8">
                                <v-text-field label="Apellido" v-model="name" :rules="nameRules" required>
                                </v-text-field>
                            </v-col>
                            <v-col class="no-padding" cols="8" sm="8" md="8">
                                <v-text-field label="Email" v-model="email" :rules="nameRules" required>
                                </v-text-field>
                            </v-col>
                            <v-col class="no-padding" cols="8" sm="8" md="8">
                                <v-select :items="paises" label="País">
                                </v-select>
                            </v-col>
                            <v-col class="no-padding" cols="8" sm="8" md="8">
                                <v-text-field label="Compañia/Universidad" v-model="companiaUniversidad" :rules="nameRules" required>
                                </v-text-field>
                            </v-col>
                            <v-col class="no-padding" cols="8" sm="8" md="8">
                                <v-text-field label="Profesión" v-model="name" :rules="nameRules" required>
                                </v-text-field>
                            </v-col>
                            <v-col class="no-padding text-center" cols="8" sm="8" md="8"  justify="center">
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

export default {
    name: 'perfil',
    data:() => ({
        valid: true,
        nombre: "",
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
    })
}
</script>

<style scoped>
    .no-padding{
        padding: 0;
    }
</style>
