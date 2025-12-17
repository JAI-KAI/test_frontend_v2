<template>
  <div>
    <label>{{ label }}</label>
    <input v-model="value" :type="props.type" />
  </div>
</template>

<script setup lang="ts">

interface Props {
  id?: string // 若使用者有輸入，以使用者輸入的為主，若沒有請產出一個唯一 ID
  label?: string
  type?: string
  modelValue?: string | number
}
const props = withDefaults(defineProps<Props>(), { type: 'text', modelValue: '' })
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})


</script>

<style scoped lang="scss">
label {
  display: block;
  text-align: left;
}

div {
  width: 100%;
  box-sizing: border-box;
}

input {
  width: 100%;
  padding: 4px 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

@media (min-width: 1024px) {
  input {
    padding: 8px 12px;
  }
}
</style>
