<template>
  <section class="w-100">
    <div class="card">
      <TableHeader
        header="Kategoriler"
        @create="create"
        @deleteRange="deleteRange"
        @search="key => (search = key)"
      />
      <div class="card-body p-0">
        <v-data-table
        :no-results-text="noResultText(search)"
          :search="search"
          v-model="selected"
          :headers="headers"
          :items="entities"
          item-key="id"
          show-select
        :footer-props="{ 'items-per-page-text': 'Listelenecek :' }"
        >
          <template v-slot:item.actions="{ item }">
            <ModalBtnDropdown :id="item.id" @edit="edit(item.id)" />
          </template>
        </v-data-table>
      </div>
    </div>
      <!--INSERT MODAL-->
    <v-dialog v-model="dialog" persistent max-width="450px">
      <v-card>
        <ModalDetailHeader header="Yeni Kategori" />
        <v-card-text class="pb-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row class="row-modal d-flex align-items-center">
              <v-col cols="12" md="8" class="row-modal">
                <v-text-field
                  v-model="entity.name"
                  :rules="validation.required"
                  label="Kategori Adı"
                  placeholder="Kategori Adı"
                  dense
                  outlined
                >
                </v-text-field>
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
      :max-width="customModalMaxWidth(loading, false, 450)"
    >
     <Loading v-if="loading"/>
      <v-card v-else>
        <ModalDetailHeader header="Kategori Düzenle" />
        <v-card-text class="pb-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row class="row-modal d-flex align-items-center">
              <v-col cols="12" md="8" class="row-modal">
                <v-text-field
                  v-model="updateEntity.name"
                  :rules="validation.required"
                  label="Marka Adı"
                  placeholder="Marka Adı"
                  dense
                  outlined
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <ModalDetailFooter
          :isUpdate="true"
          @update="Update"
          @cancel="dialogUpdate = false"
        />
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { tableOptions,confirmOption } from "@/helpers/plugin-options";
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
    Loading
  },
  data() {
    return {
      ...tableOptions.defaultData,
      headers: [
        { text: "Kategori Adı", value: "name" },
        tableOptions.actionColumn
      ],
      valid: true,
      loading: false,
      validation: inputValidation,
      dialog: false,
      dialogUpdate: false,
      entity: {
        id: 0,
        name: ""
      },
      updateEntity: {
        id: 0,
        name: ""
      },
    };
  },
  async asyncData(state) {
    await state.store.dispatch("categories/getAll");
  },
  computed: {
    ...mapGetters({
      entities: "categories/getAll"
    })
  },
  methods: {
    clearInput() {
      this.entity = {
        id: 0,
        name: ""
      };
    },
    create() {
      this.clearInput();
      this.dialog = true;
    },
    async Insert() {
      if (!this.$refs.form.validate()) return;
      await this.insertAction("categories", this.entity);
      this.dialog = false;
    },
    async edit(id) {
      this.loading = true;
      this.dialogUpdate = true;
      this.updateEntity=await this.$CategoryService.Get(id);
      this.loading=false;
    },
    async Update() {
      if (!this.$refs.form.validate()) return;
      let oldEntity=JSON.parse(JSON.stringify(this.entities.filter(x=>x.id==this.updateEntity.id)));
      await this.updateAction("categories", {oldEntity:oldEntity[0],entity:this.updateEntity});
      this.dialogUpdate = false;
    },
    async deleteRange() {
      await this.deleteRangeAction("categories", this.selected.select("id"));
    }
  }
};
</script>

<style></style>
