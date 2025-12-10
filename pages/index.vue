<template>
  <div class="container">
    <div class="operate">
      <h2>操作</h2>
      <div class="fields">
        <ETextField label="名子" />
        <ETextField label="年齡" />
      </div>
      <div class="bts">
        <EBtn color="success">修改</EBtn>
        <EBtn color="warn">新增</EBtn>
      </div>
    </div>
    <div class="profile">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>名子</th>
            <th>年齡</th>
            <th>操作</th>
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
const baseUrl = 'https://40875.wu.elitepro.ltd' // 後端網址 將由面試官提供

const { data } = await useAsyncData('user', () =>
  axios.get(baseUrl)
);
console.log(data);

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

  .operate {
    flex: 1;
    text-align: center;
    border: 1px solid white;
    border-radius: 10px;
    padding: 30px 80px;

    .fields {
      > :first-child {
        margin-bottom: 20px;
      }
    }

    .bts {
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
