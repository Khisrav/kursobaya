<script setup>
const { $supabase } = useNuxtApp()

const clientID = ref(0);
const orderDate = ref(new Date());

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

const orders = ref(await getOrders())

const addOrder = async () => {
    const { data, error } = await $supabase.from('orders')
        .insert([{ client_id: clientID.value, date: orderDate.value }])
    if (error) {
        console.error(error)
    } else {
        alert('Заказ успешно добавлен!')
        orders.value = await getOrders()
    }
}
</script>

<template>
    <h1 class="text-2xl font-bold">Добавить заказ</h1>

    <form @submit.prevent="addOrder">
        <div class="mb-5">
            <label for="clientID" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID клиента</label>
            <input v-model="clientID" type="number" id="clientID"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ID клиента" required />
        </div>
        <div class="mb-5">
            <label for="orderDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Дата заказа</label>
            <input v-model="orderDate" type="date" id="oderDate"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Дата заказа" required />
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
                        ID клиента
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Дата заказа
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="px-6 py-4">
                        {{ order.id }}
                    </td>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ order.client_id }}
                    </th>
                    <td class="px-6 py-4">
                        {{ order.date }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>