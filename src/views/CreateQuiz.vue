<script setup>
import {ref} from "vue";
import router from "../router.js";

const title = ref("");
const selectedDir = ref(null)

async function createQuiz() {
  await router.push("/quizEditor")
}

</script>

<template>
  <div class="create-container">
    <RouterLink to="/">Home</RouterLink>
    <input type='text' name='title' placeholder='Quizzy' v-model="title"/>
    <div style="width:100%; display: flex; flex-direction: column; justify-content: center; gap: 4px">
      <div style="width:100%; display: flex; justify-content: center; gap: 4px">
      <button class="button" v-on:click="createQuiz">Create Quiz</button>
      <button class="button" v-on:click="selectDir">Select Folder</button>
      </div>
    <div style="color: white; display: flex; justify-content: center;">
    Selected Directory: {{ selectedDir }}
    </div>
    </div>
  </div>
</template>

<style scoped>
.create-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url('../assets/img/BGPanel.png');
  background-repeat: repeat;
  background-size: 176px;
}

.button {
  width: 20%;
  max-width: 148px;
  border: 1px white solid;
  border-radius: 4px;
  background-color: #1B1E74;
  padding: 8px;
  color: white;
  text-decoration: none;
  text-align: center;
}

.button:hover {
  background-color: #070a60;
  transition: 0.3s ease-in-out;
}
</style>