<template>
  <div class="container">
    <add-order-view />
    <div>
      <table class="order-table">
        <tr>
          <th>Название товара</th>
          <th>Количество</th>
          <th>Стоимость</th>
        </tr>

        <tr v-for="product in products" :key="product.id">
          <td>{{ product.title }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.quantity * product.price }}₽</td>
        </tr>
      </table>
      <p>
        Итоговая стоимость: <b>{{ total }}</b>
      </p>
      <button class="button" type="button" :disabled="!products.length" @click="createOrder">Сохранить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Core
import { computed, ComputedRef, onMounted } from 'vue';
import { useStore } from 'vuex';

// ActionTypes
import { ProductsActionTypes } from '@/store/modules/products/action-types';
import { AddedProduct } from '@/typespaces/interfaces/product.interface';
import AddOrderView from '@/views/Products/AddProduct.vue';

const store = useStore();
const products: ComputedRef<AddedProduct[]> = computed(() => store.getters.getAddedProducts);
const total: ComputedRef<number> = computed(() => store.getters.getTotal);

const createOrder = () => {
  const data = products.value.map((item) => ({ product_id: item.id, quantity: item.quantity }));
  store
    .dispatch(ProductsActionTypes.CREATE_ORDER, data)
    .then((data) => {
      alert(`Номер вашего заказа ${data.code}`);
    })
    .catch(() => {
      alert('Не удалось создать заказ');
    });
};

onMounted(() => {
  store.dispatch(ProductsActionTypes.FETCH_PRODUCTS);
});
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 400px auto;
  gap: 50px;
}

.order-table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid;
  text-align: center;
  font: var(--regular);
  word-break: break-all;
}

.order-table td {
  border: 1px solid;
  padding: 13px 5px;
  word-wrap: break-word;
}

.order-table th {
  border: 1px solid;
  padding: 7px 0;
}

.button {
  margin-top: 21px;
  width: 100%;
  padding: 12px 0;
  color: #ffffff;
  background: var(--main-blue);
  border: none;
  border-radius: 5px;
}
</style>
