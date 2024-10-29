<script setup>

const props = defineProps({
  quizData: Object,
  activeQuestion: Number,
  subtractScore: Function,
  revealedQuestions: Set
})

function revealQuestion(index) {
  props.revealedQuestions.add(index);
  props.subtractScore();
}
</script>

<template>
  <div class="question">
    <h3>{{ quizData.questions[props.activeQuestion].name }}</h3>
    <div v-for="(answer, index) in quizData.questions[activeQuestion].answers"
         :class="{ 'revealed': props.revealedQuestions.has(index) }"
         @click="revealQuestion(index)"
         class="answers">
        {{ answer }}
    </div>
  </div>
</template>

<style scoped>
.question {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.answers {
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  color: transparent;
  text-shadow: 0 0 5px rgba(0,0,0,0.5);
  font-size: large;
}

.revealed {
  text-shadow: none !important;
  color: black !important;
}
</style>