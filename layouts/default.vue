<template>
  <v-app>
    <section class="main-view">
      <div class="container-scroller">
         <Header />
        <div class="container-fluid page-body-wrapper">
          
          <Navbar />
          <div class="main-panel">
            <div
              class="content-wrapper d-flex flex-wrap w-100 align-items-strech"
            >
              <nuxt />
            </div>
           
            <!-- <FooterArea /> -->
          </div>
         
        </div>
       
        <client-only>
          <VueConfirm />
        </client-only>
      </div>
    </section>
  </v-app>
</template>

<script>
import Navbar from "@/components/partials/navbar";
import Header from "@/components/partials/header";

export default {
  components: {
    Navbar,
    Header,
    VueConfirm: () => import("../components/shared/vue-confirm")
  },
   head() {
    return {
      bodyAttrs: {
        class: "sidebar-dark",
      },
    };
  },
};
</script>

<style></style>
