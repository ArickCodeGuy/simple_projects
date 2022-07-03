---
name: 2048
description: Recreation of a viral game 2048. Combine blocks to get to 2048
---

<template>
    <div class="tofe">
        <section class="section">
            <div class="container">
                <h1 class="h1">2048</h1>
                <p>movement: wasd</p>
                {{cells}}
                <div
                    class="game"
                    ref="gameel"
                    :style="`--size: ${grid_size};`"
                >
                    <div
                        v-for="(cell, i) in cells"
                        :key="i"
                        class="floating-cell"
                        :style="`
                            --index: ${cell.index};
                            --top: ${Math.floor(cell.index / grid_size)};
                            --left: ${cell.index % grid_size}
                        `"
                    >{{cell.value}}</div>
                    <div v-for="row_index in grid_size" class="game__row">
                        <div
                            v-for="cell_index in grid_size"
                            class="cell"
                        >
                            <!-- <div>
                                row: {{row_index}}
                                <br>
                                cell: {{cell_index}}
                                <br>
                                index: {{(row_index - 1) * grid_size + cell_index}}
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const gameel = ref<HTMLElement | null>(null)
const grid_size = ref<number>(4)

interface Cell {
    index: number;
    value?: number;
}
const cells = ref<Cell[]>([])
const sorted_cells_by_index = computed<Cell[]>(() => cells.value.sort((a, b) => a.index - b.index))
const empty_cells = computed<Cell[]>(() => {
    const result = []
    let pointer = 0
    for (let i = 0; i < grid_size.value ** 2; i++) {
        if (sorted_cells_by_index.value[pointer]?.index === i) {pointer++; continue}
        result.push({index: i})
    }
    return result
})

onMounted(() => {
    gameStart()
    document.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyPress)
})

function handleKeyPress(e: KeyboardEvent): void {
    if (e.key.toLowerCase() === 'w') {move(0)}
    if (e.key.toLowerCase() === 'd') {move(1)}
    if (e.key.toLowerCase() === 's') {move(2)}
    if (e.key.toLowerCase() === 'a') {move(3)}
}

function gameStart(): void {
    generateCell()
    generateCell()
}

// @returns [row_index, col_index]
function getPositionByIndex(index: number)
: number[] {
    return [
        Math.floor(index / grid_size.value),
        index % grid_size.value
    ]
}

function generateCell(): void {
    if (empty_cells.value.length) {
        const random_grid_index = Math.floor(Math.random() * empty_cells.value.length)
        cells.value.push({index: random_grid_index, value: Math.random() > .5 ? 2 : 4})
    }else {
        // check for turns
    }
}

function isWithinBounds(pos: {row: number, col: number}): boolean {
    if (
        pos.row >= grid_size.value ||
        pos.row < 0 ||
        pos.col >= grid_size.value ||
        pos.col < 0
    ) return false
    return true
}

function isCellEmpty(index: number) : boolean {
    return cells.value.findIndex(i => i.index === index) === -1 ? true : false
}

function findCellIndexByIndex(index: number) : number {
    return cells.value.findIndex(i => i.index === index)
}

// up, right, down, left
type Direction = 0 | 1 | 2 | 3
function move(direction): void {
    let is_any_cell_moved = false
    // we need to preserve order during moves
    // since sorted_cells_by_index is computed property it will be recomputed each time we change property index
    const sorted_cells = [...sorted_cells_by_index.value]
    let step: {row: number, col: number}
    let index: number
    let rule: number

    if (direction === 0) {
        step = {row: -1, col: 0}
        index = 0
        rule = 1
    }
    if (direction === 1) {
        step = {row: 0, col: 1}
        index = sorted_cells.length - 1
        rule = -1
    }
    if (direction === 2) {
        step = {row: 1, col: 0}
        index = sorted_cells.length - 1
        rule = -1
    }
    if (direction === 3) {
        step = {row: 0, col: -1}
        index = 0
        rule = 1
    }
    for (index; (index < sorted_cells.length && index >= 0); index += rule) {
        console.log(sorted_cells[index].index)
        let [row, col] = getPositionByIndex(sorted_cells[index].index)
        let cell_new_pos = {row, col}

        // finding the furtherest position we can move before we find obsticle
        while (
            isWithinBounds({
                row: cell_new_pos.row + step.row,
                col: cell_new_pos.col + step.col
            }) &&
            isCellEmpty((cell_new_pos.row + step.row) * grid_size.value + cell_new_pos.col + step.col)
        ) {
            cell_new_pos.row += step.row
            cell_new_pos.col += step.col
            is_any_cell_moved = true
        }
        if (cell_new_pos.row !== row || cell_new_pos.col !== col) {
            sorted_cells[index].index = cell_new_pos.row * grid_size.value + cell_new_pos.col
        }

        // summ
        // const obsticle = {
        //     row: cell_new_pos.row + step.row,
        //     col: cell_new_pos.col + step.col
        // }
        // if (
        //     isWithinBounds(obsticle)
        // ) {
        //     let cell = sorted_cells[index]
        //     let possible_summ_cell_index = findCellIndexByIndex((obsticle.row) * grid_size.value + obsticle.col)
        //     let possible_summ_cell = cells.value[possible_summ_cell_index].value
        //     if (cell.value === possible_summ_cell.value) {
        //         cell.index = possible_summ_cell.index
        //         possible_summ_cell.value *= 2
        //         cells.value = cells.value.split(cell_index, 1)
        //         is_any_cell_moved = true
        //     }
        // }
    }
    if (is_any_cell_moved) {
        // generateCell()
    }
}
</script>

<style lang="scss" scoped>
.game {
    --gap: 1px;
    max-width: 80%;
    position: relative;
    margin: 0 auto;
    display: grid;
    grid-gap: var(--gap);
}
.floating-cell {
    position: absolute;
    // width percentage
    --w: calc(100% / var(--size));
    --position: calc(var(--w) + var(--gap));
    top: calc(var(--position) * var(--top));
    left: calc(var(--position) * var(--left));
    width: var(--w);
    height: var(--w);
    margin-left: calc(var(--gap) * var(--left) * -1);
    margin-top: calc(var(--gap) * var(--top) * -1);
    background-color: green;
    transition: .3s;
}
.game__row {
    display: flex;
    gap: 1px;
}
.cell {
    background-color: rgba(var(--rgba-bgc), .4);
    user-select: none;
    width: 100%;
    // display: flex;
    align-items: center;
    justify-content: center;
    // font-size: 5rem;
    font-weight: bold;
    transition: .3s;
    transform: none;
    > * {
        position: absolute;
    }
    &::after {
        content: '';
        display: block;
        padding-top: 100%;
    }
    // &-8 {background-color: rgba(255, 255, 255, 1)}
}
</style>