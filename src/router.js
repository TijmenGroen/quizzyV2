import { createMemoryHistory, createRouter } from 'vue-router'

import HomePage from './views/Home.vue';
import CreateQuiz from './views/CreateQuiz.vue';
import quizEditor from './views/QuizEditor.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/createQuiz', component: CreateQuiz },
    { path: '/quizEditor', component: quizEditor },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router;