<template>
    <a-form-item v-show="!field.hidden" :label="field.label" :extra="field.desc" >
        <component
            :is="inputMap[field.type]"
            v-decorator="decorator"
            :placeholder="placeholder"
            :disabled="field.disabled"
            allowClear
        >
            <span v-if="field.unit" slot="addonAfter">
                {{ field.unit }}
            </span>
        </component>
        <span v-if="field.type==='number'&&field.unit" style="margin-left: 10px;">{{ field.unit }}</span>
    </a-form-item>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Vue } from 'vue-property-decorator'
import { Input, InputNumber } from 'ant-design-vue'
import InputMixin from '@/components/form/InpuMixin'
import { FieldTypes } from '@/lib/types/enum'

Vue.use(Input)
  .use(InputNumber)

    @Component({
      components: {},
    })
export default class InputText extends mixins(InputMixin) {
  get inputMap() {
    return {
      [FieldTypes.text]: 'AInput',
      [FieldTypes.number]: 'AInputNumber',
      [FieldTypes.textarea]: 'ATextarea',
      [FieldTypes.password]: 'AInputPassword',
    }
  }

  get placeholder() {
    if (this.field.placeholder) {
      return this.field.placeholder
    }
    if (this.field.rules) {
      if (this.required) {
        return `请填写${this.field.label}`
      }
    }
    return '可不填'
  }
}
</script>

<style scoped lang="less">
@import '../input.less';
</style>
