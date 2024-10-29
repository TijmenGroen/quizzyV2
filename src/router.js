import { createMemoryHistory, createRouter } from 'vue-router'

import HomePage from './views/Home.vue';
import CreateQuiz from './views/CreateQuiz.vue';
import QuizEditor from './views/QuizEditor.vue';
import QuizPlayer from "./views/QuizPlayer.vue";

const routes = [
    { path: '/', component: HomePage },
    { path: '/createQuiz', component: CreateQuiz },
    { path: '/quizEditor', component: QuizEditor },
    { path: '/quizPlayer', component: QuizPlayer },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router;