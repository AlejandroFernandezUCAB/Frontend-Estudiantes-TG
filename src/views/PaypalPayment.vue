<template>
  <div>
    <div v-if="!paidFor">
      <h1>Buy this Curso - to ${{ monto }}</h1>

      <p>{{ product.description }}</p>

    </div>

    <div v-if="paidFor">
      <h1>Noice, you bought a beautiful lamp!</h1>
    </div>

    <div ref="paypal"></div>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
// import image from "../assets/lamp.png"
export default {
  name: "HelloWorld",
created(){
        this.idCurso = this.$route.params.idCurso;
        this.monto = this.$route.params.monto;
    },
  data: function() {
    return {
      loaded: false,
      paidFor: false,
      idCurso:"",
      monto:0,
      medallas:"",
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
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AYsB9nY_rzThPLvq0rM7HF8uquDQDEBKk7QVls6qAzX-8CifZ5OHPkdQd8lexM4XhT8kVYo7r8DKi6FR&currency=USD";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  methods: {
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