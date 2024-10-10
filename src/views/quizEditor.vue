<script setup>
import {onMounted, ref} from "vue";
import QuestionOverview from "../components/questionOverview.vue";

const currentQuizDir = ref(null)

let currentQuizData;

const questions = []

async function loadQuiz() {
  currentQuizDir.value = await window.electronAPI.openDirectory()
  currentQuizData = await window.electronAPI.readDataFile(currentQuizDir.value)
  console.log(currentQuizData)
}

function addQuestion(question) {
  questions.push(question);
}

onMounted(() => {loadQuiz()})
</script>

<template>
  <div class="editor-container">
  <button v-on:click="addQuestion">+</button>
    <question-overview :questions=questions />
  </div>
</template>

<style scoped>
.editor-container {
  height: 100vh;
  width: 100vw;
  background-image: url('../assets/img/BGPanel.png');
  background-repeat: repeat;
  background-size: 176px;
}
</style>