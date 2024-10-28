<script setup>
const props = defineProps({
  questions: Array,
})
</script>

<template>
  <div class="question-overview">
    <div class="question-overview-header">Questions</div>
    <div class="question-overview-content">
      <div v-for="question in questions" :key="question.id">
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
  width: 20%;
  min-width: min-content;
  background-color: #1B1E74;
  overflow: auto;
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
  border: 2px solid white;
  padding: 4px;
  background-color: darkgray;
}
</style>