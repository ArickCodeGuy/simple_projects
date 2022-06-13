<template>
    <div class="Form">
        <div class="Form__item" v-for="item in props.items">
            <div class="Form__title">{{item.title}}</div>
            <Spacer class="spacer-2" />
            <textarea v-if="item.type === 'textarea'" v-model="item.value" :placeholder="item.placeholder" :name="item.key"></textarea>
            <input v-else-if="item.type === 'checkbox'" type="checkbox" v-model="item.value" :placeholder="item.placeholder" :name="item.key">
            <input v-else type="text" v-model="item.value" :placeholder="item.placeholder" :name="item.key">
        </div>
        <div class="Form__item">
            <div class="Form__submit btn" @click="submit()">Submit</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface Item_prop {
    title: string;
    key: string;
    value: string;
    type?: 'input' | 'textarea' | 'checkbox' | undefined;
    placeholder?: string;
}
interface Props {
    items?: Item_prop[];
    url?: string;
    method?: 'GET' | 'POST';
}
const props = defineProps<Props>()
const emit = defineEmits(['submit'])
async function submit() {
    const formData = {}
    props.items.forEach(i => {formData[i.key] = i.value})
    const res = await fetch('/api/post/new', {
        method: 'POST',
        body: JSON.stringify(formData)
    })
    if (!res.ok) throw error
    const data = await res.json()
    if (data.errors) throw data.errors
    // const route = useRoute()
    // console.log(data.link)
    emit('submit')
}
</script>

<style lang="scss" scoped>
.Form {
    display: grid;
    grid-gap: 20px;
    &__submit {
        width: 100%;
    }
}
</style>