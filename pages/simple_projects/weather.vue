---
name: Weather getter
description: Getting current weather from weatherapi.com api, and displaying it via yandex maps api
---

<template>
    <div class="weather">
        <section class="section">
            <div class="container">
                <h1 class="h1">Weather</h1>
                <p>Easily get weather info via <a href="http://api.weatherapi.com" target="_blank">http://api.weatherapi.com</a></p>
                <form class="weather-form" @submit.prevent="apiCall">
                    <select placeholder="Select" v-model="select">
                        <option v-for="option in selectOptions" :value="option" :key="option">{{option}}</option>
                    </select>

                    <div v-if="select === 'cords'" class="weather-form__cords">
                        <input type="number" step="0.01" required placeholder="lat" v-model="form.lat">
                        <input type="number" step="0.01" required placeholder="lon" v-model="form.lon">
                    </div>
                    <input v-else type="text" required placeholder="city" v-model="form.city">

                    <button type="submit" class="btn">Get weather</button>
                </form>
                <Spacer class="spacer-10" />
                <div class="row">
                    <div class="col-lg-4">
                        <tempalte v-if="weather_data !== null">
                            <div class="weather-result">
                                <h2 class="h2">{{weather_data.location.name}}</h2>
                                <h3 class="h3">Country: {{weather_data.location.country}} (lat: {{weather_data.location.lat}} / lon: {{weather_data.location.lon}})</h3>
                                <div class="weather-block">
                                    <div class="weather-block__icon" :title="weather_data.current.condition.text">
                                        <img :src="weather_data.current.condition.icon" :alt="weather_data.current.condition.text">
                                    </div>
                                    <div class="weather-block__right">
                                        <p>temp: {{weather_data.current.temp_c}} c / {{weather_data.current.temp_f}} f</p>
                                        <p>wind: {{weather_data.current.wind_kph}} km/h</p>
                                    </div>
                                </div>
                            </div>
                        </tempalte>
                    </div>
                    <div class="col-lg-8">
                        <div class="map" ref="map"></div>
                    </div>
                    <div class="col">
                        <div class="results" v-if="prev_weather_data.length">
                            <div v-for="(w_data, i) in prev_weather_data" class="result" :key="i" @click="prevApiCall(w_data, i)">
                                <div class="result__left">
                                    <div class="result__title">{{w_data.location.name}}</div>
                                    <img :src="w_data.current.condition.icon" :alt="w_data.current.condition.text">
                                </div>
                                <div class="result__right">
                                    <div class="result__del" @click.stop="delWeatherData(i)">X</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useWeatherData, pushWeatherData, delWeatherData } from '~/composables/weatherData'
const YANDEX_API_KEY = '57455d83-dbfb-4188-922f-1fec2a30b739'
const WEATHER_API_KEY = 'b9daf97db26b433988b52142220206'
const url = 'http://api.weatherapi.com/v1/current.json'
function generateQuery(obj: Record<string, string>): string {
    if (Object.keys(obj).length === 0) return ''
    let query = '?'
    for (const key in obj) {
        query += key + '=' + obj[key] + '&'
    }
    return query.substring(0, query.length - 1)
}
async function getInfo(query): Promise<any> {
    const res = await fetch(url + query, {
        method: 'GET'
    })
    if (!res.ok) throw res
    const weather_data = await res.json()
    return weather_data
}
function prevApiCall(weather_data, i) {
    select.value = 'city'
    form.value.city = weather_data.location.name
    delWeatherData(i)
    apiCall()
}
async function apiCall(): Promise<void> {
    const obj: any = {key: WEATHER_API_KEY}
    if (select.value === 'cords') {
        obj.q = `${form.value.lat},${form.value.lon}`
    }else {
        obj.q = form.value.city
    }
    const query = generateQuery(obj)
    weather_data.value = await getInfo(query)
}
const form = ref<Record<string, string>>({
    lat: '',
    lon: '',
    city: ''
})
const selectOptions = ref<string[]>([
    'city',
    'cords',
])
const select = ref<string>(selectOptions.value[0])
watch(select, () => {
    for (const key in form.value) {
        form.value[key] = ''
    }
})
const weather_data = ref(null)
const prev_weather_data = useWeatherData()

watch(weather_data, (newval) => {
    if (newval?.location?.lat && yandex_map.value) {
        yandex_map.value.panTo([newval.location.lat, newval.location.lon], {
            // flying: false,
            // safe: false,
        })
        // yandex_map.value.container.fitToViewport()

        if (prev_weather_data.value.length > 4) delWeatherData(0)
        pushWeatherData(newval)
    }
}, {deep: true})

const map = ref<HTMLElement | null>(null)
const yandex_map = ref(null)

onMounted(() => {
    fetch(`https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${YANDEX_API_KEY}`)
        .then(res => {
            if (!res.ok) throw res
            return res.text()
        })
        .then(str => {
            new Function(str)()
            ymaps.ready(() => {
                // Creating the map.    
                yandex_map.value = new ymaps.Map(map.value, {
                    // The map center coordinates.
                    // Default order: “latitude, longitude”.
                    // To not manually determine the map center coordinates,
                    // use the Coordinate detection tool.
                    center: [55.76, 37.64],
                    // Zoom level. Acceptable values:
                    // from 0 (the entire world) to 19.
                    zoom: 7
                });
            });
        })
})
</script>

<style lang="scss" scoped>
.weather-form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--column-gap);
    .btn {
        width: 100%;
        border-radius: 4px;
    }
    &__cords {
        display: flex;
        gap: 10px;
    }
}
.weather-block {
    display: flex;
    gap: 30px;
    max-width: 350px;
    &__icon {
        width: 100px;
        flex-shrink: 0;
        img {
            width: 100%;
            height: 100%;
        }
    }
    &__right {
        width: 100%;
    }
}
.map {
    height: 500px;
    background-color: var(--contrast);
}
.results {
    display: grid;
    grid-gap: 10px;
}
.result {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 30px;
    background-color: rgba(var(--rgba-bgc), .4);
    padding: 10px;
    border-radius: 5px;
    &__title {
        font-weight: bold;
    }
    img {
        margin: 0 10px;
        width: 20px;
        height: 20px;
    }
    &__left {
        display: flex;
        align-items: center;
    }
    &__right {
        margin-left: auto;
    }
    &__del {
        font-weight: bold;
        fonts-size: 3em;
    }
}
</style>