<template>
    <section class="section">
        <div class="container">
            <div class="h2">Cash: {{cash}}</div>
            <div class="items">
                <div class="item" v-for="(item, i) in items">
                    <div class="item__container">
                        <div class="amount">{{item.amount}}</div>
                        <div
                            class="bar"
                            @click="produceStart(i)"
                        >
                            <div
                                class="bar__completion"
                                :style="{
                                    'width': `${item.is_producing ? '100%' : '0%'}`,
                                    'transition': `${item.is_producing ? item.time : 1}ms linear`,
                                }"
                            ></div>
                            <div class="bar__abs">{{item.title}} : {{item.revenue * item.amount}}$</div>
                        </div>
                    </div>
                    <div class="item__btns">
                        <button class="btn item__buy" :disabled="cash < items_prices[i]" @click="buy(i)">Buy 1 more: {{items_prices[i]}}$</button>
                        <button class="btn item__buy" disabled>Buy all</button>
                    </div>
                    <Spacer class="spacer-5" />
                    <button v-if="!item.manager.is_bought" class="btn item__manager" :disabled="cash < item.manager.price" @click="buyManager(i)">Buy {{item.manager.name}}: {{item.manager.price}}$</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
interface item {
    title: string;
    time: number;
    price: number;
    revenue: number;
    amount: number;
    is_producing?: boolean;
    manager: {
        name: string;
        is_bought?: boolean;
        price: string;
    }
}
const cash = ref<number>(0)
const items = ref<item[]>([
    {
        title: 'Lemons',
        time: 1000,
        base_price: 10,
        amount: 1,
        revenue: 1,
        manager: {
            name: 'Lemon Seller',
            price: 100,
        }
    }
])
const items_prices = computed<number[]>(() => items.value.map(i => (
    roundByDec((i.base_price * (9 + i.amount)) / 10)
)))
const max_buy = computed<{amount: number, price: number}[]>(() => items.value.map((i, index) => {
    const price = items_prices.value[index]
    const diff = cash.value - price
    if (diff < 0) return {amount: 0, price: 0}
    return {
        amount: 1,
        price: 1
    }
}))
function buy(i: number): void {
    if (cash.value >= items_prices.value[i]) {
        cash.value = roundByDec(cash.value - items_prices.value[i])
        items.value[i].amount++
    }
}
function roundByDec(n: number, d: number = 1): number {
    const m = 10 ** d
    return Math.round(n * m) / m
}

function produceStart(i: number): void {
    const item = items.value[i]
    if (item.amount === 0) return // didn't buy any
    if (item.is_producing === true) return // already producing one

    item.is_producing = true
    setTimeout(() => {
        produceEnd(i)
    }, item.time)
}

function produceEnd(i: number): void {
    const item = items.value[i]
    item.is_producing = false
    cash.value += item.revenue * item.amount
    if (item.manager.is_bought === true) produceStart(i)
}
function buyManager(i: number): void {
    const item = items.value[i]
    item.manager.is_bought = true
    cash.value -= item.manager.price
    produceStart(i)
}
</script>

<style lang="scss" scoped>
.items {
    display: grid;
    grid-gap: var(--column-gap);
    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }
}
.item {
    &__container {
        display: flex;
        gap: 5px;
    }
    &__btns {
        margin-top: 1px;
        display: flex;
        gap: 1px;
    }
    .amount {
        border-radius: 4px;
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        width: 2em;
        background-color: var(--block-color);
        // background-color: var(--contrast);
        // color: var(--bgc);
    }
    .bar {
        width: 100%;
        height: 30px;
        cursor: pointer;
        border-radius: 4px;
        position: relative;
        background-color: var(--block-color);
        overflow: hidden;
        user-select: none;
        &__completion {
            position: absolute;
            background-color: green;
            left: 0;
            top: 0;
            height: 100%;
        }
        &__abs {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        }
    }
    &__manager {
        width: 100%;
    }
    &__buy {
        width: 100%;
        font-size: .5em;
    }
}
</style>