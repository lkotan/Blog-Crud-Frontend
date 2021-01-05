<template>
  <vue-editor
    v-model="content"
    @input="$emit('input', content)"
    class="w-100"
  :editor-toolbar="comment"
  ></vue-editor>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      content: "",
      comment: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" }
        ],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ color: [] }, { background: [] }],
        ["link", "image", "video"]
      ]
    };
  },
  props: {
    value: {
      required: false,
      default: ""
    }
  },
  created() {
    this.content = this.value;
  }
};
</script>
<style>
.ql-toolbar.ql-snow {
  background: #ebecf0 !important;
  border-color: #f8f9fa !important;
}

div#quill-container {
  background: #f8f9fa !important;
  border-color: #f8f9fa !important;
}
</style>
