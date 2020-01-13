<template>
  <div class>
    <div class="alert alert-danger" v-if="msg">{{ msg }}</div>
    <div v-if="find">
      <h1>Test ---- {{ idLesson }}----{{ idEvaluation }}</h1>
      <!-- Comenzar quiz -->
      <button @click="startQuiz" v-if="!start">START!</button>

      <div v-if="start">
        <div v-for="(question, index) in questions" v-bind:key="question.id">
          <div v-show="index === questionIndex">
            <h2>{{ question.post_title }}</h2>
            <ol>
              <li v-for="response in question.respuesta" v-bind:key="response.id">
                <label>
                  <!-- The radio button has three new directives -->
                  <!-- v-bind:value sets "value" to "true" if the response is correct -->
                  <!-- v-bind:name sets "name" to question index to group answers by question -->
                  <!-- v-model creates binding with userResponses -->

                  <input
                    type="radio"
                    v-bind:value=" (response.correcta==='1') ? true : false"
                    v-bind:name="index"
                    v-model="userResponses[index]"
                  />
                  {{response.respuesta}}
                </label>
              </li>
            </ol>
            <!-- <button v-if="questionIndex > 0" v-on:click="prev">prev</button> -->
            <button v-on:click="checkasnwer(userResponses[index])" v-if="!answerWrong">Responder</button>
            <!-- Se verifica si la respuesta fue respondida y luego se muestra si es correcta o incorrecta y el siguiente, en caso de ser incorrecta se muestra el feedback -->
            <div v-if="answered">
              <div v-if="answerWrong">
                <p>La Respuesta es incorrecta</p>
                <p>{{question.feedback}}</p>
                <button v-on:click="next">next</button>
              </div>
              <div v-else>
                <p>La Respuesta es correcta</p>
                <button v-on:click="next">next</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- termina for de preguntas -->

      <div v-show="questionIndex === this.questions.length">
        <h2>Quiz finished</h2>
        <p>Respuestas Correctas: {{ score() }} / {{ this.questions.length }}</p>
        <p>Puntaje total : {{getTotal()}} / {{this.evaluation.puntaje_evaluacin}}</p>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "SingleLesson",
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  },
  mounted() {
    this.checkEvaluation();
  },
  created() {
    this.checkCurrentLogin();
  },
  updated() {
    this.checkCurrentLogin();
  },
  data() {
    return {
      answered: false,
      answerWrong: false,
      start: false,
      evaluation: [],
      questionIndex: 0,
      find: false,
      msg: false,
      idLesson: this.$route.params.id,
      idEvaluation: this.$route.params.idEvaluation,
      title: "",
      userResponses: [],
      questions: [],
      correctAnswer: 0,
      totalScored: 0
    };
  },
  methods: {
    checkCurrentLogin() {
      if (!this.currentUser && this.$route.path !== "/") {
        this.$router.push("/?redirect=" + this.$route.path);
      }
    },
    checkEvaluation() {
      // Se verifica que la evaluacion existe y de ser asi se asigna la respuesta a una variable y el array de preguntas
      this.$http
        .get("/wp/v2/evaluacion/" + this.idEvaluation)
        .then(request => {
          this.find = true;
          console.log(request);
          this.getDataEvaluation(request);
        })
        .catch(error => (this.msg = "No se ha encontrado la leccion"));
    },
    getDataEvaluation(request) {
      this.evaluation = request.data;
      this.title = request.data.title.rendered;
      this.questions = request.data.preguntas;
    },
    checkasnwer(response) {
      // Se verifica si la respuesta seleccionada es correcta
      this.answered = true;
      if (!response) {
        this.answerWrong = true;
      }
    },
    // Go to next question
    next() {
      this.questionIndex++;
      this.answered = false;
      this.answerWrong = false;
    },
    // Return "true" count in userResponses
    score() {
      // Se obtiene el total de respuestas correctas
      this.correctAnswer = this.userResponses.filter(function(val) {
        return val;
      }).length;
      return this.correctAnswer;
    },
    startQuiz() {
      this.start = true;
    },
    getTotal() {
      // Se obtiene el puntaje total obtenido, basado en el puntaje total de la evaluacion y en las respuestas correctas
      this.totalScored =
        this.evaluation.puntaje_evaluacin *
        (this.correctAnswer / this.questions.length);
      return this.totalScored;
    }
  }
};
</script>
