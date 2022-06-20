<template>
    <div class="index-page">
        <section class="section">
            <div class="container">
                <h1 class="heading">Home</h1>
                <p>It's empty in here...</p>
                <p>Too empty...</p>
                <p @click="pushAlert({text: 'test', type: 'neutral'})">push alert</p>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { pushAlert } from '~/composables/alerts'
</script>