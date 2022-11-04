<template>
<div>
<Navbar/>
<main>

  <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">Welcome!</h1>
        <h2 class="lead text-muted">{{country}}, {{time}}</h2>
        <p>
          <nuxt-link to="/kaamil" class="btn btn-success my-2">Kaamil <em class="pi pi-user"></em></nuxt-link>
          <a href="/khassidas" class="btn btn-success my-2">Khassidas <em class="pi pi-book"></em></a>
        </p>
      </div>
    </div>
  </section>

  <div class="album py-5 bg-light">
    <div class="container">

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-3">
        <div class="col">
          <div class="card">
            <div class="card-header">
                <p>Prayers Time <em class="pi pi-stopwatch"></em></p>
            </div>
            <ul class="list-group list-group-flush">
              <div 
            v-for="(prayer,index) in prayersTime"
            :key="index"
            class="d-flex justify-content-between list-group-item">
                <div>
                  {{prayer.name}}
                </div>
                <div>
                  <li class="list-group-item">{{prayer.time}}</li>
                </div>
            </div>
            </ul>
          </div>
        </div>
        <div class="col">
          <div class="card">
          <div class="card-header">
            <p>Upcoming events <em class="pi pi-calendar"></em></p>
          </div>
          <ul class="list-group list-group-flush">
            <div 
            v-for="(event,index) in calendarEvents"
            :key="index"
            class="d-flex justify-content-between list-group-item">
                <div>
                  {{event.name}}
                </div>
                <div>
                  <li class="list-group-item">{{event.date}} - {{event.time}}</li>
                </div>
            </div>
          </ul>
        </div>
        </div>
      </div>
    </div>
  </div>

</main>

<Footer/>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
</div>
</template>

<script>
import 'primeicons/primeicons.css';
import { client } from '../lib/client'
export default {
  name: 'IndexPage',
  data(){
    return {
      country: "",
      time: "",
      calendarEvents: null,
      prayersTime: null
    }
  },
  compareEvents(a,b){
      const date1 = new Date(a.date);
      const date2 = new Date(b.date);
      if (date1 < date2){
        return -1
      } else if (date1 > date2) {
        return 1
      } else {
        return 0
      }
  },
  async created(){
    let response = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=167b03cbb11d42aba5b17430bb1ee1bd');
    let geoData = await response.json();
    this.country = geoData.country_name;
    this.time = geoData.time_zone.current_time.split('').splice(11,5).join('');
  },
  async fetch(){
    const events = await client.fetch('*[_type == "event"]');
    this.calendarEvents = events.sort(this.compareEvents);
    this.prayersTime = await client.fetch('*[_type == "prayer"]')
  },
}
</script>

<style>

</style>
