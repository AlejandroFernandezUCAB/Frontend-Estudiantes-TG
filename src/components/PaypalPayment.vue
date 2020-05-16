<template>
<v-container class="pa-0"> 
  <v-card v-if="!load">
    <v-card-title v-if="!paidFor">
      Comprar el Curso {{curso.nombre}}- por ${{ monto }}
	</v-card-title>
	<v-card-text v-if="!paidFor">
		Ud está comprando el curso: <strong>{{this.curso.nombre}}</strong> por un monto de <strong>${{monto}}</strong>
		<br>
		Seleccione el tipo de pago:
	</v-card-text>

    <v-card-text v-if="paidFor">
      ¡Gracias por comprar el Curso!
    </v-card-text>

    <div class="mx-5" ref="paypal" v-if="!paidFor"></div>
  </v-card>
   <div v-else>
            <v-overlay style="z-index: 9999" :value="overlay">
                <v-progress-circular color="yellow" indeterminate size="64"></v-progress-circular>
            </v-overlay>
        </div>
  </v-container > 
   
</template>

<script>

import { mapGetters } from "vuex";
import ToolbarPrincipal from "../components/ToolbarPrincipal";
// import image from "../assets/lamp.png"
export default {
	props:["idCurso"],
	name: "HelloWorld",
		components: {
		ToolbarPrincipal,
	},
	created(){
    	//this.idCurso = this.$route.params.idCurso;
	   // this.monto = this.$route.params.monto;
	   console.log("test")
       this.getMonto(this.idCurso);
       //this.load=false;
    },
  data: function() {
    return {
      loaded: false,
      paidFor: false,
      load:true,
      idCurso:"",
      monto:0,
      medallas:"",
      curso:[],
      idMedallaPrimerCurso:"",
      product: {
        description: "Curso"
      }
    };
  },
    
  computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },
  mounted: function() {
    // const script = document.createElement("script");
    // script.src =
    //   "https://www.paypal.com/sdk/js?client-id=AYsB9nY_rzThPLvq0rM7HF8uquDQDEBKk7QVls6qAzX-8CifZ5OHPkdQd8lexM4XhT8kVYo7r8DKi6FR&currency=USD";
    // script.addEventListener("load", this.setLoaded);
    // document.body.appendChild(script);
  },
  methods: {
    getMonto(idCurso){
      this.$http
      .get("wp/v2/curso/"+idCurso)
      .then(request => {
        this.curso = request.data;
        console.log(this.curso);
        this.monto=request.data.costo;
        this.init();
        this.load=false;

        })
      .catch((error) => { console.log(error)});
    },
    init(){
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AYsB9nY_rzThPLvq0rM7HF8uquDQDEBKk7QVls6qAzX-8CifZ5OHPkdQd8lexM4XhT8kVYo7r8DKi6FR&currency=USD";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
    },
    setLoaded: function() {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.product.description,
                  amount: {
                    currency_code: "USD",
                    value: this.monto
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            console.log(order);
            this.registrarPago(order);
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
    },
    
    registrarPago(order){
         this.$http
            .post("my_rest_server/v1/paypal/registerPayment", {
                username: localStorage.username,
                id_course: this.idCurso,
                id_transaction:order.id,
                monto:order.purchase_units[0].amount.value,
            })
            .then(request => {
               this.comprarCurso(this.idCurso)
            })
            .catch(error => console.log(error));

    },
    comprarCurso( cursoId ){
            this.$http
            .post("my_rest_server/v1/user-inscribed", {
                username: localStorage.username,
                courseID: cursoId
            })
            .then(request => {
                this.checkBadgesActive();
                this.$router.push("/mis-cursos");
            })
            .catch(error => console.log(error));

        },
         checkBadgesActive(){
 			this.$http
            .get("wp/v2/medalla")
            .then(request => {
                this.medallas=request.data;
                console.log(this.medallas);
				this.searchCondition("Primer Curso Adquirido");
            })
               .catch((error) => { console.log(error)});
        },
        searchCondition(condition){
		
			for (let i = 0; i < this.medallas.length; i++) {
				const element = this.medallas[i];
				if( element.condicion[0].includes(condition)){
					console.log(condition);
					this.idMedallaPrimerCurso=element.id;
		 	 		this.checkFirstCourseBadge(condition);
		 	 		break;
        			}
      			}
		},
        checkFirstCourseBadge(condition){
             this.$http
            .post("my_rest_server/v1/users/courses/user_inscribed_by_username", {
                    username: this.currentUser.username
                })
            .then(request => { 
				if(request.data.length==1){
					this.addBadgeFirstLesson(condition);
				}
                  console.log(request.data)
            })
            .catch((error) => { console.log(error)});
        },
          addBadgeFirstLesson(condition){
   		 this.$http
            .post("my_rest_server/v1/badges/addUserBadges", {
				username: this.currentUser.username,
				id_badge:this.idMedallaPrimerCurso
            })
            .then(request => { 
				alert("Obtuvo la medalla "+condition)
                console.log(request.data)
                })
            .catch((error) => { console.log(error)});
	  }
  }
};
</script>