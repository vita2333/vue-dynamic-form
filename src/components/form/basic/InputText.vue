<template>
    <a-form-item v-show="!field.hidden" :label="field.label" :extra="field.desc" v-bind="layout">
        <component
            :is="inputMap[field.type]"
            :style="cellStyle"
            v-decorator="decorator"
            :placeholder="placeholder"
            :disabled="field.disabled"
            allowClear
        >
            <span v-if="field.unit" slot="addonAfter">
                {{ field.unit }}
            </span>
        </component>
        <span v-if="field.type === number && field.unit" class="ml10">{{ field.unit }}</span>
    </a-form-item>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import InputMixin from '@/components/form/InpuMixin'
import { FieldTypes, Rules } from '@/lib/types/enum'

@Component({
  components: {},
})
export default class InputText extends mixins(InputMixin) {
  get number() {
    return FieldTypes.number
  }

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
      if (this.field.rules.includes(Rules.required)) {
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
