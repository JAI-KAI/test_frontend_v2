<template>
  <div class="container">
    <div class="bts-Locale">
      <EBtn color="success" @click="setLocale('zh-TW')">繁體中文</EBtn>
      <EBtn color="success" @click="setLocale('en-US')">English</EBtn>
    </div>
    <div class="operate">
      <h2>{{ $t('operation') }}</h2>
      <div class="textfields">
        <ETextField :label="$t('name')" />
        <ETextField :label="$t('age')" />
      </div>
      <div class="bts-operate">
        <EBtn color="success">{{ $t('edit') }}</EBtn>
        <EBtn color="warn">{{ $t('add') }}</EBtn>
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
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useI18n } from 'vue-i18n';
// vue-i18n
const { t, locale } = useI18n();

const setLocale = (lang: "zh-TW" | "en-US") => {
  locale.value = lang;
};

// axios 
const baseUrl = 'https://40875.wu.elitepro.ltd' // 後端網址 將由面試官提供

const { data } = await useAsyncData('user', () =>
  axios.get(baseUrl)
);

const addData = async (userInput: {}) => {
  try {
    const response = await axios.post(baseUrl, userInput);
    console.log('Data added:', response.data);
  } catch (error) {
    console.error('Error adding data:', error);
  }
};

const editData = async (id: number, userInput: {}) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, userInput);
    console.log('Data edited:', response.data);
  } catch (error) {
    console.error('Error editing data:', error);
  }
};

const deleteData = async (id: number) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    console.log('Data deleted:', response.data);
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100%;
  width: 100%;
  padding: 100px 80px;
  background-color: gray;
  color: white;

  .bts-Locale {
    position: absolute;
    top: 20px;
    right: 20px;

    >*:not(:first-child) {
      margin-left: 5px;
    }
  }

  .operate {
    flex: 1;
    text-align: center;
    border: 1px solid white;
    border-radius: 10px;
    padding: 30px 80px;

    .textfields {
      >*:not(:first-child) {
        margin-top: 20px;
      }
    }

    .bts-operate {
      display: flex;
      justify-content: end;
      margin-top: 30px;

      :first-child {
        margin-right: 20px;
      }
    }
  }

  .profile {
    flex: 1;
    text-align: center;
    border: 1px solid white;
    border-radius: 10px;
    margin-top: 50px;
    padding: 30px 80px;

    table {
      table-layout: fixed;
      width: 100%;

      tr {}
    }

  }
}
</style>
