<template>
    <!-- <teleport to="#popup-target"> -->
            <div
                class="popup"
                @mousedown="close"
                v-if="props.visibility"
            >
                <div class="popup-table" @mousedown="close">
                    <div class="popup-content-row" @mousedown="close">
                        <div class="popup-content-cell" @mousedown="close">
                            <div
                                class="popup-content"
                            >
                                <div class="popup-closer" v-if="closerVisibility" @mousedown="close"></div>
                                <slot></slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    <!-- </teleport> -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
    closerVisibility: {
        type: Boolean,
        default: true,
    },
    visibility: {
        type: Boolean,
        default: false,
    }
})

const emit = defineEmits(['update:visibility'])

function close(event: MouseEvent) {
    if (event.target === event.currentTarget) {
        emit('update:visibility', false)
    }
}
</script>

<style lang="scss" scoped>
.popup {
    position: fixed;
    overflow-y: scroll;
    cursor: pointer;
    padding: 12px;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: var(--block-shadow);
    z-index: 1000;
    .popup-closer {
        margin-bottom: 1rem;
        position: relative;
        width: 20px;
        height: 20px;
        cursor: pointer;
        transition: .3s;
        &::before, &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 141.4%;
            height: 3px;
            background-color: var(--contrast);
            transform: translate(-50%, -50%) rotate(45deg);
        }
        &::after {
            transform: translate(-50%, -50%) rotate(-45deg);
        }
        &:hover {
            transform: scale(.8);
        }
    }
    .popup-table {
        display: table;
        width: 100%;
        height: 100%;
    }
    .popup-content-row {
        display: table-row;
    }
    .popup-content-cell {
        display: table-cell;
        vertical-align: middle;
    }
    .popup-content {
        cursor: auto;
        // min-height: 500px;
        max-width: 740px;
        margin-left: auto;
        margin-right: auto;
        background-color: var(--bgc);
        padding: 12px;
    }
    @media (min-width: 768px) {
        padding: 40px;
        .popup-content-wrapper {
            padding: 15px;
        }
        .popup-content {
            padding: 15px;
        }
    }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>