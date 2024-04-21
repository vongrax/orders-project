<template>
  <div class="form-container">
    <form @submit="submitHandler">
      <p class="label">Выберите продукцию</p>
      <select class="input" v-model="formState.productId" @change="clearError">
        <option v-for="product in products" :key="product.id" :value="product.id">{{ product.title }}</option>
      </select>
      <span v-if="formState.productIdError" class="error">Выберите продукцию</span>
      <p class="label">Введите количество</p>
      <input class="input quantity-input" type="text" v-model="formState.quantity" @input="clearError" />
      <span v-if="formState.quantityError" class="error">Указано не верное значение</span>
      <button class="button" type="submit">Добавить</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, reactive } from 'vue';
import { Product } from '@/typespaces/interfaces/product.interface';
import { useStore } from 'vuex';
import { ProductsActionTypes } from '@/store/modules/products/action-types';

const formState = reactive({
  productId: '',
  quantity: '',
  quantityError: false,
  productIdError: false,
});

const store = useStore();
const products: ComputedRef<Product[]> = computed(() => store.getters.getProducts);

const clearError = () => {
  formState.quantityError = false;
  formState.productIdError = false;
};

const submitHandler = (event: Event) => {
  event.preventDefault();
  formState.quantityError = Number.isNaN(Number(formState.quantity)) || !formState.quantity;
  formState.productIdError = !formState.productId;
  if (formState.quantityError || formState.productIdError) {
    return;
  }
  const product = products.value.find((item) => item.id.toString() === formState.productId.toString());
  store.dispatch(ProductsActionTypes.ADD_PRODUCT, {
    product,
    quantity: Number(formState.quantity),
  });
  formState.productId = '';
  formState.quantity = '';
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
}

.label {
  padding: 0;
  margin: 0 21px 0 0;
}

.input {
  box-sizing: border-box;
  width: 100%;
  padding: 8px 10px;
  margin-bottom: 20px;
}

.quantity-input {
  margin-bottom: 0;
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

.error {
  color: red;
}
</style>
