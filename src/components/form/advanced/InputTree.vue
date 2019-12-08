<template>
    <div>
        <a-form-item :extra="field.desc" :label="field.label" v-bind="layout">
            <a-tree-select
                :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                :treeData="field.treeData"
                placeholder="Please select"
                treeDefaultExpandAll
                v-decorator="decorator"
            >
            </a-tree-select>
        </a-form-item>
    </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'
import InputMixin from '@/components/form/InpuMixin'
import { TreeField } from '@/lib/types/common'
import { Rules } from '@/lib/types/enum'

@Component({
  components: {},
})
export default class InputTree extends mixins(InputMixin) {
    @Prop({
      type: [Object],
      required: true,
    })
    public field!: TreeField

    get placeholder() {
      if (this.field.placeholder) {
        return this.field.placeholder
      }
      if (this.field.rules) {
        if (this.field.rules.includes(Rules.required)) {
          return `请选择${this.field.label}`
        }
      }
      return '可不选'
    }
}
</script>

<style lang="less" scoped>
@import '../input.less';
</style>
