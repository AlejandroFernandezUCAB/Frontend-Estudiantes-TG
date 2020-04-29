<template>
  <div>
    <stripe-elements
      ref="elementsRef"
      :pk="publishableKey"
      :amount="amount"
      @token="tokenCreated"
      @loading="loading = $event"
    >
    </stripe-elements>
    <button @click="submit">Pay ${{monto}}</button>
  </div>
</template>
 
<script>
import { StripeElements } from 'vue-stripe-checkout';
import { mapGetters } from "vuex";
export default {
  components: {
    StripeElements
  },
   created(){
        this.idCurso = this.$route.params.idCurso;
        this.monto = this.$route.params.monto;
    },
      computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },
  data: () => ({
    idCurso:"",
    monto:0,
    loading: false,
    amount: 1000,
    publishableKey: "pk_test_l3U9oFi4ram09VCHoCDvDcVv00gD0UU9UG", 
    token: null,
    charge: null,
    medallas:"",
    idMedallaPrimerCurso:"",
  }),
  methods: {
    submit () {
      this.$refs.elementsRef.submit();
    },
    tokenCreated (token) {
      this.token = token;
      // for additional charge objects go to https://stripe.com/docs/api/charges/object
      this.charge = {
        source: token.id,
        amount: this.monto*100, // the amount you want to charge the customer in cents. $100 is 1000 (it is strongly recommended you use a product id and quantity and get calculate this on the backend to avoid people manipulating the cost)
        description: this.description // optional description that will show up on stripe when looking at payments
      }
      this.sendTokenToServer(this.charge);
    },
    sendTokenToServer (charge) {
        console.log(charge);
        this.$http
            .post("my_rest_server/v1/stripe/addCharge", {
                token: charge.source,
                monto: this.monto*100
            })
            .then(request => {
                console.log(request);
                this.registrarPago(request);
                
            })
            .catch(error => console.log(error));
    },
    registrarPago(request){
         this.$http
            .post("my_rest_server/v1/stripe/registerPayment", {
                username: localStorage.username,
                id_course: this.idCurso,
                id_transaction:request.data.id,
                monto:request.data.amount/100
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
}
</script> 