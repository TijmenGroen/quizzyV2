<script setup>
import {onMounted, ref} from "vue";
import QuestionOverview from "../components/QuestionOverview.vue";

const currentQuizDir = ref(null)
const quizActive = ref(false)
const optionsBoxOpen = ref(false)

const quizData = ref({});
const activeQuestion = ref(null);

function setActive(index) {
  activeQuestion.value = index;
}

async function loadQuiz() {
  currentQuizDir.value = await window.electronAPI.openDirectory();
  quizActive.value = true;
  quizData.value = await window.electronAPI.readDataFile(currentQuizDir.value)
}

function addQuestion(questionType) {
  switch (questionType) {
    case questionType = "finale":
      quizData.value.questions.push({
        "name": "New Question",
        "type": "Finale",
        "answers": [],
        "correctAnswer": ""
      })
  }

  optionsBoxOpen.value = false
}

function openOptionsBox() {
  optionsBoxOpen.value = true
}

onMounted(() => {
  loadQuiz()
})
</script>

<template>
    <div class="options-container" v-if="optionsBoxOpen">
      <div class="options-box">
        <h1>Add Question</h1>
        <div class="option-types">
          <div class="option" v-on:click="addQuestion('finale')">
            Finale
          </div>
        </div>
      </div>
    </div>
  <div class="editor-container">
    <div v-if="quizActive" class="quiz-active">
      <div style="display: flex; flex-direction: column">
        <button v-on:click="openOptionsBox" class="add-button">Add Question</button>
        <question-overview :questions=quizData.questions :set-active="setActive" :active-question="activeQuestion"/>
      </div>
      <div class="editor-canvas">
        <div>
      <h1>{{ quizData.title }}</h1>
      <h3>{{ currentQuizDir }}</h3>
        </div>
        <div class="editor-inputs">
          <div class="inputs">Question:
          <input>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      Wait for directory to open
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

.options-container {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.options-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: darkgray;
  padding: 12px;
}

.option-types {
  display: flex;
  justify-content: space-around;
}

.option {
  background-color: #1B1E74;
  cursor: pointer;
}

.editor-container {
  height: 100vh;
  width: 100vw;
  background-image: url('../assets/img/BGPanel.png');
  background-repeat: repeat;
  background-size: 176px;
}

.quiz-active {
  display: flex;
  height: 100%;
}

.editor-canvas {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.editor-inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-button {
  width: 100%;
}
</style>