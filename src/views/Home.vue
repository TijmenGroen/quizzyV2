<script setup>

</script>

<template>
  <div class="home-container">
    <h1>Quizzy</h1>
    <div class="button-panel">
      <RouterLink class="router-link" to="/CreateQuiz">Create Quiz</RouterLink>
      <RouterLink class="router-link" to="/QuizEditor">Edit Quiz</RouterLink>
      <RouterLink class="router-link" to="/QuizPlayer">Play Quiz</RouterLink>
    </div>
  </div>
</template>


<style scoped>
.home-container {
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

h1 {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "JetBrains Mono", monospace;
  color: white;
  font-size: 4vw;
}

.button-panel {
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.router-link {
  width: 100%;
  border: 1px white solid;
  border-radius: 4px;
  background-color: #1B1E74;
  padding: 8px;
  color: white;
  text-decoration: none;
  text-align: center;
}
.router-link:hover {
  background-color: #070a60;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}
</style>
