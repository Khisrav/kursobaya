<script setup>
const { $supabase } = useNuxtApp()

const name = ref('');
const email = ref('');
const surname = ref('');


const getClients = async () => {
    const { data, error } = await $supabase.from('clients')
        .select('*')
    if (error) {
        console.error(error)
    } else {
        console.log(data)
        return data;
    }
}

const clients = ref(await getClients())

const addClient = async () => {
    const { data, error } = await $supabase.from('clients')
        .insert([{ name: name.value, surname: surname.value, email: email.value }])
    if (error) {
        console.error(error)
    } else {
        alert('Клиент успешно добавлен!')
        clients.value = await getClients()
    }
}
</script>

<template>
    <h1 class="text-2xl font-bold">Добавить клиента</h1>

    <form @submit.prevent="addClient">
        <div class="mb-5">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Имя</label>
            <input v-model="name" type="text" id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Имя" required />
        </div>
        <div class="mb-5">
            <label for="surname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Фамилия</label>
            <input v-model="surname" type="text" id="surname"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Фамилия" required />
        </div>
        <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input v-model="email" type="email" id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email" required />
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
                        Имя Клиента
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Фамилия Клиента
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Email Клиента
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="client in clients" :key="client.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="px-6 py-4">
                        {{ client.id }}
                    </td>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ client.name }}
                    </th>
                    <td class="px-6 py-4">
                        {{ client.surname }}
                    </td>
                    <td class="px-6 py-4">
                        {{ client.email }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>