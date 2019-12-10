<template>
    <dynamic-form
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
import { FieldTypes, Rules } from '@/lib/types/enum'

@Component({
  components: {
    DynamicForm,
  },
})
export default class Test extends Vue {
    defForm: any = {}

    fields: Fields = {
      text: {
        label: '文字',
        type: FieldTypes.custom,
        rules: [Rules.required],
        options: { rules: [{ required: true }, { max: 4 }] },
        unit: 'sdfdsf',
        desc: 'sdfsdfdsf',
        component: () => 'AInput',
      },
    }

    mounted() {
      setTimeout(() => {
        this.defForm = {
          text: 'sdfdsfdsfdsfsf',
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
