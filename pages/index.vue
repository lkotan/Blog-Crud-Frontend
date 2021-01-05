<template>
  <section class="w-100">
    <v-row>
      <v-col cols="12" md="4">
        <div class="blog p-4 dash-header">
          <p>
            Bloglar
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="$router.push('/blogs')"
                  v-on="on"
                  v-bind="attrs"
                  icon
                >
                  <v-icon color="#43A047">mdi mdi-arrow-right</v-icon>
                </v-btn>
              </template>
              <span>Bloglara Git</span>
            </v-tooltip>
          </p>
          <div class="d-flex flex-row">
            <p>{{ res.blogCount }}</p>
            <p class="ml-auto">
              <v-icon>mdi mdi-blogger</v-icon>
            </p>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="category p-4 dash-header">
          <p>
            Kategoriler
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="$router.push('/categories')"
                  v-on="on"
                  v-bind="attrs"
                  icon
                >
                  <v-icon color="#43A047">mdi mdi-arrow-right</v-icon>
                </v-btn>
              </template>
              <span>Kategorilere Git</span>
            </v-tooltip>
          </p>
          <div class="d-flex flex-row">
            <p>{{ res.categoryCount }}</p>
            <p class="ml-auto">
              <v-icon>ti-world</v-icon>
            </p>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <div class="author p-4 dash-header">
          <p>
            Yazarlar
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="$router.push('/authors')"
                  v-on="on"
                  v-bind="attrs"
                  icon
                >
                  <v-icon color="#43A047">mdi mdi-arrow-right</v-icon>
                </v-btn>
              </template>
              <span>Yazarlar Git</span>
            </v-tooltip>
          </p>
          <div class="d-flex flex-row">
            <p>{{ res.authorCount }}</p>
            <p class="ml-auto">
              <v-icon>mdi-account</v-icon>
            </p>
          </div>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  async asyncData(state) {
    const res = await state.$DashService.GetDash();
    return {
      res
    };
  },
  data() {
    return {};
  }
};
</script>

<style>
.dash-header {
  background: #dad9d9;
}
.dash-header:hover {
  transform: scale(1.07);
  background: #ffffff;
  cursor: pointer;
}
.dash-header p {
  font-size: 20px !important;
}
</style>
