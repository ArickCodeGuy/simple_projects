<template>
    <div class="Alerts">
        <TransitionGroup name="alerts-container" tag="div">
            <div v-for="alert in alerts" class="alert" :key="alert" :class="alert.type">
                {{alert.text}}
                <div class="alert__x" @click="removeAlert(alert.id)">X</div>
            </div>
        </TransitionGroup>
    </div>
</template>

<script lang="ts" setup>
const alerts = useAlerts()
</script>

<style lang="scss" scoped>
.Alerts {
    display: flex;
    align-items: flex-start;
    position: fixed;
    pointer-events: none;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    padding: var(--column-gap);
    z-index: 10000;
    :deep {
        // TransitionGroup can not have class ¯\_(ツ)_/¯
        > * {
            margin-left: auto;
            right: 0;
            display: flex;
            flex-direction: column-reverse;
            gap: var(--column-gap);
            @media (min-width: 1200px) {
            }
        }
    }
}
.alert {
    position: relative;
    pointer-events: auto;
    width: 250px;
    max-width: 100%;
    background-color: rgba(var(--rgba-bgc), .8);
    color: var(--color-secondary);
    border-radius: 5px;
    padding: 10px;
    &__x {
        position: absolute;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 5px;
        background-color: rgba(var(--bgc-rgba), .3);
        top: 10px;
        right: 10px;
        font-weight: bold;
    }
    &.warn {
        background-color: rgba(255, 255, 0, .8);
        color: #000000;
    }
    &.error {
        background-color: rgba(255, 0, 0, .8);
        color: #ffffff;
    }
    &.success {
        background-color: #00f700;
        color: #000000;
    }
    @media (min-width: 1200px) {
        width: 350px;
    }
}

.alerts-container-enter-active,
.alerts-container-leave-active {
  transition: .3s;
}
.alerts-container-enter-from,
.alerts-container-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>