<template>
  <b-navbar
    id="template-header"
    class="default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row"
    toggleable="lg"
  >
    <div
      class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center pt-2"
    >
      <router-link class="navbar-brand brand-logo" to="/">
        <v-avatar
          size="64"
        >
          <v-img src="/ben.jpg" alt="lKotan" />
        </v-avatar>
      </router-link>
      <router-link class="navbar-brand brand-logo-mini" to="/">
         <v-avatar
          size="32"
        >
          <v-img src="/ben.jpg" alt="lKotan" />
        </v-avatar>
      </router-link>
    </div>
    <div class="navbar-menu-wrapper d-flex align-items-center ml-auto ml-lg-0">
      <button
        class="navbar-toggler navbar-toggler align-self-center d-lg-block"
        type="button"
        @click="toggleSidebar()"
      >
        <span class="ti-layout-grid2"></span>
      </button>
      <button
        class="navbar-toggler navbar-toggler-right align-self-center"
        type="button"
        @click="toggleMobileSidebar()"
      >
        <span class="mdi mdi-menu"></span>
      </button>
    </div>
  </b-navbar>
</template>

<script>
export default {
  name: "app-header",
  components: {},
  data() {
    return {};
  },
  methods: {
    toggleSidebar() {
      document.querySelector("body").classList.toggle("sidebar-icon-only");
    },
    toggleMobileSidebar: () => {
      document.querySelector("#sidebar").classList.toggle("active");
    },
    togglesettingsPannel: () => {
      document.querySelector("#right-sidebar").classList.toggle("open");
    }
  }
};
</script>

<style></style>
