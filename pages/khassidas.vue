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
                    class="text-center"
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
                                <form @submit="submitTimesUpdate(khassida)">
                                    <input 
                                    type="number" 
                                    v-model="khassida.currentUserTotalTimes"
                                    class="form-control"
                                    style="width:25%;">
                                </form>
                            </td>
                            <td>{{khassida.totalTimes}}</td>
                            </tr>
                        </tbody>
                    </table>
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
            khassidasCurrentUser: null,
            currentUser: null
        }
    },
    async fetch(){
        const query = `
        *[_type=="khassida"]{
            _id,
            title,
            'activities': activities[]->{
                _id,
                user->{_id},
                times
            } 
        }`;
        this.khassidas = await client.fetch(query);
        this.currentUser = await client.fetch(`*[_type == "user" && _id == "e1e62da7-f6ac-4af7-a501-e04d81b2c1bb"]`)[0];
        for (let khassida of this.khassidas){
            khassida.totalTimes = 0;
            khassida.currentUserTotalTimes = 0;
            khassida.lastActivity = null;
            if (khassida.activities !== null){
                for (let activity of khassida.activities){
                khassida.totalTimes += activity.times;
                if (activity.user._id === "e1e62da7-f6ac-4af7-a501-e04d81b2c1bb"){ // current user id
                    khassida.currentUserTotalTimes += activity.times;
                    khassida.lastActivity = activity._id;
                }
            }
        }
            }
    },
    methods: {
        async submitTimesUpdate(khassida){
            if (khassida.lastActivity !== null){
                await client.patch(khassida.lastActivity).set({times: +khassida.currentUserTotalTimes}).commit();
            } else {
                let activityResponse = await client.create({
                    _type: "khassida-activity",
                    times: +khassida.currentUserTotalTimes,
                    user: {
                        _type: "reference",
                        _ref: "e1e62da7-f6ac-4af7-a501-e04d81b2c1bb"
                    }
                });
                console.log(await client.patch(khassida._id).setIfMissing({activities: []}).insert('after', 'activities[-1]', [{
                    _type: "reference",
                    _ref: activityResponse._id
                }]).commit({autoGenerateArrayKeys: true}));
            }
        }
    } 
}
</script>