<template>
  <v-container > 
   
    <toolbar-principal></toolbar-principal>
    <div v-if="!load">
      <div v-if="showGenerate">
          <stripe-elements
            ref="elementsRef"
            :pk="publishableKey"
            :amount="amount"
            @token="tokenCreated"
            @loading="loading = $event"
          >
          </stripe-elements>
          <v-btn color="yellow" @click="submit">Paga con Stripe ${{monto}}</v-btn >

          <div v-if="!paidFor">
            <h1>Comprar el Curso {{curso.nombre}}- to ${{ monto }}</h1>

          </div>

          <div v-if="paidFor">
            <h1>Gracias por comprar el Curso!</h1>
          </div>

          <div ref="paypal"></div>
      </div>
      <div v-else>
        <p>No cumple con los requerimientos para un certificado</p>
      </div>
    </div>
     <div v-else>
            <v-overlay style="z-index: 9999" :value="overlay">
                <v-progress-circular color="yellow" indeterminate size="64"></v-progress-circular>
            </v-overlay>
        </div>
  </v-container > 
</template>
 
<script>
import { StripeElements } from 'vue-stripe-checkout';
import ToolbarPrincipal from "../components/ToolbarPrincipal";
import { mapGetters } from "vuex";
export default {
  components: {
    StripeElements,
    ToolbarPrincipal
  },
   created(){
        this.idCurso = this.$route.params.idCurso;
        
        this.checkShowGenerate();
        
       
        //this.monto = 10;
    },
      computed: {
        ...mapGetters({ currentUser: "currentUser" })
    },
  data: () => ({
    idCurso:"",
    monto:0,
    showGenerate:false,
    paidFor: false,
    loading: false,
    load: true,
    amount: 1000,
    publishableKey: "pk_test_l3U9oFi4ram09VCHoCDvDcVv00gD0UU9UG", 
    token: null,
    charge: null,
    medallas:"",
    idMedallaPrimerCurso:"",
    totalEvaluation:0,
    totalAprobado:0,
    product: {
        description: "Curso"
      }
  }),
  methods: {
      checkShowGenerate(){
            this.searchTotalEvaluation(this.idCurso);
        },
        searchTotalEvaluation(idCurso){
             this.$http
                .get("wp/v2/curso/"+idCurso)
                .then(request => {
                    console.log(request.data)

                     request.data.modulo.forEach(modulo => {
                         let keys = Object.keys(modulo.leccion);
                         keys.forEach(key => {
                             if(modulo.leccion[key].evaluacion){
                                this.totalEvaluation++;
                            }
                         })
                     })
                     console.log(this.totalEvaluation);
                     this.checkTotalAprobado();
                })
                .catch((error) => { console.log(error)});
        },
        checkTotalAprobado(){
            var porcentaje;
            this.$http
            .post("my_rest_server/v1/certificate/totalApprove", {
                username: this.currentUser.username,
                id_course: this.idCurso
            })
            .then(request => { 
                console.log(request.data)
                this.totalAprobado= request.data[0].cantidadAprobado;
                porcentaje = (this.totalAprobado*100)/this.totalEvaluation;
                console.log(porcentaje);
                if(porcentaje>=80){
                    this.showGenerate=true;
                }
                this.getMonto(this.idCurso);
                this.load=false;
            })
            .catch((error) => { console.log(error)});
        },
    getMonto(idCurso){
      this.$http
      .get("wp/v2/curso/"+idCurso)
      .then(request => {
        this.curso = request.data;
        console.log(this.curso);
        this.monto=5;
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
    submit () {
      this.$refs.elementsRef.submit();
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
            this.registrarPagoPaypal(order);
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
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
                this.registrarPagoStripe(request);
                
            })
            .catch(error => console.log(error));
    },
    registrarPagoStripe(request){
         this.$http
            .post("my_rest_server/v1/stripe/registerPaymentPhysical", {
                username: localStorage.username,
                id_course: this.idCurso,
                id_transaction:request.data.id,
                monto:request.data.amount/100
            })
            .then(request => {
               this.registrarCertificadoFisico(this.idCurso);
               alert("Certificado Comprado Satisfactoriamente")
            })
            .catch(error => console.log(error));

    },
     registrarPagoPaypal(order){
         this.$http
            .post("my_rest_server/v1/paypal/registerPaymentPhysical", {
                username: localStorage.username,
                id_course: this.idCurso,
                id_transaction:order.id,
                monto:order.purchase_units[0].amount.value,
            })
            .then(request => {
              this.registrarCertificadoFisico(this.idCurso);
              alert("Certificado Comprado Satisfactoriamente")
            })
            .catch(error => console.log(error));

    },
    registrarCertificadoFisico(idCurso){
            this.$http
            .post("my_rest_server/v1/certificate/generatePhysical", {
                username: this.currentUser.username,
                id_course: idCurso
            })
            .then(request => { 
                console.log(request);
                })
            .catch((error) => { console.log(error)});
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