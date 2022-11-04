<template>
    <footer class="text-muted pt-5">
  <div class="container">
    <p class="float-end mb-1">
      <a href="#"><em 
      class="pi pi-angle-up"
      style="color: var(--bs-green) !important"
      ></em></a>
    </p>
    <div style="width: 50vh">
        <form 
        @submit="onNewsletterSubmit()">
          <div class="d-flex justify-content-between my-2">
            <input type="email" class="form-control me-2" placeholder="Your email" v-model="email">
            <input type="submit" class="btn btn-sm btn-success mx-2" value="Subscribe!">
          </div>
        </form>
      <div class="form-text">
        Subscribe to our Newsletter!
      </div>
    </div>
    <p class="my-4">2022 &copy; Touba Sherbrooke All rights reserved</p>
  </div>
    </footer>
</template>

<script>
import {client} from '../lib/client'
export default {
    name: 'pageFooter',
    data(){
      return {
        email: null
      }
    },
    methods: {
      async onNewsletterSubmit(){
        const obj = {
          _type: 'newsletter-email',
          email: this.email
        };
        await client.create(obj);
      }
    }
}
</script>
