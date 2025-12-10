<template>
  <div>
    <label>{{ label }}</label>
    <input />
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string // 若使用者有輸入，以使用者輸入的為主，若沒有請產出一個唯一 ID
  label?: string
}

const props = withDefaults(defineProps<Props>(), {})
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
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
