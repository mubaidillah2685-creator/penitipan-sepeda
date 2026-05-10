<script>
    import { onMount } from 'svelte';

    let nama = $state('');
    let plat = $state('');
    let jenis = $state('');
    let biaya = $state('');

    let data = $state([]);

    let editId = $state(null);

    async function loadData() {
        const res = await fetch('/api/motor');
        data = await res.json();
    }

    async function simpan() {
        const body = {
            nama,
            plat,
            jenis,
            biaya
        };

        if (editId !== null) {
            await fetch(`/api/motor/${editId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            editId = null;
        } else {
            await fetch('/api/motor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        }

        nama = '';
        plat = '';
        jenis = '';
        biaya = '';

        loadData();
    }

    async function hapus(id) {
        await fetch(`/api/motor/${id}`, {
            method: 'DELETE'
        });

        loadData();
    }

    function edit(item) {
        editId = item.id;

        nama = item.nama;
        plat = item.plat;
        jenis = item.jenis;
        biaya = item.biaya;
    }

    onMount(() => {
        loadData();
    });
</script>

<div class="min-h-screen bg-gray-100 p-10">
    <div class="max-w-5xl mx-auto">

        <h1 class="text-4xl font-bold text-center mb-10 text-blue-700">
            Aplikasi Penitipan Motor
        </h1>

        <div class="bg-white p-6 rounded-2xl shadow-lg mb-10">

            <div class="grid grid-cols-2 gap-4">

                <input
                    bind:value={nama}
                    placeholder="Nama Pemilik"
                    class="border p-3 rounded-lg"
                />

                <input
                    bind:value={plat}
                    placeholder="Nomor Plat"
                    class="border p-3 rounded-lg"
                />

                <input
                    bind:value={jenis}
                    placeholder="Jenis Motor"
                    class="border p-3 rounded-lg"
                />

                <input
                    bind:value={biaya}
                    placeholder="Biaya"
                    class="border p-3 rounded-lg"
                />
            </div>

            <button
                onclick={simpan}
                class="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
            >
                {editId ? 'Update Data' : 'Tambah Data'}
            </button>
        </div>

        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">

            <table class="w-full">

                <thead class="bg-blue-600 text-white">
                    <tr>
                        <th class="p-4">Nama</th>
                        <th class="p-4">Plat</th>
                        <th class="p-4">Jenis</th>
                        <th class="p-4">Biaya</th>
                        <th class="p-4">Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    {#each data as item}
                        <tr class="border-b">

                            <td class="p-4">{item.nama}</td>
                            <td class="p-4">{item.plat}</td>
                            <td class="p-4">{item.jenis}</td>
                            <td class="p-4">
                                Rp {item.biaya}
                            </td>

                            <td class="p-4 flex gap-2">

                                <button
                                    onclick={() => edit(item)}
                                    class="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Edit
                                </button>

                                <button
                                    onclick={() => hapus(item.id)}
                                    class="bg-red-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Hapus
                                </button>

                            </td>
                        </tr>
                    {/each}
                </tbody>

            </table>

        </div>
    </div>
</div>