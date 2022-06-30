<template>
    <div class="index-page">
        <section class="section">
            <div class="container">
                <h1 class="heading">Home</h1>
                <p>It's empty in here...</p>
                <p>Too empty...</p>
                <p @click="pushAlert({text: Math.random()})">push neutral</p>
                <p @click="pushAlert({text: Math.random(), type: 'warn'})">push warn</p>
                <p @click="pushAlert({text: Math.random(), type: 'error'})">push error</p>
                <p @click="pushAlert({text: Math.random(), type: 'success'})">push success</p>
            </div>
        </section>
    </div>
</template>