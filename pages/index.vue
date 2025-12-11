<template>
  <div class="container">
    <div class="btns-Locale">
      <EBtn color="success" @click="setLocale('zh-TW')">繁體中文</EBtn>
      <EBtn color="success" @click="setLocale('en-US')">English</EBtn>
    </div>
    <div class="operate">
      <span>{{ $t('operation') }}</span>
      <div class="textfields">
        <ETextField :label="$t('name')" />
        <ETextField :label="$t('age')" />
      </div>
      <div class="btns-operate">
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
          <tr>
            <td>1</td>
            <td>小王</td>
            <td>30</td>
            <td class="btns-profile">
              <EBtn color="success">{{ $t('edit') }}</EBtn>
              <EBtn color="error">{{ $t('delete') }}</EBtn>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>小王</td>
            <td>30</td>
            <td class="btns-profile">
              <EBtn color="success">{{ $t('edit') }}</EBtn>
              <EBtn color="error">{{ $t('delete') }}</EBtn>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>小王</td>
            <td>30</td>
            <td class="btns-profile">
              <EBtn color="success">{{ $t('edit') }}</EBtn>
              <EBtn color="error">{{ $t('delete') }}</EBtn>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>小王</td>
            <td>30</td>
            <td class="btns-profile">
              <EBtn color="success">{{ $t('edit') }}</EBtn>
              <EBtn color="error">{{ $t('delete') }}</EBtn>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>小王</td>
            <td>30</td>
            <td class="btns-profile">
              <EBtn color="success">{{ $t('edit') }}</EBtn>
              <EBtn color="error">{{ $t('delete') }}</EBtn>
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
  padding: 50px 20px;
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

  .operate {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    flex: 1 1 0;
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
    flex: 1 1 0;
    text-align: center;
    border: 1px solid white;
    border-radius: 10px;
    margin-top: 20px;
    padding: 10px 20px;
    overflow: scroll;
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

    .btns-Locale {
      top: 10px;
      right: 10px;

      >*:not(:first-child) {
        margin-left: 5px;
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
      margin-top: 40px;
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
    padding: 80px 300px;

    .btns-Locale {
      top: 20px;
      right: 50px;

      >*:not(:first-child) {
        margin-left: 10px;
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
      margin-top: 40px;
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
