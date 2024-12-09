<script setup>
const { $supabase } = useNuxtApp()

const name = ref('');
const price = ref(0);

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

const items = ref(await getItems())

const addItem = async () => {
    const { data, error } = await $supabase.from('items')
        .insert([{ name: name.value, price: price.value }])
    if (error) {
        console.error(error)
    } else {
        alert('Товар успешно добавлен!')
        items.value = await getItems()
    }
}
</script>

<template>
    <h1 class="text-2xl font-bold">Добавить товар</h1>

    <form @submit.prevent="addItem">
        <div class="mb-5">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Наименование</label>
            <input v-model="name" type="text" id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Наименование" required />
        </div>
        <div class="mb-5">
            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Цена</label>
            <input v-model="price" type="number" id="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Цена" required />
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
                        Наименование
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Цена
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="px-6 py-4">
                        {{ item.id }}
                    </td>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ item.name }}
                    </th>
                    <td class="px-6 py-4">
                        {{ item.price }} руб.
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>