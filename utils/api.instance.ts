import { Configuration, UserApi } from '~/utils/api';

const config = new Configuration({
    basePath: 'https://40875.wu.elitepro.ltd/api/user'
})

export const userApi = new UserApi(config)