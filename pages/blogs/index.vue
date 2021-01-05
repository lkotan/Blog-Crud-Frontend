<template>
  <section class="w-100">
    <div class="row">
      <div class="col-12">
        <div class="d-flex align-items-center mb-2">
          <div>
            <h4 style="margin-left:18px;">Bloglar</h4>
          </div>
          <div class="ml-auto d-flex flex-row mr-3">
            <!--Search-->
            <v-text-field
              :loading="searchLoding"
              :value="keyword"
              class="mt-0 pt-0 mr-5"
              label="Ara..."
              hide-details="auto"
              @input="searchBlogs($event)"
            ></v-text-field>
            <!--New Blog-->
            <div class="mt-1">
              <button
                class="btn font-weight-medium btn-inverse-success d-flex"
                type="button"
                @click="create()"
              >
                <i class="ti-plus"></i>
                <p class="mb-0">Yeni</p>
              </button>
            </div>
          </div>
        </div>

        <!--Filter-->
        <div class="col-md-6 d-flex ml-auto pb-0">
          <div class="row">
            <div class="col-md-6">
              <v-select
                @change="changeCategory($event)"
                :items="categories"
                item-value="id"
                item-text="description"
                label="Kategoriler"
                placeholder="Kategoriler"
                dense
                outlined
                :value="categoryId"
              />
            </div>
            <div class="col-md-6">
              <v-select
              @change="changeAuthor($event)"
                class="ml-5"
                :items="authors"
                item-value="id"
                item-text="description"
                label="Yazarlar"
                placeholder="Yazarlar"
                dense
                outlined
                :value="authorId"
              />
            </div>
          </div>
        </div>


        <div class="px-4">
          <v-row>
            <v-col cols="12" md="6" v-for="item in entities" :key="item.id">
              <div class="pa-3 card-background">
                <v-card class="shadow-none">
                  <v-card-text>
                    <div class="d-flex flex-column">
                      <div class="d-flex w-100 align-items-center mb-1">
                        <span class="text-black text-small mr-1">
                          {{ formatDate(item.createdAt, "DD.MM.YYYY") }}
                        </span>
                        <span class="text-black" style="font-size: 12px"
                          >{{ getAuthor(item.authorId) }}
                        </span>
                        <v-chip
                          color="#673AB7"
                          small
                          class="ml-auto text-white"
                        >
                          {{ getCategory(item.categoryId) }}
                        </v-chip>
                      </div>
                      <p class="text-black m-0">
                        {{ item.title }}
                      </p>
                      <div class="d-flex ml-auto">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              v-bind="attrs"
                              v-on="on"
                              x-small
                              text
                              fab
                              @click="edit(item.id)"
                            >
                              <v-icon small>ti-pencil</v-icon>
                            </v-btn>
                          </template>
                          <span>
                            Düzenle
                          </span>
                        </v-tooltip>

                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              v-on="on"
                              v-bind="attrs"
                              x-small
                              text
                              fab
                              @click="remove(item.id)"
                            >
                              <v-icon small>ti-trash</v-icon>
                            </v-btn>
                          </template>
                          <span>
                            Sil
                          </span>
                        </v-tooltip>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>

    <!--INSERT MODAL-->
    <v-dialog v-model="dialog" persistent max-width="760px">
      <v-card>
        <ModalDetailHeader header="Yeni Blog" />
        <v-card-text class="pb-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row class="row-modal">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="entity.title"
                  :rules="validation.required"
                  label="Başlık"
                  placeholder="Başlık"
                  dense
                  outlined
                  :counter="100"
                  :maxlength="100"
                  :color="titleColor(entity.title)"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  v-model="entity.categoryId"
                  :items="categories.filter(x=>x.id!=-1)"
                  item-value="id"
                  item-text="description"
                  label="Kategori"
                  placeholder="Kategori"
                  dense
                  outlined
                  :rules="validation.required"
                />
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  v-model="entity.authorId"
                  :items="authors.filter(x=>x.id!=-1)"
                  item-value="id"
                  item-text="description"
                  label="Yazar"
                  placeholder="Yazar"
                  dense
                  outlined
                  :rules="validation.required"
                />
              </v-col>
            </v-row>
            <v-row class="row-modal">
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="entity.description"
                  :rules="validation.required"
                  label="Açıklama"
                  placeholder="Açıklama"
                  dense
                  outlined
                  :counter="100"
                  :maxlength="100"
                  :color="titleColor(entity.description)"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row class="mb-2">
              <v-col cols="12">
                <p style="font-size:24px;">
                  İçerik
                  <span style="color:red; font-size:14px;">* Zorunlu</span>
                </p>
                <HtmlEditor v-model="entity.content" />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <ModalDetailFooter @insert="Insert" @cancel="dialog = false" />
      </v-card>
    </v-dialog>

    <!--UPDATE MODAL-->
    <v-dialog
      v-model="dialogUpdate"
      persistent
      :fullscreen="fullScreenComputed(loading)"
      :max-width="customModalMaxWidth(loading, false, 760)"
    >
     <Loading v-if="loading"/>
      <v-card v-else>
        <v-toolbar flat color="white">
          <ModalDetailHeader :mlAuto="true" header="Blog Düzenle" />
          <div class="ml-auto">
            <v-tooltip
              top
              color="blue-grey darken-4"
              dark
              content-class="px-2 py-1 caption"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  @click="dialogExpand"
                  small
                  v-bind="attrs"
                  v-on="on"
                  color="black"
                >
                  <v-icon v-if="!fullScreen">mdi-window-restore</v-icon>
                  <v-icon v-else>mdi-window-minimize</v-icon>
                </v-btn>
              </template>
              <span>{{ fullScreen ? "Ekranı Küçült" : "Tam Ekran" }}</span>
            </v-tooltip>

            <v-tooltip
              top
              color="blue-grey darken-4"
              dark
              content-class="px-2 py-1 caption"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  @click="closeDialogUpdate()"
                  small
                  v-bind="attrs"
                  v-on="on"
                  color="black"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
              <span>Kapat</span>
            </v-tooltip>
          </div>
        </v-toolbar>

        <v-card-text class="pb-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row class="row-modal">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="updateEntity.title"
                  :rules="validation.required"
                  label="Başlık"
                  placeholder="Başlık"
                  dense
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  v-model="updateEntity.categoryId"
                  :items="categories.filter(x=>x.id!=-1)"
                  item-value="id"
                  item-text="description"
                  label="Kategori"
                  placeholder="Kategori"
                  dense
                  outlined
                  :rules="validation.required"
                />
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  v-model="updateEntity.authorId"
                  :items="authors.filter(x=>x.id!=-1)"
                  item-value="id"
                  item-text="description"
                  label="Yazar"
                  placeholder="Yazar"
                  dense
                  outlined
                  :rules="validation.required"
                />
              </v-col>
            </v-row>
            <v-row class="row-modal">
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="updateEntity.description"
                  :rules="validation.required"
                  label="Açıklama"
                  placeholder="Açıklama"
                  dense
                  outlined
                  :counter="100"
                  :maxlength="100"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row class="mb-2">
              <v-col cols="12" v-if="htmlContent">
                <p style="font-size:24px;">
                  İçerik
                  <span style="color:red; font-size:14px;">* Zorunlu</span>
                </p>
                <HtmlEditor v-model="updateEntity.content" />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <ModalDetailFooter
          :isUpdate="true"
          @update="Update"
          @cancel="closeDialogUpdate()"
        />
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { tableOptions, confirmOption } from "@/helpers/plugin-options";
import { inputValidation } from "../../helpers/vuetify";
import TableHeader from "@/components/shared/table/header";
import ModalBtnDropdown from "@/components/shared/modal-dropdown/btn-dropdown";
import ModalDetailHeader from "@/components/shared/modal-detail/header";
import ModalDetailFooter from "@/components/shared/modal-detail/footer";
import Loading from "@/components/shared/modal-loading";

