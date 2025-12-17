<template>
  <div class="container">
    <div class="btns-Locale">
      <EBtn color="success" @click="setLocale('zh-TW')">繁體中文</EBtn>
      <EBtn color="success" @click="setLocale('en-US')">English</EBtn>
    </div>
    <dialog ref="dialog">
      <div class="dialog-content">
        <p>{{ $t(dialogState == 'add' ? 'dialog_confirm_add' : dialogState == 'edit' ? 'dialog_confirm_edit' :
          'dialog_confirm_delete') }}</p>
        <div>
          <EBtn @click="closeDialog" color="error">{{ $t('cancel') }}</EBtn>
          <EBtn @click="handleConfirm" color="success">{{ $t('confirm') }}</EBtn>
        </div>
      </div>
    </dialog>
    <div class="operate">
      <span>{{ $t('operation') }}</span>
      <div class="textfields">
        <ETextField v-model="inputName" type="text" :label="$t('name')" />
        <ETextField v-model.number="inputAge" type="number" :label="$t('age')" />
      </div>
      <div class="btns-operate">
        <EBtn @click="openDialog('edit', currentUserId)" color="success">{{ $t('edit') }}</EBtn>
        <EBtn @click="openDialog('add')" color="warn">{{ $t('add') }}</EBtn>
      </div>
    </div>
    <div class="profile">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('name') }}</th>
            <th>{{ $t('age') }}</th>
            <th>{{ $t('operation') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userStore.userData" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.age }}</td>
            <td class="btns-profile">
              <EBtn @click="handleEdit({ id: user.id, name: user.name, age: user.age })" color="success">
                {{ $t('edit') }}
              </EBtn>
              <EBtn @click="openDialog('delete', user.id)" color="error">{{ $t('delete') }}</EBtn>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useI18n } from 'vue-i18n';
import { useAppStore } from '~/store/app';
const userStore = useAppStore();
// vue-i18n
const { t, locale } = useI18n();

const setLocale = (lang: "zh-TW" | "en-US") => {
  locale.value = lang;
};

// input 欄位綁定
const inputName = ref('');
const inputAge = ref<number>(0);

// dialog
const dialog = ref<HTMLDialogElement | null>(null);
const dialogState = ref<'add' | 'edit' | 'delete' | null>(null);
const currentUserId = ref<number | null | undefined>(null);

const openDialog = (state: 'add' | 'edit' | 'delete' | null, id?: number | null) => {
  dialogState.value = state;
  currentUserId.value = id;
  dialog.value?.showModal();
};
const closeDialog = () => {
  dialog.value?.close();
};
const handleConfirm = () => {
  const cleanInput = {
    name: inputName.value.trim(),
    age: inputAge.value
  }
  if (dialogState.value === 'add' && checkValid()) {
    addData(cleanInput);

  } else if (dialogState.value === 'edit' && currentUserId.value && checkValid()) {
    editData(currentUserId.value, cleanInput);

  } else if (dialogState.value === 'delete' && currentUserId.value) {
    deleteData(currentUserId.value);
  }

  closeDialog();
}

const handleEdit = (user: UserData) => {
  inputName.value = user.name;
  inputAge.value = user.age;
  currentUserId.value = user.id;
};

// 前端資料驗證
const checkValid = () => {
  let isValid = true; // 有效性標記
  const trimmedName = inputName.value.trim()
  if (!trimmedName) {
    isValid = false
    console.log('名字為必填。');
  } else if (trimmedName.length < 2 || trimmedName.length > 10) {
    isValid = false
    console.log('名字長度需在 2 到 10 個字元之間。');
  } else if (!isNaN(Number(trimmedName))) {
    isValid = false
    console.log('名字不可為數字組成',)
  }

  if (!inputAge.value) {
    isValid = false;
    console.log('年齡為必填。');
  } else if (inputAge.value < 1 || inputAge.value > 100) {
    isValid = false;
    console.log('年齡需介於 1 到 100 歲之間。');
  }
  return isValid
}

// axios 
const baseUrl = 'https://40875.wu.elitepro.ltd' // 後端網址 將由面試官提供

export interface UserData {
  id?: number;
  name: string;
  age: number;
}


//獲取資料
const { data: userData } = await useAsyncData<UserData[]>('user', async () => {
  const response = await axios.get(`${baseUrl}/api/user`)
  return response.data.data
});

if (userData.value) {
  console.log('Fetched data:', userData.value);
  userStore.setUserData(userData.value);
} else {
  console.log('No data fetched');
}

const addData = async (userInput: UserData) => {
  try {
    const response = await axios.post(`${baseUrl}/api/user`, userInput);
    const { id } = response.data.data;
    userStore.userData.push({ ...userInput, id });
    resetInputFields();
    console.log('Data added:', response.data);
  } catch (error) {
    console.error('Error adding data:', error);
  }
};

const editData = async (id: number, userInput: UserData) => {
  try {
    const response = await axios.put(`${baseUrl}/api/user`, { id, ...userInput });
    const index = userStore.userData.findIndex((user) => user.id == id)
    userStore.userData[index] = { id, ...userInput }
    resetInputFields();
    console.log('Data edited:', response.data);
  } catch (error) {
    console.error('Error editing data:', error);
  }
};

const deleteData = async (id: number) => {
  try {
    const response = await axios.delete(`${baseUrl}/api/user`, { data: { id: id } });
    userStore.userData = userStore.userData.filter(user => user.id !== id)
    console.log('Data deleted:', response.data);
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

const resetInputFields = () => {
  inputName.value = '';
  inputAge.value = 0;
  currentUserId.value = null
};

</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 100%;
  width: 100%;
  padding: 50px 20px;
  gap: 20px;
  background-color: gray;
  color: white;

  .btns-Locale {
    display: flex;
    position: absolute;
    top: 5px;
    right: 5px;

    >*:not(:first-child) {
      margin-left: 3px;
    }
  }


  dialog {
    width: 300px;
    border: none;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;

    .dialog-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .e-btn {
      margin: 0 10px;
    }
  }


  .operate {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    flex: 1;
    min-height: 0;
    text-align: center;
    border: 1px solid white;
    border-radius: 10px;
    padding: 20px 40px;

    >span {
      font-size: 18px;
      font-weight: bold;
    }

    .textfields {
      >*:not(:first-child) {
        margin-top: 5px;
      }
    }

    .btns-operate {
      display: flex;
      justify-content: end;
      margin-top: 30px;

      :first-child {
        margin-right: 20px;
      }
    }
  }

  .profile {
    text-align: center;
    border: 1px solid white;
    border-radius: 10px;
    padding: 10px 20px;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;

    table {
      table-layout: fixed;
      width: 100%;
      border-collapse: collapse;

      tbody {
        tr {
          border-bottom: 1px solid white;

          td {
            padding: 5px 0;
          }
        }

        .btns-profile {
          display: flex;
          justify-content: center;

          >*:not(:first-child) {
            margin-left: 5px;
          }

          .e-btn {
            min-width: 30px;
            height: 40px;
          }
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .container {
    padding: 120px 100px;
    gap: 30px;

    .btns-Locale {
      top: 10px;
      right: 10px;

      >*:not(:first-child) {
        margin-left: 5px;
      }
    }

    dialog {
      width: 400px;
      padding: 30px;

      .dialog-content {
        gap: 30px;
      }
    }

    .operate {
      padding: 40px 80px;

      .textfields {
        >*:not(:first-child) {
          margin-top: 15px;
        }
      }

      .btns-operate {
        margin-top: 50px;

        :first-child {
          margin-right: 20px;
        }
      }
    }

    .profile {
      padding: 20px 60px;

      table {
        tbody {
          tr {
            td {
              padding: 10px 0;
            }
          }

          tr:first-child td {
            padding-top: 30px;
          }

          .btns-profile {
            display: flex;
            justify-content: center;

            >*:not(:first-child) {
              margin-left: 5px;
            }

            .e-btn {
              min-width: 40px;
              height: 30px;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 50px 300px;
    gap: 40px;

    .btns-Locale {
      top: 20px;
      right: 50px;

      >*:not(:first-child) {
        margin-left: 10px;
      }
    }

    dialog {
      width: 600px;
      padding: 40px;

      .dialog-content {
        gap: 40px;
      }
    }

    .operate {
      padding: 50px 120px;

      .textfields {
        >*:not(:first-child) {
          margin-top: 15px;
        }
      }

      .btns-operate {
        margin-top: 60px;

        .e-btn {
          min-width: 60px;
          height: 35px;


        }

        :first-child {
          margin-right: 20px;
        }

      }
    }

    .profile {
      padding: 20px 60px;

      table {
        tbody {
          tr {
            td {
              padding: 15px 0;
            }
          }

          tr:first-child td {
            padding-top: 40px;
          }

          .btns-profile {
            display: flex;
            justify-content: center;

            >*:not(:first-child) {
              margin-left: 10px;
            }

            .e-btn {
              min-width: 45px;
              height: 35px;
            }
          }
        }
      }
    }
  }
}
</style>
