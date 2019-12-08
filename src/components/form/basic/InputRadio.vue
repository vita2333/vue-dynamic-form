<template>
    <a-form-item :label="field.label" :extra="field.desc" v-bind="layout">
        <a-radio-group v-decorator="decorator">
            <a-radio
                v-for="(option, id) in this.field.options"
                :key="id"
                :value="(option.val || id).toString()"
                >{{ option.text || option }}</a-radio
            >
        </a-radio-group>
    </a-form-item>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'
import InputMixin from '@/components/form/InpuMixin'
import { PickerField } from '@/lib/types/common'

/**
 * value为boolean
 */
@Component({
  components: {},
})
export default class InputRadio extends mixins(InputMixin) {
    @Prop({
      type: [Object],
      required: true,
    })
    public field!: PickerField
}
</script>

<style scoped lang="less">
@import '../input.less';
</style>
