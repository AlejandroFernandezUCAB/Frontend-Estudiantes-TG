<template>
  <div class>
    <div class="alert alert-danger" v-if="msg">{{ msg }}</div>
    <div class="alert alert-danger" v-if="present">{{ present }}</div>
    <div v-if="find">
      <div v-if="notPresent">
        <h1>Test ---- {{ idLesson }}----{{ idEvaluation }}-----{{type_evaluation}}</h1>
        <!-- Comenzar quiz -->
        <button @click="startQuiz" v-if="!start">START!</button>

        <div v-if="start">
          <div v-for="(question, index) in questions" v-bind:key="question.id">
            <div v-show="index === questionIndex">
              <h2>{{ question.post_title }}</h2>
              <div v-if="question.tipo_de_pregunta === 'Simple'">
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
              </div>

              <div v-if="question.tipo_de_pregunta === 'Multiple'">
                <v-checkbox
                  v-model="userResponses[index]"
                  multiple
                  v-for="(response) in question.respuesta "
                  v-bind:key="response.id"
                  :label="response.respuesta"
                  :value="response.respuesta"
                ></v-checkbox>
              </div>

              <div v-if="question.tipo_de_pregunta === 'Texto Simple'">
                <v-textarea
                  solo
                  v-bind:name="index"
                  label="Respuesta"
                  v-model="userResponses[index]"
                ></v-textarea>
              </div>

              <!-- <button v-if="questionIndex > 0" v-on:click="prev">prev</button> -->
              <div v-if="!answered">
                <button
                  v-on:click="checkasnwer(userResponses[index],question,index )"
                  v-if="!answerWrong"
                >Responder</button>
              </div>

              <!-- Se verifica si la respuesta fue respondida y luego se muestra si es correcta o incorrecta y el siguiente, en caso de ser incorrecta se muestra el feedback -->
              <div v-if="answered">
                <div v-if="answerWrong">
                  <p>La Respuesta es incorrecta</p>
                  <p>{{question.feedback}}</p>
                  <button v-on:click="next(question,index)">next</button>
                </div>
                <div v-else>
                  <p>La Respuesta es correcta</p>
                  <button v-on:click="next(question,index)">next</button>
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
      present: false,
      answered: false,
      answerWrong: false,
      start: false,
      evaluation: [],
      questionIndex: 0,
      find: false,
      notPresent: true,
      msg: false,
      idLesson: this.$route.params.idLesson,
      idEvaluation: this.$route.params.idEvaluation,
      title: "",
      type_evaluation: "",
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
          console.log(request);
          this.checkPresent();
          this.getDataEvaluation(request);
        })
        .catch(error => (this.msg = "No se ha encontrado la Evaluacion"));
    },
    checkPresent() {
      // Se verifica si el usuario ya presento la evaluacion
      this.$http
        .post("my_rest_server/v1/user-evaluation", {
          user: localStorage.username,
          id_lesson: this.idLesson,
          id_evaluation: this.idEvaluation
        })
        .then(request => {
          console.log(request);
          this.find = true;
          if (request.data.length !== 0) {
            this.notPresent = false;
            this.present =
              "Ya presento la evaluacion, puntaje obtenido " +
              request.data[0].puntaje;
          }
        })
        .catch(error => console.log(error));
    },
    getDataEvaluation(request) {
      this.evaluation = request.data;
      this.title = request.data.title.rendered;
      this.questions = request.data.preguntas;
      if (this.evaluation.evaluativa_o_formativa === "0") {
        this.type_evaluation = "Formativa";
      } else {
        this.type_evaluation = "Evaluativa";
      }
    },
    checkasnwer(response, question, index) {
      // Se verifica si la respuesta seleccionada es correcta
      this.answered = true;
      console.log("en responder");
      console.log(response);

      if (question.tipo_de_pregunta === "Simple") {
        if (!response) {
          this.answerWrong = true;
        }
      }

      if (question.tipo_de_pregunta === "Texto Simple") {
        if (response.toLowerCase() !== question.respuesta[0].respuesta.toLowerCase()) {
          this.answerWrong = true;
        }
      }

      if (question.tipo_de_pregunta === "Multiple") {
        this.checkMultiple(response, question, index);
      }
    },
    checkMultiple(response, question, index) {
      var i;
      var j;
      var badAnswerd = false;
      for (i = 0; i < question.respuesta.length; i++) {
        for (j = 0; j < response.length; j++) {
          if (question.respuesta[i].respuesta === response[j]) {
            if (question.respuesta[i].correcta !== "1") {
              badAnswerd = true;
              break;
            }
            break;
          }
        }
        if (badAnswerd) {
          break;
        }
      }

      if (badAnswerd) {
        this.answerWrong = true;
      }
    },
    // Go to next question
    next(question, index) {
      // if (question.tipo_de_pregunta === "Texto Simple") {
      //       if (this.answerWrong) {
      //         this.userResponses[index] = false;
      //       } else {
      //         this.userResponses[index] = true;
      //       }
      //     }

      this.questionIndex++;

      if (this.answerWrong) {
        this.userResponses[index] = false;
      } else {
        this.userResponses[index] = true;
      }

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
    controlCheckBox(indexQuestion, indexAnswer) {
      //en caso de seleccionar un checkbox se borrara el checkbox por default
      //en caso contrario si se deselecciona todos los checkbox se activa el checkbox default
      if (this.answers[indexQuestion].length > 0) {
        //se verifica si el primer elemento es el checkbbox por default
        //en caso de serlo se deselecciona.
        if (this.answers[indexQuestion][0] == false) {
          this.answers[indexQuestion].splice(0, 1);
        }

        //answers[indexQuestion][indexAnswer]
      } else {
        this.answers[indexQuestion].splice(0, 0, false);
      }
    },
    getTotal() {
      // Se obtiene el puntaje total obtenido, basado en el puntaje total de la evaluacion y en las respuestas correctas
      this.totalScored =
        this.evaluation.puntaje_evaluacin *
        (this.correctAnswer / this.questions.length);
      if (this.type_evaluation === "Evaluativa") {
        this.sendScored();
        console.log("entre en evaluation formativa");
      }

      return this.totalScored;
    },
    sendSored() {}
  }
};
</script>
