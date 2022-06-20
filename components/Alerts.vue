<template>
    <div class="Alerts">
        <div class="alerts-container">
            <div v-for="alert in alerts.reverse()" class="alert">{{alert.text}}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAlerts, pushAlert } from '~/composables/alerts'
const alerts = useAlerts()
</script>

<style lang="scss" scoped>
.Alerts {
    position: fixed;
    pointer-events: none;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    padding: var(--column-gap);
    z-index: 10000;
    .alerts-container {
        margin-left: auto;
        width: 50%;
        grid-template-columns: 100%;
        display: grid;
        grid-gap: var(--column-gap);
        @media (min-width: 1200px) {
            width: 100%;
            right: 20vw;
        }
    }
}
.alert {
    pointer-events: auto;
    width: 250px;
    max-width: 100%;
    background-color: rgba(255, 255, 0, .7);
    border-radius: 5px;
    color: #000000;
    padding: 10px;
}
</style>