<template>
    <a-form-item :label="field.label" :extra="field.desc" v-bind="layout">
<!--        <quill-editor class="editor" v-decorator="decorator"></quill-editor>-->
    </a-form-item>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import InputMixin from '@/components/form/InpuMixin'
import QuillEditor from '@/components/Editor/QuillEditor.vue'

@Component({
  components: {
      // QuillEditor
  },
})
export default class InputEditor extends mixins(InputMixin) {}
</script>

<style scoped lang="less">
@import '../input.less';
</style>
