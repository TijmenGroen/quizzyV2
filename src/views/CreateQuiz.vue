<script setup>
import {ref} from "vue";
import {BaseDirectory, createDir, exists, writeTextFile} from "@tauri-apps/api/fs";
import {open} from "@tauri-apps/api/dialog";
import router from "../router.js";
import {invoke} from "@tauri-apps/api/tauri";

const title = ref("");
const selectedDir = ref(null)

async function selectDir() {
  selectedDir.value = await open({
    directory: true,
    multiple: false
  });
}

async function createQuiz() {
  if(selectedDir.value !== null) {
  const dirExists = await exists(selectedDir.value)
    if(!dirExists) {
    alert("Select an Existing File Directory");
    return;
    }
  }
  else {
    alert("Select File Directory");
    return;
  }
  if (await exists(selectedDir.value + "/" + title.value, {dir: BaseDirectory.AppData})) {
    alert("Quiz Already Exists!");
    return;
  }
    await createDir(selectedDir.value + "/" + title.value, {dir: BaseDirectory.AppData});
  await writeTextFile(selectedDir.value + "/" + title.value + "/name.txt", title.value, {dir: BaseDirectory.AppData});
  await invoke("create_quiz",)
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