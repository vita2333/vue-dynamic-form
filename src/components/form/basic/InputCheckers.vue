<template>
    <a-form-item :label="field.label" :extra="field.desc" v-bind="layout">
        <a-checkbox-group v-decorator="decorator" :options="options"> </a-checkbox-group>
    </a-form-item>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'
import InputMixin from '@/components/form/InpuMixin'
import { KeyValue, Option, PickerField } from '@/lib/types/common'

/**
 * value为boolean
 */
@Component({
  components: {},
})
export default class InputCheckers extends mixins(InputMixin) {
    @Prop({
      type: [Object],
      required: true,
    })
    public field!: PickerField

    get options() {
      const ret = []
      if (this.field.options) {
        for (const i in this.field.options) {
          const option: Option | KeyValue = (this.field.options as any)[i]
          ret.push({ label: option.text || option, value: (option.val || i).toString() })
        }
      }
      return ret
    }
}
</script>

<style scoped lang="less">
@import '../input.less';
</style>
