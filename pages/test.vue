<template>
    <div class="container">
        <tr v-for="user in userStore.userData" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.age }}</td>
        </tr>
    </div>
</template>
<script setup>
import { useAppStore } from '~/store/app';
const userStore = useAppStore();
// const { userData } = storeToRefs(userStore)
console.log(userStore.userData);
</script>
<style scoped>
.container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    /* 三欄，比例 1:2:1 */
    /* 或 repeat(3, 1fr) / repeat(auto-fit, minmax(250px, 1fr)) */
    grid-template-rows: 100px auto 50px;
    gap: 20px;
    justify-items: center;
    /* 格子內內容水平對齊 */
    align-items: center;
    /* 格子內內容垂直對齊 */
}
</style>