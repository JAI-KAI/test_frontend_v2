export const useAppStore = defineStore('app', () => {
    const userData = ref([]);

    function setUserData(data: []) {
        userData.value = data;
    }
    return { userData, setUserData };
})
