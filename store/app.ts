import type { UserData } from '~/pages/index.vue';
export const useAppStore = defineStore('app', () => {
    const userData = ref<UserData[]>([]);

    function setUserData(data: UserData[]) {
        userData.value = data;
    }
    return { userData, setUserData };
})
