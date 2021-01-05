<template>
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li class="nav-item" v-on:click="collapseAll">
          <router-link class="nav-link" to="/">
            <i class="ti-pie-chart menu-icon"></i>
            <span class="menu-title">Pano</span>
          </router-link>
        </li>
        <li class="nav-item" v-for="item in sideBarData" :key="item.name">
          <span class="nav-link" v-b-toggle="'ui-' + item.name">
            <i
              class="menu-icon"
              :class="[item.icon, item.icon.indexOf('mdi') > -1 ? 'mdi' : 'ti']"
            ></i>
            <span class="menu-title">{{ item.name }}</span>
            <i class="menu-arrow"></i>
          </span>
          <b-collapse accordion="sidebar-accordion" :id="'ui-' + item.name">
            <ul class="nav flex-column sub-menu">
              <li
                class="nav-item"
              >
                <nuxt-link class="nav-link" :to="`/${item.url}`">
              {{ item.name }}
            </nuxt-link>
              </li>
            </ul>
          </b-collapse>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
export default {
  data() {
    return {
      collapses: [{ show: false }, { show: false }, { show: false }],
      sideBarData: [
        { icon: "ti-world", name: "Kategoriler", url: "categories" },
        { icon: "mdi-account", name: "Yazarlar", url: "authors" },
        { icon: "mdi mdi-blogger", name: "Bloglar", url: "blogs" }
      ]
    };
  },
  methods: {
    collapseAll() {
      var exp_elm = document.getElementsByClassName("show");
      if (exp_elm.length > 0) {
        var elm_id = exp_elm[0].id;
        this.$root.$emit("bv::toggle::collapse", elm_id);
      }
    }
  },
  mounted() {
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach(function(el) {
      el.addEventListener("mouseover", function() {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function() {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }
};
</script>

<style></style>
