<template>
<div>
<Navbar/>
<main>
    <div 
    class="d-flex justify-content-center align-items-start mt-5"
    style="width: 100vw; height: 100vh"
    >
    <div class="container">
        <h1 class="text-center p-2" style="text-decoration:underline;">
            Kaamil list
        </h1>
        <h3 class="text-center text-muted">Open Kaamils: {{openKaamils}} &nbsp;&nbsp; Closed Kaamils: {{closedKaamils}}</h3>
        <div
        v-for="(kaamil,index) in kaamils"
        :key = index
        >
            <div class="d-flex kaamil-name mt-5 mb-1 align-items-center">
                <h2>{{kaamil.name}}</h2>
                <button v-if="!kaamil.completed"
                type="button" 
                data-bs-toggle="modal" 
                :data-bs-target="'#' + kaamil.name.replace(/\s/g, '')"
                class="mx-2">
                    <em class="pi pi-pencil" style="color: var(--bs-white); z-index:-1;"></em>
                </button>
                <button 
                type="button"
                disabled
                style="background-color: var(--bs-green);"
                class="mx-2"
                v-else>
                    <em class="pi pi-check" style="color: var(--bs-white); z-index:-1;"></em>
                </button>
                <div v-if="!kaamil.completed" class="modal fade" :id="kaamil.name.replace(/\s/g, '')" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Mark {{kaamil.name}} as completed</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form @submit="onCompletionSubmit(kaamil._id)">
                                <div class="modal-body">
                                <span 
                                contentEditable="true" 
                                :id="'completionNote' + kaamil._id"
                                style="border:none;"
                                >Some notes</span>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-success">Confirm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <p class="my-1 text-muted">{{kaamil.start_date}} - {{kaamil.end_date}}</p>
            <p class="my-1 text-muted">Already read: {{kaamil.already_read !== null ? `${kaamil.already_read.length}/30` : '0/30'}}</p>
            <table 
            class="table table-success table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Current Book</th>
                <th scope="col">Second Book</th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="(user,index) in kaamil.users"
                :key=index
                >
                <th scope="row">{{index + 1}}</th>
                <td>{{user.username}}</td>
                <td>{{user.current_book.title}}</td>
                <td v-if="user.second_book">{{user.second_book.title}}</td>
                <td v-else>
                    <em class="pi pi-times"></em>
                </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
    </div>
</main>
<Footer/>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
</div>    
</template>

<script>
import 'primeicons/primeicons.css'
import {client} from '../lib/client'
export default {
    name:"KhassidasPage",
    data(){
        return {
            kaamils: null,
            openKaamils: null,
            closedKaamils: null,
            completionNote: null
        }
    },
    async fetch(){
        this.kaamils = await client.fetch(`*[_type == "kaamil"]{
            _id,
            name,
            start_date,
            end_date,
            'users': users[]-> {username, current_book->{title}, second_book->{title}},
            already_read,
            completed
        }`);
        this.closedKaamils = this.kaamils.filter(kaamil => {
            return kaamil.completed
        }).length;
        this.openKaamils = this.kaamils.length - this.closedKaamils;
    },
    fetchOnServer: false,
    methods: {
        async onCompletionSubmit(id){
            const note = document.querySelector('#completionNote' + id).innerHTML;
            await client.patch(id).set({completed:true, completion_note:note}).commit();
        }
    }
}
</script>

<style>

.kaamil-name > button {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--bs-gray);
    border:none;
}

</style>
