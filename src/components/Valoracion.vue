<template>
	<div>
		<v-rating
		v-model="valoracion"
		background-color="#ffcd00"
		color="#ffcd00"
		hover
		@input="calificarUnCurso()"
		></v-rating>
		<h4 class="overline mx-3">
			Total: {{totalValoracion}}
		</h4>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    props:["idCurso"],
    data: () => ({

		valoracion:0,	
		totalValoracion:0,
		voto:false
	}),
	created(){
		this.valoracionDelCurso();
	},
	computed:{
		...mapGetters({ currentUser: "currentUser" }),
	},
	watch:{

	},
	methods:{
		valoracionDelCurso(){
			this.$http
				.post("/my_rest_server/v1/valoration/getValoration", 
				{
					id_course:this.idCurso
				})
				.then(request => {

					
					this.valoracion = Number(request.data.valoration);
					this.totalValoracion = Number(request.data.total);
					
				})
				.catch(() => {

				});
		},
		verificarLogin(){

			if(this.currentUser == null){

				this.$router.push("/login");
				this.$router.go();
				return false;

			}else{

				return true; 

			}

		},
		calificarUnCurso(){
			this.verificarLogin();
			this.$http
				.post("/my_rest_server/v1/valoration/addValoration",
				{
					user:this.currentUser.username,
					id_course:this.idCurso,
					puntaje:this.valoracion
				})
				.then(request => {

					this.valoracionDelCurso();

				})
				.catch(() => {

				});
		}
	}
}
</script>

<style>

</style>