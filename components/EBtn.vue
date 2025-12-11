<template>
  <button class="e-btn" :class="'e-btn-' + color">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string // 若有輸入時以此為主，若沒有就顯示 slot
  color?: 'success' | 'error' | 'warn' // 預設為 success
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<style scoped lang="scss">
.e-btn {
  min-width: 50px;
  height: 30px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  border: none;
  text-align: center;

  // success 綠
  &-success {
    background-color: #21c46d;


    &:hover {
      background-color: #2f855a;
    }

    &:active {
      background-color: #276749;
    }
  }

  // error 紅
  &-error {
    background-color: #e53e3e;

    &:hover {
      background-color: #9b2c2c;
    }

    &:active {
      background-color: #742a2a;
    }
  }

  // warn 黃
  &-warn {
    color: black;
    background-color: #efbc15;

    &:hover {
      background-color: #b18802;
    }

    &:active {
      background-color: #975a03;
    }
  }
}
</style>
