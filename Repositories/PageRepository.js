import {
  confirmOption
} from "../helpers/plugin-options";
import moment from "moment";
import Vue from 'vue'
import VueMask from 'v-mask';
Vue.use(VueMask);
Vue.mixin({
    data() {
      return {
        delay: (function () {
          var timer = 0;
          return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
          };
        })()
      }
    },
  methods: {
    async insertAction(store, entity) {
      const res = await this.$store.dispatch(`${store}/insert`, entity);
      if (!res.success) {
        this.$confirm(confirmOption.error(res.message));
        return;
      }
      return res;
    },
     async updateAction(store, entity) {
       const res = await this.$store.dispatch(`${store}/update`, entity);
       if (!res.success) {
         this.$confirm(confirmOption.error(res.message));
         return;
       }
       return res;
     },
    async deleteAction(store, id) {
      this.$confirm({
        title: "Lütfen Dikkat",
        message: `Veri kalıcı bir biçimde silinmek üzere. Emin misiniz?`,
        button: {
          no: "Hayır",
          yes: "Evet",
        },
        callback: async (confirm) => {
          if (confirm) {
            const res = await this.$store.dispatch(`${store}/delete`, id);
            if (!res.success) {
              this.$confirm(confirmOption.error(res.message));
              return;
            }
            this.$confirm(confirmOption.info("Kayıt başarıyla silindi."));
            return res;
          }
        },
      });
    },
    async deleteRangeAction(store, list, parentId = null) {
      if (list.length == 0) {
        this.$confirm(confirmOption.error("Silinecek kayıtları seçmediniz."));
        return;
      }
      this.$confirm({
        title: "Lütfen Dikkat",
        message: `Veriler kalıcı bir biçimde silinmek üzere. Emin misiniz?`,
        button: {
          no: "Hayır",
          yes: "Evet",
        },
        callback: async (confirm) => {
          if (confirm) {
            let models = this.$store.getters[`${store}/getAll`].select("id");
            let idList = [];
            list.forEach(x => {
              if (models.indexOf(x) >= 0) idList.push(x);
            });
            let res = await this.$store.dispatch(`${store}/deleteRange`, idList);
            let messages = "";
            res.forEach(r => {
              if (!r.success) messages += messages == "" ? r.data + " " + r.message : '\n' + r.data + " " + r.message;
            });

            if (messages != "") this.$confirm(confirmOption.error(messages));
            else this.$confirm(confirmOption.info('Kayıtlar başarıyla silindi'));
            return res;
          }
        },
      });

    },
    fromNow(date) {
      return moment(date).locale("tr").fromNow();
    },
    formatDate(date, pattern = null) {
      return moment(date).locale("tr").format(pattern == null ? "DD.MM.YYYY HH:mm:ss" : pattern);
    },
     customModalMaxWidth(loading, customScreen, insertModalWidth = "600px") {
       if (loading) return "344px";
       else if (customScreen) return "768px";
       return insertModalWidth;
     },
  }
})
