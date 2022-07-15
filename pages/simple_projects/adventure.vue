---
name: Adventure capitalist clone
description: Just an existing game budget clone
---

<template>
    <section class="section">
        <div class="container">
            <div class="h2">Cash: {{cash}}</div>
            <div class="items">
                <div class="item" v-for="(item, i) in items" :key="i">
                    <div class="item__container">
                        <div class="amount">{{item.amount}}</div>
                        <div class="bar" @mousedown="produceStart(i)">
                            <div class="bar__completion" :style="{
                                'width': `${item.is_producing ? '100%' : '0%'}`,
                                'transition': `${item.is_producing ? item.time : 1}ms linear`,
                            }"></div>
                            <div class="bar__abs">{{item.title}} : {{item.revenue * item.amount}}$</div>
                        </div>
                    </div>
                    <div class="item__btns">
                        <button class="btn item__buy" :disabled="cash < items_prices[i]" @click="buy(i)">Buy 1 more:
                            {{items_prices[i]}}$</button>
                        <button class="btn item__buy" :disabled="!items_prices_bunch[i].amount"
                            @click="buy(i, items_prices_bunch[i].amount, items_prices_bunch[i].price)">Buy all
                            ({{items_prices_bunch[i].amount || ''}} / {{items_prices_bunch[i].price + '$'}})</button>
                    </div>
                    <Spacer class=" spacer-1" />
                    <button v-if="!item.manager.is_bought" class="btn item__manager"
                        :disabled="cash < item.manager.price" @click="buyManager(i)">Buy {{item.manager.name}}:
                        {{item.manager.price}}$</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
interface Item {
    title: string;
    time: number;
    base_price: number;
    price_growth: number;
    revenue: number;
    amount: number;
    is_producing?: boolean;
    manager: {
        name: string;
        is_bought?: boolean;
        price: number;
    }
}
const cash = ref<number>(1000000)
const items = ref<Item[]>([
    {
        title: 'Lemons',
        time: 1_000,
        base_price: 9,
        price_growth: 1,
        amount: 1,
        revenue: 1,
        manager: {
            name: 'Lemon Seller',
            price: 100,
            // is_bought: true
        }
    },
    {
        title: 'Lemon shops',
        time: 5_000,
        base_price: 1_000,
        price_growth: 10,
        amount: 0,
        revenue: 50,
        manager: {
            name: 'Lemon shop keeper',
            price: 10_000
        }
    },
    {
        title: 'Lemon markets',
        time: 10_000,
        base_price: 100_000,
        price_growth: 100_000,
        amount: 0,
        revenue: 10_000,
        manager: {
            name: 'Lemon market keeper',
            price: 10_000_000
        }
    }
])

// y = a * x ** 2 + c
// c - base_price
// a - price_growth
// x - amount
// y - price
function priceFormula(item: Item, start = item.amount, end = item.amount + 1): number {
    // let final_price: number = item.price_growth * item.amount ** 2 + item.base_price
    // integral of given formula
    let final_price: number = item.price_growth * end ** 3 / 3 + item.base_price * end / 2 - (item.price_growth * start ** 3 / 3 + item.base_price * start / 2)
    return final_price
}

function findAmountGivenPrice(item: Item, money: number = cash.value): {amount: number, price: number} {
    let end: number = 1
    const start_price = items_prices.value[items.value.indexOf(item)]
    if (start_price > money) return {amount: 0, price: 0}
    
    while (priceFormula(item, undefined, item.amount + end) < money) end++
    return {
        amount: end,
        price: priceFormula(item, undefined, item.amount + end - 1)
    }
}

const items_prices = computed<number[]>(() => items.value.map(i => (
    roundByDec(priceFormula(i))
)))

const items_prices_bunch = computed<{
    amount: number;
    price: number;
}[]>(() => items.value.map(i => {
    const { amount, price } = findAmountGivenPrice(i)
    return {
        amount,
        price: roundByDec(price)
    }
}))
function buy(index: number, amount: number = 1, price: number = items_prices.value[index]): void {
    if (cash.value >= price) {
        cash.value = roundByDec(cash.value - price)
        items.value[index].amount += amount
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

.container {
    max-width: 300px;
    margin: 0 auto;
}
.items {
    display: grid;
    grid-gap: var(--column-gap);
    // @media (min-width: 768px) {
    //     grid-template-columns: repeat(2, 1fr);
    // }
    // @media (min-width: 1200px) {
    //     grid-template-columns: repeat(3, 1fr);
    // }
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
        background-color: rgba(var(--rgba-bgc), .4);
        // background-color: var(--contrast);
        // color: var(--bgc);
    }
    .bar {
        width: 100%;
        height: 30px;
        cursor: pointer;
        border-radius: 4px;
        position: relative;
        background-color: rgba(var(--rgba-bgc), .4);
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
        font-size: .6em;
        padding: 4px;
    }
    &__buy {
        width: 100%;
        font-size: .5em;
    }
}
</style>