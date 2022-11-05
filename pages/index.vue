<template>
<div>
<Navbar/>
<main>

  <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-bold" style="color: var(--bs-green);">Welcome!</h1>
        <h2 class="lead text-muted">{{country}}, {{time}}</h2>
        <div>
          <nuxt-link to="/kaamil" class="btn btn-success" id="kaamil">Kaamil <em class="pi pi-user"></em></nuxt-link>
          <a href="/khassidas" class="btn" style="border-color: var(--bs-green);" id="khassida">Khassidas <em class="pi pi-book"></em></a>
        </div>
      </div>
    </div>
  </section>

  <div class="album py-5 bg-light">
    <div class="container">

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-3">
        <div class="col">
          <div class="card">
            <div 
            class="bg-success bg-opacity-75">
              <strong><p class="text-center p-2" style="color: var(--bs-white);">PRAYERS TIME <em class="pi pi-stopwatch"></em></p></strong>
            </div>
            <ul class="list-group list-group-flush">
              <div 
              v-for="(prayer,index) in prayersTime"
              :key="index"
              class="d-flex justify-content-between list-group-item bg-success bg-opacity-50">
              <div class="d-flex align-items-center">
                <strong><p style="color: var(--bs-green);">{{prayer.name}}</p></strong>
              </div>
              <div class="event-time" style="border-radius: %;">
                <li class="list-group-item text-success text-center">{{prayer.time}}</li>
              </div>
            </div>
            </ul>
          </div>
        </div>
        <div class="col">
          <div class="card">
          <div 
          class="bg-success bg-opacity-75">
            <strong><p class="text-center p-2" style="color: var(--bs-white);">UPCOMING EVENTS <em class="pi pi-calendar"></em></p></strong>
          </div>
          <ul class="list-group list-group-flush">
            <div 
            v-for="(event,index) in calendarEvents"
            :key="index"
            class="d-flex justify-content-between list-group-item bg-success bg-opacity-50">
                <div class="d-flex align-items-center">
                  <strong><p style="color: var(--bs-green);">{{event.name}}</p></strong>
                </div>
                <div class="event-time" style="border-radius: %;">
                  <li class="list-group-item text-success text-center">{{event.date}}</li>
                  <li class="list-group-item text-success text-center">{{event.time}}</li>
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
  fetchOnServer: false
}
</script>

<style>

a#kaamil:hover {
  color: var(--bs-green);
  background-color: var(--bs-white);
}

a#khassida {
  color: var(--bs-green);
}

a#khassida:hover {
  color: var(--bs-white);
  background-color: var(--bs-green);
}

</style>
