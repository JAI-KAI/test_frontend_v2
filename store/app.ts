import type { MainGetUserInfoResp } from '~/utils/api';
export const useAppStore = defineStore('app', () => {
    const userData = ref<MainGetUserInfoResp[]>([]);

    function setUserData(data: MainGetUserInfoResp[]) {
        userData.value = data;
    }
    return { userData, setUserData };
})
