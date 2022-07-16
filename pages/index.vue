<template>
    <div class="index-page">
        <section class="section">
            <div class="container">
                <h1 class="heading">Home</h1>
                <p>Silence is golden...</p>
                <p @click="pushAlert({text: 'some text'})">add</p>
            </div>
        </section>
    </div>
</template>