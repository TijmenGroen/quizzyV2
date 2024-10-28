<script setup>

const props = defineProps({
  questions: Array,
  setActive: Function,
  activeQuestion: Number,
})

</script>

<template>
  <div class="question-overview">
    <div class="question-overview-header">Questions</div>
    <div class="question-overview-content">
      <div v-for="(question, index) in questions" :key="question.id"
           :class="{ 'active': activeQuestion === index }"
           @click="() => { props.setActive(index); }"
      >
        {{ question.name }} - {{ question.type }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.question-overview {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 32px;
  height: 100%;
  min-width: min-content;
  background-color: #1B1E74;
  overflow: auto;
  filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5));
}

.question-overview-header {
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  font-size: large;
}

.question-overview-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  width: 90%;
}

.question-overview-content > * {
  border: 1px solid white;
  border-radius: 4px;
  padding: 4px;
  background-color: #8f00ff;
  filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.5));
  cursor: pointer;
}

.question-overview-content .active {
  border-color: red !important;
}
</style>