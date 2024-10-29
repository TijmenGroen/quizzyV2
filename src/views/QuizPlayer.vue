<script setup>

import {onMounted, reactive, ref} from "vue";
import FinalePlayer from "../components/play/FinalePlayer.vue";

const subtractionPerAnswer = 20

const revealedQuestions = reactive(new Set())

const quizActive = ref(false)
const quizStarted = ref(false)
const activeQuestion = ref(0)

const currentQuizDir = ref(null)
const quizData = ref({
  title: "",
  questions: []
});

const players = ref([
  {
    id: "1",
    name: "",
    score: 0,
    active: false
  },
  {
    id: "2",
    name: "",
    score: 0,
    active: false
  }
])

const count = ref(0);
let timer = null;

function setActivePlayer(index) {
  players.value.forEach((player, i) => (player.active = i === index));
  startTimer(index);
}

function stopActivePlayer(index) {
  players.value[index].active = false;
  stopTimer();
}

function startTimer(activeIndex) {
  stopTimer();
  count.value = players.value[activeIndex].score;

  timer = setInterval(() => {
    if (count.value > 0) {
      count.value--;
      players.value[activeIndex].score--;
    } else {
      console.log("Time's up!");
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function subtractScore() {
  const isAnyActive = players.value.some(player => player.active);

  if (isAnyActive) {
    players.value.forEach(player => {
      if (!player.active) {
        player.score = player.score - subtractionPerAnswer;
      }
    });
  }
}

function nextQuestion() {
  revealedQuestions.clear()
  activeQuestion.value++
}

async function loadQuiz() {
  currentQuizDir.value = await window.electronAPI.openDirectory();
  quizActive.value = true;
  quizData.value = await window.electronAPI.readDataFile(currentQuizDir.value)
}

onMounted(() => {
  loadQuiz()
})
</script>

<template>
  <div class="quiz-player">
    <div v-if="quizActive" class="quiz-active">
      <h1>{{ quizData.title }}</h1>
      <div v-if="quizStarted" class="quiz-started">
        <div class="scores">
          <div v-for="(player, index) in players"
          :class="{ 'active' : players[index].active === true }"
          >
            {{ player.name }} - {{ player.score }}
            <button v-on:click="setActivePlayer(index)">Start</button>
            <button v-on:click="stopActivePlayer(index)">Stop</button>
          </div>
        </div>
        <finale-player :quiz-data="quizData" :active-question="activeQuestion" :subtract-score="subtractScore" :revealed-questions="revealedQuestions" />
        <button v-on:click="nextQuestion">Next Question</button>
      </div>
      <div v-else class="player-select">
        <div v-for="player in players">
          {{ player.id }} - Naam: <input type="text" v-model=player.name><br>
          Score: <input type="number" v-model="player.score">
        </div>
        <button v-on:click="() => { quizStarted = true }">Start</button>
      </div>
    </div>
    <div v-else>
      Wait for directory to open
    </div>
  </div>
</template>

<style scoped>
.quiz-player {
  height: 100vh;
  width: 100vw;
  background-image: url('../assets/img/BGPanel.png');
  background-repeat: repeat;
  background-size: 176px;
}

.quiz-active {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.quiz-started {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 64px;
}

.scores {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 12px;
  background-color: #1B1E74;
  padding-block: 6px;
  color: white;
  font-size: x-large;
}

.active {
  color: red;
}

button {
  border: 1px white solid;
  border-radius: 4px;
  background-color: #1B1E74;
  padding: 8px;
  color: white;
  text-decoration: none;
  text-align: center;
}
button:hover {
  background-color: #070a60;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}
</style>