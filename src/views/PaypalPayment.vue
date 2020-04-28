<template>
    <v-container fluid>

    <toolbar-principal></toolbar-principal>

<h1>En stripe curso {{idCurso}} </h1>

    </v-container>
</template>

<script>
import ToolbarPrincipal from "../components/ToolbarPrincipal";
import { mapGetters } from "vuex";
export default {
    created(){
        this.categoriaId = this.$route.params.idCategoria;
        this.idCurso = this.$route.params.id;

        if (this.categoriaId == 0) {
            
            this.cargarCursosTodos();

        }else{

            this.cargarCursos();

        }

        this.obtenerCategoria();

    },
    computed: {
    	...mapGetters({ currentUser: "currentUser" })
    },
    data () {
        return {
            data:"hola",
            categoria:"",
            categorias:[],
            cursos:[],
            categoriaId:null,
            medallas:"",
            idMedallaPrimerCurso:"",
        }
    },
    methods:{
        cargarCursosTodos(){
            this.$http
                .get("wp/v2/curso")
                .then(request => {
                    
                    this.cursos = request.data;

                })
                .catch(() => {

                });
        },
        cargarCursos(){
            this.$http
                .get("wp/v2/curso?categories="+this.categoriaId)
                .then(request => {
                    this.cursos = request.data;
                    console.log(this.cursos);
                })
                .catch(() => {

                });
        },
        obtenerCategoria(){
            this.$http
                .get("wp/v2/categories/" + this.categoriaId)
                .then(request => {
                    this.categoria = request.data;
                    console.log(this.cursos);
                })
                .catch(() => {

                });
        },
        ingresarCurso (idCurso) {
            this.loading = true
            this.$router.push("/cursos/"+idCurso);
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
    },
    components:{
        ToolbarPrincipal
    }

}
</script>

<style>

</style>