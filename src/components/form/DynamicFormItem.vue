<template>
            <component
              v-if="component"
              v-decorator="decorator"
              :is="component"
            ></component>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator'
// eslint-disable-next-line import/extensions,import/no-unresolved
import { Field, WrappedFormUtils } from 'ant-design-vue/types/form/form'
import { Col, message, Row } from 'ant-design-vue'
import { FieldTypes } from '@/lib/types/enum'
// eslint-disable-next-line import/extensions,import/no-unresolved

/**
 * 组件必须有:prop:value 和 emit('change')
 *
 * 参考自定义表单控件
 自定义或第三方的表单控件，也可以与 Form 组件一起使用。只要该组件遵循以下的约定：

 提供受控属性 value 或其它与 valuePropName-参数) 的值同名的属性。
 提供 onChange 事件或 trigger-参数) 的值同名的事件。
 不能是函数式组件。
 */
@Component({
  components: {

  },
})
export default class DynamicFormItem extends Vue {
    @Prop({
      type: Object,
      required: true,
    })
    readonly field!: Field

    @Prop({
      required: true,
    })
    readonly fieldKey!: string

    get decorator() {
      return [this.fieldKey, { ...this.field.options }]
    }

    component:any|null=null

    created() {
      let component
      if (this.field.type === FieldTypes.custom) {
        if (!this.field.component) {
          throw new Error(`${this.fieldKey} has no component`)
        }
        component = this.field.component()
      } else {
        component = 'AInput'
      }
      Promise.resolve(component).then((c) => {
        console.log('打印c====', c); // todo
        this.component = c
      })
    }
}
</script>

<style scoped ></style>
