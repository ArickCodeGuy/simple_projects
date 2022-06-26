<template>
    <div class="Alerts">
        <TransitionGroup
            name="alerts-container"
            tag="div"
        >
            <div
                v-for="alert in alerts.slice().reverse()"
                class="alert"
                :key="alert"
                :class="alert.type"
            >{{alert.text}}</div>
        </TransitionGroup>
    </div>
</template>

<script lang="ts" setup>
import { useAlerts } from '~/composables/alerts'
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
            grid-template-columns: 100%;
            display: grid;
            grid-gap: var(--column-gap);
            @media (min-width: 1200px) {
            }
        }
    }
}
.alert {
    pointer-events: auto;
    width: 250px;
    max-width: 100%;
    background-color: rgba(var(--rgba-bgc), .8);
    color: var(--color-secondary);
    border-radius: 5px;
    padding: 10px;
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