export default {
  components: {
    TableHeader,
    ModalBtnDropdown,
    ModalDetailHeader,
    ModalDetailFooter,
    Loading,
    HtmlEditor: () => import("@/components/shared/html-editor")
  },
  async asyncData(state) {
    const responses = await Promise.all([
      state.store.dispatch("blogs/getAll"),
      state.store.dispatch("categories/getSelectList"),
      state.store.dispatch("authors/getSelectList")
    ]);
  },
  computed: {
    ...mapGetters({
      entities: "blogs/getAll",
      categories: "categories/getSelectList",
      authors: "authors/getSelectList",
      authorId: "blogs/getAuthorId",
      categoryId: "blogs/getCategoryId",
      keyword: "blogs/getKeyword"
    }),
    getAuthor: function(authorId) {
      return authorId => {
        return this.authors.filter(x => x.id == authorId)[0].description;
      };
    },
    getCategory: function(categoryId) {
      return categoryId => {
        return this.categories.filter(x => x.id == categoryId)[0].description;
      };
    },
    fullScreenComputed: function(loading) {
      return loading => {
        if (!loading) {
          if (this.fullScreen) return true;
        }
      };
    }
  },
  data() {
    return {
      fullScreen: false,
      valid: true,
      loading: false,
      validation: inputValidation,
      dialog: false,
      dialogUpdate: false,
      entity: {
        id: 0,
        title: "",
        description: "",
        content: "",
        categoryId: 0,
        authorId: 0
      },
      updateEntity: {
        id: 0,
        title: "",
        description: "",
        content: "",
        categoryId: 0,
        authorId: 0
      },
      htmlContent: false,
      searchLoding: false
    };
  },
  methods: {
    closeDialogUpdate() {
      this.dialogUpdate = false;
      this.loading = false;
      this.clearInput();
    },
    clearInput() {
      this.entity = {
        id: 0,
        title: "",
        description: "",
        content: "",
        categoryId: 0,
        authorId: 0
      };
      this.htmlContent = false;
    },
    dialogExpand() {
      this.fullScreen = !this.fullScreen;
    },
    async searchBlogs(value) {
      this.$store.commit("blogs/addKeyword", value);
      var self = this;
      this.delay(async function() {
        self.searchLoding = true;
        await self.$store.dispatch("blogs/getAll");
        self.searchLoding = false;
      }, 1000);
    },
    async changeCategory(value){
      this.$store.commit("blogs/addCategoryId",value);
      await this.$store.dispatch("blogs/getAll");
    },
    async changeAuthor(value){
      this.$store.commit("blogs/addAuthorId",value);
      await this.$store.dispatch("blogs/getAll");
    },
    create() {
      this.clearInput();
      this.dialog = true;
    },
    async Insert() {
      if (!this.$refs.form.validate()) return;
      await this.insertAction("blogs", this.entity);
      this.dialog = false;
    },
    async edit(id) {
      this.loading = true;
      this.dialogUpdate=true;
      this.htmlContent = true;
      this.updateEntity = await this.$BlogService.Get(id);
      this.loading = false;
    },
    async Update() {
      if (!this.$refs.form.validate()) return;
      let oldEntity = JSON.parse(
        JSON.stringify(this.entities.filter(x => x.id == this.updateEntity.id))
      );
      await this.updateAction("blogs", {
        oldEntity: oldEntity[0],
        entity: this.updateEntity
      });
      this.dialogUpdate = false;
    },
    async remove(id) {
      await this.deleteAction("blogs", id);
    }
  }
};
</script>

<style></style>
