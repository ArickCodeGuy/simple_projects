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
                <!-- {{cells_info}} -->
                <div class="game" ref="gameel">
                    <div v-for="(row, row_index) in game" class="game__row">
                        <div
                            v-for="(cell, cell_index) in row"
                            class="cell"
                        >
                            <!--  -->
                            {{cell}}
                            <!--  -->
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
const grid_size = 4
const cells = grid_size ** 2
type Game = (number | undefined | null)[][]
const game = ref<Game>([])
const cell_width = ref<number>(0)
for (let i = 0; i < grid_size; i++) {
    game.value[i] = Array(grid_size)
}

interface CellsInfo {
    [index: string]: {
        index: number,
        value?: number
    }[]
}
const cells_info = computed<CellsInfo>(() => {
    const filled_cells = []
    const empty_cells = []
    for (let i = 0; i < grid_size ** 2; i++) {
        const cell = getCellByIndex(i)
        if (cell) filled_cells.push({index: i, value: cell})
        else empty_cells.push({index: i})
    }
    return {filled_cells, empty_cells}
})

onMounted(() => {
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
    const random = Math.floor(Math.random() * cells)
    const row_index = Math.floor(random / grid_size)
    const col_index = Math.floor(random - row_index * grid_size)
    const v = Math.random() > .5 ? 2 : 4
    game.value[row_index][col_index] = v
}
gameStart()

// @returns [row_index, col_index]
function getPositionByIndex(index: number)
: number[] {
    return [
        Math.floor(index / grid_size),
        index % grid_size
    ]
}

function getCellByIndex(index: number, g: Game = game.value): number | undefined {
    const [row, col] = getPositionByIndex(index)
    return g[row][col]
}

function copyGameGrid(): (number | undefined | null)[][] {
    return JSON.parse(JSON.stringify(game.value))
}

function changeGrid(new_grid: Game): boolean {
    let changes = 0
    for (let i = 0; i < grid_size ** 2; i++) {
        const [row, col] = getPositionByIndex(i)
        if (game.value[row][col] != new_grid[row][col]) {
            changes++
            game.value[row][col] = new_grid[row][col]
        }
    }
    return changes ? true : false
}

function generateCell(g: Game = game.value): void {
    const empty_cells = cells_info.value.empty_cells
    if (empty_cells.length) {
        const random = Math.floor(Math.random() * empty_cells.length)
        const [row, col] = getPositionByIndex(cells_info.value.empty_cells[random].index)
        g[row][col] = Math.random() > .5 ? 2 : 4
    }else {
        // check for turns
    }
}

function isWithinBounds(pos: {row: number, col: number}, g: Game = game.value): boolean {
    if (
        pos.row >= grid_size ||
        pos.row < 0 ||
        pos.col >= grid_size ||
        pos.col < 0
    ) return false

    return true
}

// up, right, down, left
type Direction = 0 | 1 | 2 | 3
function move(direction): void {
    const new_grid = copyGameGrid()
    let step: {row: number, col: number}
    let index: number
    let rule: number

    if (direction === 0) {
        step = {row: -1, col: 0}
        index = grid_size
        rule = 1
    }
    if (direction === 1) {
        step = {row: 0, col: 1}
        index = grid_size ** 2 - 1
        rule = -1
    }
    if (direction === 2) {
        step = {row: 1, col: 0}
        index = grid_size ** 2 - grid_size - 1
        rule = -1
    }
    if (direction === 3) {
        step = {row: 0, col: -1}
        index = 0
        rule = 1
    }
    for (index; (index < grid_size ** 2 && index >= 0); index += rule) {
        if (!getCellByIndex(index, new_grid)) continue
        let [row, col] = getPositionByIndex(index)
        let cell_pos = {row, col}
        let cell_new_pos = {row, col}
        while (
            isWithinBounds({
                row: cell_new_pos.row + step.row,
                col: cell_new_pos.col + step.col
            }) &&
            !new_grid[cell_new_pos.row + step.row][cell_new_pos.col + step.col]
        ) {
            cell_new_pos.row += step.row
            cell_new_pos.col += step.col
        }
        if (
            cell_new_pos.row !== cell_pos.row ||
            cell_new_pos.col !== cell_pos.col
        ) {
            new_grid[cell_new_pos.row][cell_new_pos.col] = new_grid[cell_pos.row][cell_pos.col]
            new_grid[cell_pos.row][cell_pos.col] = null
        }

        // summ
        if (
            isWithinBounds({
                row: cell_new_pos.row + step.row,
                col: cell_new_pos.col + step.col
            }) &&
            new_grid[cell_new_pos.row][cell_new_pos.col] === new_grid[cell_new_pos.row + step.row][cell_new_pos.col + step.col]
        ) {
            new_grid[cell_new_pos.row + step.row][cell_new_pos.col + step.col] *= 2
            new_grid[cell_new_pos.row][cell_new_pos.col] = null
        }
    }
    const is_changed = changeGrid(new_grid)
    if (is_changed) {
        generateCell()
    }
}
</script>

<style lang="scss" scoped>
.game {
    max-width: 80%;
    margin: 0 auto;
    display: grid;
    grid-gap: 1px;
}
.game__row {
    display: flex;
    gap: 1px;
}
.cell {
    background-color: var(--block-color);
    user-select: none;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5rem;
    font-weight: bold;
    &::after {
        content: '';
        display: block;
        padding-top: 100%;
    }
}
</style>