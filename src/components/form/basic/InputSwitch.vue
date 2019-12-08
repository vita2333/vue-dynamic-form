<template>
    <a-form-item :label="field.label" :extra="field.desc" v-bind="layout">
        <a-switch
            :disabled="field.disabled"
            v-show="!field.hidden"
            v-model="booleanValue"
            v-decorator="decorator"
        />
    </a-form-item>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Prop, Watch } from 'vue-property-decorator'
import InputMixin from '@/components/form/InpuMixin'
import { SwitchField } from '@/lib/types/common'

const defaultSwitchValue = {
  yes: 1,
  no: 0,
}
@Component({
  components: {},
})
export default class InputSwitch extends mixins(InputMixin) {
    @Prop({
      type: [Object],
      required: true,
    })
    public field!: SwitchField

    public booleanValue = false

    // 初始值 text 转 bool
    @Watch('fieldDefaultValue', { immediate: true })
    change1(now: any) {
      this.booleanValue = now && (now == this.field.activeValue || now == defaultSwitchValue.yes)
    }

    get initialValue() {
      return this.booleanValue
    }

    // bool 转 text
    protected normalize(value: any) {
      return value && value != this.field.inactiveValue && value != defaultSwitchValue.no
        ? this.field.activeValue || defaultSwitchValue.yes
        : this.field.inactiveValue || defaultSwitchValue.no
    }
}
</script>

<style scoped lang="less">
@import '../input.less';
</style>
