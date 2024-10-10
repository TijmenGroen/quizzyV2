<script setup>

import QuestionOverview from "../components/questionOverview.vue";

const questions = []

function loadQuiz() {
  window.electronAPI.openDire
}

function addQuestion(question) {
  questions.push(question);
}

</script>

<template>
  <div class="editor-container">
    <question-overview :questions=questions />
  <button v-on:click="addQuestion">+</button>
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