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
        type: FieldTypes.text,
        rules: [Rules.required],
        options: { rules: [{ required: true }, { max: 4 }] },
        unit: 'sdfdsf',
        desc: 'sdfsdfdsf',
      },
    }

    mounted() {
      setTimeout(() => {
        this.defForm = {
          text: 'sdfdsfdsfdsfsf',
          picker: '1',
          search_id: '338',
          search: {
            name: '哈哈哈哈',
          },
          tel: 'sdfsdfdf',
          timer: '13:20',
          datetime: '2015-02-12 12:00',
          myTel: '123123123',
          myName: '哈哈',
          checkers: ['1', 'dsf'],
          img: 'https://img.mei\jinw.com/1571627404078.png',
          switch: 'open',
          editor:
                    '<p>我是圣诞快</p><p class="ql-align-center">乐副经理开始对方就凉快圣诞节疯狂劳动竞赛看咯防静电搜开了房</p><p class="ql-align-center"><img src="https://img.meijinw.com/1571655332847.png"></p>',
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
