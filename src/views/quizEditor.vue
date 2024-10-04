<script setup>

import QuestionOverview from "../components/questionOverview.vue";

const questions = [
  {
    id: 1,
    name: "question1",
    type: "multipleChoices",
    choices: ["A", "B", "C"],
    correctChoice: "A"
  },
  {
    id: 2,
    name: "question2",
    type: "multipleChoices",
    choices: ["A", "B", "C"],
    correctChoice: "B"
  },
  {
    id: 3,
    name: "question3",
    type: "openQuestion",
    correctAnswer: "answer"
  }
]
</script>

<template>
  <div class="editor-container">
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