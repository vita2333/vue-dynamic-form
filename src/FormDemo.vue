<template>
    <dynamic-form
      style="padding: 50px;"
        :on-values-change="onValuesChange"
        :on-fields-change="onFieldsChange"
        ref="form"
        :fields="fields"
        :default-form-values="defForm"
    />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DynamicForm from '@/components/form/DynamicForm.vue'
import { AntField, Fields } from '@/lib/types/common'
import { FieldTypes } from '@/lib/types/enum'

    @Component({
      components: {
        DynamicForm,
      },
    })
export default class Test extends Vue {
    defForm: any = {}

    fields: Fields = {
      base: {
        label: '基本输入框',
        type: FieldTypes.text,
        required: true,
        rules: [{ max: 200 }],
        desc: '必填,最多4个字符',
        unit: '单位',
      },
      number: {
        label: '数字',
        type: FieldTypes.number,
        required: true,
        desc: '这是一段说明',
        rules: [{ max: 200 }],
        unit: '单位',
      },
      textarea: {
        label: '文本',
        type: FieldTypes.textarea,
        required: true,
        desc: '这是一段说明',
        rules: [{ max: 200 }],
      },
      password: {
        label: '密码',
        type: FieldTypes.password,
        required: true,
        desc: '这是一段说明',
        rules: [{ max: 200 }],
      },
    }

    mounted() {
      setTimeout(() => {
        this.defForm = {
          base: 'sdfdsfdsfdsfsf',
          number: 12323,
        }
      }, 2000)
    }

    onValuesChange(_vue: any, fields: AntField) {
      (this.fields as any).switch.disabled = true
      console.log('onValuesChange====', fields) // todo
    }

    onFieldsChange(_vue: any, fields: AntField) {
      console.log('onFieldsChange====', fields) // todo
    }
}
</script>
