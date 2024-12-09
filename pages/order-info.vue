<script setup>
const { $supabase } = useNuxtApp()

const quantity = ref(0);
const order_id = ref(0);
const item_id = ref(0);

const getItems = async () => {
    const { data, error } = await $supabase.from('items')
        .select('*')
    if (error) {
        console.error(error)
    } else {
        console.log(data)
        return data;
    }
}

const getOrders = async () => {
    const { data, error } = await $supabase.from('orders')
        .select('*')
    if (error) {
        console.error(error)
    } else {
        console.log(data)
        return data;
    }
}

const getOrderInfo = async () => {
    const { data, error } = await $supabase.from('order_info')
        .select('*').eq('order_id', order_id.value)
    if (error) {
        console.error(error)
    } else {
        console.log(data)
        return data;
    }
}

const orders = ref(await getOrders())
const items = ref(await getItems())
const order_info = ref(await getOrderInfo())

const updateOrderInfo = async () => {
    const { data, error } = await $supabase.from('order_info')
        .insert([{ order_id: order_id.value, item_id: item_id.value, quantity: quantity.value }])
    if (error) {
        console.error(error)
    } else {
        alert('Заказ успешно обновлен!')
        order_info.value = await getOrderInfo()
        console.log(order_info.value)
    }
}

const handleOrderChange = async () => {
  order_info.value = await getOrderInfo(order_id.value)
  console.log(order_info.value)
}
</script>

<template>
    <h1 class="text-2xl font-bold">Информация о заказе</h1>

    <form @submit.prevent="updateOrderInfo">
        <div class="mb-5">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Выберите заказ</label>
            <select v-model="order_id" @change="handleOrderChange" id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Товары" required>
                <option v-for="order in orders" :key="order.id" :value="order.id">Заказ №{{ order.id }} от {{ order.date }}</option>
            </select>
        </div>
        <div class="mb-5">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Выберите товар</label>
            <select v-model="item_id" id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Товары" required>
                <option v-for="item in items" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
        </div>
        <div class="mb-5">
            <label for="surname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Количество</label>
            <input v-model="quantity" type="text" id="surname"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Кол-во" required />
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Добавить</button>
    </form>
    
    <div class="relative overflow-x-auto sm:rounded-lg mt-16">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        ID
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Товар
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Заказ
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Кол-во
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in order_info" :key="item.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="px-6 py-4">
                        {{ item.id }}
                    </td>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        №{{ item.item_id }} - {{ items[item.item_id - 1].name }}
                    </th>
                    <td class="px-6 py-4">
                        №{{ item.order_id }} от {{ orders[item.order_id - 1].date }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.quantity }} шт.
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>