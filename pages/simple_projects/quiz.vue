---
name: Quiz builder
description: no data
---

<template>
    <div class="quiz-page">
        <section class="section">
            <div class="container">
                <h1 class="h1">Quiz</h1>
                <template v-if="!finished">
                    <div class="quiz">
                        <div class="quiz__question h3">{{ question.question }}</div>
                        <Spacer class="spacer-10" />
                        <div class="quiz__checkboxes checkboxes">
                            <div v-for="(option, i) in question.options" :key="option" class="checkbox-container" @click="answers[step] = i">
                                <div class="checkbox" :class="{'active': answers[step] === i}" />
                                <div class="checkbox-text">{{option}}</div>
                            </div>
                        </div>
                    </div>
                    <Spacer class="spacer-10" />
                    <div class="btn-container">
                        <button class="btn" :disabled="step === 0" @click="step--">Prev</button>
                        <button v-if="step !== quiz.length - 1" :disabled="answers[step] === undefined" class="btn" @click="step++">Next</button>
                        <button v-if="step === quiz.length - 1" :disabled="answers[step] === undefined" class="btn" @click="finished = true">Finish</button>
                    </div>
                </template>
                <div v-else class="finished">
                    <div class="finished__score h2">
                        Your final score: 
                        <span title="Right answers">{{ score }}</span> / 
                        <span title="Questions">{{ quiz.length }}</span> / 
                        <span title="Percentage of right answers">{{ score * 100 / quiz.length }} %</span>
                    </div>
                    <div class="quiz-container">
                        <div v-for="(question, i) in quiz" :key="i" class="quiz">
                            <div class="quiz__question h3">{{ question.question }}</div>
                            <div class="quiz__checkboxes checkboxes">
                                <div
                                    v-for="(option, j) in question.options"
                                    :key="option"
                                    class="checkbox-container"
                                    :class="{
                                        'right': j === question.answer,
                                        'wrong': j === answers[i] && question.answer !== answers[i] 
                                    }"
                                >
                                    <div class="checkbox" :class="{'active': answers[i] === j}" />
                                    <div class="checkbox-text">{{option}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="btn-container">
                        <button v-if="finished" class="btn" @click="restart">Restart</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
const router = useRouter()
const route = useRoute()

interface quizItem {
    question: string;
    options: string[];
    answer: number;
}
const quiz = ref<quizItem[]>([
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        options: [
            '<js>',
            '<javascript>',
            '<scripting>',
            '<script>',
        ],
        answer: 3
    },
    {
        question: `What is the correct JavaScript syntax to change the content of the HTML element below? \n\n <p id="demo">This is a demonstration.</p>`,
        options: [
            ' #demo.innerHTML = "Hello World!";',
            ' document.getElement("p").innerHTML = "Hello World!";',
            ' document.getElementByName("p").innerHTML = "Hello World!";',
            ' document.getElementById("demo").innerHTML = "Hello World!";'
        ],
        answer: 3
    }
])

const step = ref<number>(route.query.step ? parseInt(route.query.step) : 0)
const finished = ref<boolean>(route.query.finished ? true : false)
const answers = ref<Record<string, number>>(
    Object.keys(route.query).reduce((obj, i) => {
        if (/q\[\w+\]/.test(i)) {
            const [a, questionIndex] = String(i).match(/q\[(\w+)\]/)
            obj[questionIndex] = parseInt(route.query[i])
        }
        return obj
    }, {})
)

watch(answers, () => {
    syncUrl()
}, {deep: true})

watch(step, () => {
    syncUrl()
})

watch(finished, () => {
    syncUrl()
})

function restart() {
    answers.value = {}
    step.value = 0
    finished.value = false
}

function constructQuery(): Record<string, string | number> {
    const query = {}
    for (const key in answers.value) {
        query[`q[${key}]`] = answers.value[key]
    }
    if (step.value !== 0) {
        query.step = step.value
    }
    if (finished.value === true) {
        query.finished = true
    }
    return query
}

function syncUrl(): void {
    router.replace({
        query: constructQuery()
    })
}

const question = computed<quizItem>(() => quiz.value[step.value])
const score = computed<number>(() => {
    let summ = 0
    for (const key in answers.value) {
        if (answers.value[key] === quiz.value[key].answer) summ++
    }
    return summ
})
</script>

<style lang="scss" scoped>
.checkboxes {
    display: grid;
    grid-gap: 10px;
}
.checkbox-container {
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    gap: 10px;
    &.right {
        background-color: green;
    }
    &.wrong {
        background-color: red;
    }
}
.checkbox {
    width: 20px;
    height: 20px;
    border: 1px solid var(--contrast);
    display: flex;
    align-items: center;
    justify-content: center;
    &::after {
        content: '';
        position: absolute;
        width: 8px;
        height: 17px;
        transform: rotate(45deg) translateY(-6px);
        display: none;
        border: 2px solid var(--contrast);
        border-left: none;
        border-top: none;
    }
    &.active {
        &::after {
            display: block;
        }
    }
}
.btn-container {
    display: flex;
    gap: 10px;
}
.quiz-container {
    display: grid;
    grid-gap: var(--column-gap);
}
.quiz {
    padding: 10px;
    border: var(--contrast);
    &__question {
        margin-bottom: 1em;
        white-space: pre-line;
    }
}
</style>