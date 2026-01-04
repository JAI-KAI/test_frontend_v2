<template>
    <div>{{ obj.count }}</div>
    <button @click="$emit('myEmit', 'myEmit-test')">test</button>
    <button @click="testCount.increment()">{{ testCount.count }}</button>
</template>

<script setup>
import { useTest } from '@/store/test'
const testCount = useTest()
const props = defineProps(['id'])
const obj = reactive({ count: 0 })
const emit = defineEmits(['myEmit'])
const theme = inject('theme')
// console.log(theme);

//------------------watch------------------------
watch(obj, (newValue, oldValue) => {
    // 在嵌套的屬性變更時觸發
    // 注意：`newValue` 此處和 `oldValue` 是相等的
    // 因為它們是同一個對象！
    // console.log(newValue, oldValue);
})
obj.count++

//監聽屬性值需要提供一個 getter 函數
watch(() => props.id, (newValue, oldValue) => {
    // console.log(newValue);
},
    //強制偵聽器的回調立即執行
    { immediate: true }
)
// console.log(testCount.count);
</script>