<script setup>
import {watch, ref} from "vue";

const props = defineProps({
  updateQuestion: Function,
  question: Object,
})

const option1 = ref(props.question.answers[0] || "Option 1");
const option2 = ref(props.question.answers[1] || "Option 2");
const option3 = ref(props.question.answers[2] || "Option 3");
const option4 = ref(props.question.answers[3] || "Option 4");
const option5 = ref(props.question.answers[4] || "Option 5");

function updateAnswers() {
  const updatedAnswers = [
    option1.value,
    option2.value,
    option3.value,
    option4.value,
    option5.value,
  ];
  props.updateQuestion({ ...props.question, answers: updatedAnswers });
}

watch(
    () => props.question.name,
    (newName) => {
      props.updateQuestion({ ...props.question, name: newName });
    }
);

</script>

<template>
  <div class="editor">
    <div class="inputs">
      Question:
      <input v-model="props.question.name">
    </div>
    <div class="inputs">
      Option 1:
      <input v-model="option1" @change="updateAnswers">
    </div>
    <div class="inputs">
      Option 2:
      <input v-model="option2" @change="updateAnswers">
    </div>
    <div class="inputs">
      Option 3:
      <input v-model="option3" @change="updateAnswers">
    </div>
    <div class="inputs">
      Option 4:
      <input v-model="option4" @change="updateAnswers">
    </div>
    <div class="inputs">
      Option 5:
      <input v-model="option5" @change="updateAnswers">
    </div>
  </div>
</template>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>