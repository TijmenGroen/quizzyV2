<script setup>
import {onMounted, ref} from "vue";
import QuestionOverview from "../components/edit/QuestionOverview.vue";
import FinaleEditor from "../components/edit/FinaleEditor.vue";

const currentQuizDir = ref(null)
const quizActive = ref(false)
const optionsBoxOpen = ref(false)

const quizData = ref({
  title: "",
  questions: []
});

const activeQuestion = ref(0);

function setActive(index) {
  activeQuestion.value = index;
}

async function loadQuiz() {
  currentQuizDir.value = await window.electronAPI.openDirectory();
  quizActive.value = true;
  quizData.value = await window.electronAPI.readDataFile(currentQuizDir.value)
}

async function addQuestion(questionType) {
  switch (questionType) {
    case questionType = "finale":
      quizData.value.questions.push({
        "name": "New Question",
        "type": "finale",
        "answers": [],
        "correctAnswer": ""
      })
  }
  optionsBoxOpen.value = false
  await updateQuiz()
}

async function updateQuestion(newData) {
  quizData.value.questions[activeQuestion.value] = newData
  await updateQuiz()
}

async function updateQuiz() {
  const plainQuizData = getPlainData(quizData)
  await window.electronAPI.writeFile(currentQuizDir.value, "data.json", JSON.stringify(plainQuizData, null, 2));
}

function openOptionsBox() {
  optionsBoxOpen.value = true
}

function getPlainData(reactiveQuizData) {
  return {
    "title": reactiveQuizData.value.title,
    "questions": (reactiveQuizData.value.questions ||[]).map(question => ({
      "name": question.name,
      "type": question.type,
      "answers": question.answers,
      "correctAnswer": question.correctAnswer
    })),
  };
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
        <finale-editor
            v-if="quizData.questions.length > 0 && quizData.questions[activeQuestion]?.type === 'finale'"
            :question="quizData.questions[activeQuestion]"
            :update-question="updateQuestion"
        />
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

.add-button {
  width: 100%;
}
</style>