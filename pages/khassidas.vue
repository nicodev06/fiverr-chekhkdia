<template>
    <div>
        <Navbar/>
        <main>
            <div 
            class="d-flex justify-content-center align-items-start mt-5"
            style="width: 100vw; height: 100vh"
            >
                <div class="container">
                    <h1 
                    class="text-center p-2"
                    style="text-decoration: underline;"
                    >Khassidas List</h1>
                    <table class="table table-success table-striped mt-5">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Times</th>
                            <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                            v-for="(khassida,index) in khassidas"
                            :key="index"
                            >
                            <th scope="row">{{index + 1}}</th>
                            <td>{{khassida.title}}</td>
                            <td>
                                <input 
                                type="number" 
                                v-model="khassida.currentUserTotalTimes"
                                class="form-control"
                                style="width:25%;">    
                            </td>
                            <td>{{khassida.total}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <form @submit.prevent="submitTimesUpdate()">
                        <button
                        type="submit"
                        class="btn save-changes"
                        style="background-color: var(--bs-green); color: var(--bs-white);"
                        >
                        <div class="d-flex align-items-center">
                            <p style="margin: 0;">Save changes</p>
                            <div v-if="loading" class="lds-dual-ring mx-2"></div>
                        </div>
                        </button>
                    </form>
                </div>
            </div>
        </main>
        <Footer/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    </div>
</template>

<script>
import {client} from '../lib/client';

export default {
    name: 'khassidasPage',
    data(){
        return {
            khassidas: null,
            loadingChanges: false
        }
    },
    async fetch(){
        const query = `
        *[_type=="khassida"]{
            _id,
            title,
            total
        }`;
        this.khassidas = await client.fetch(query);
        for (let khassida of this.khassidas){
            khassida.currentUserTotalTimes = 0;    
        }
    },
    fetchOnServer: false, 
    methods: {
        async submitTimesUpdate(){
            this.loading = true;
            for (let khassida of this.khassidas){
                await client.patch(khassida._id).inc({total: +khassida.currentUserTotalTimes}).commit();
                khassida.total += +khassida.currentUserTotalTimes;
                khassida.currentUserTotalTimes = 0;
            }
        this.loading = false;
        }
    } 
}
</script>

<style>
.lds-dual-ring {
  display: inline-block;
  width: 1em;
  height: 1em;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  border: 3px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.save-changes {
    transition: all 0.6s ease-in-out;
}

</style>