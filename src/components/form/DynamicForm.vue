<template>
    <div>
        <a-form v-if="form" id="dynamic-form" :form="form" @submit="handleSubmit">
          <a-form-item :label="field.label" :extra="field.desc"  :key="key" v-for="(field, key) in fields">
            <dynamic-form-item
            :field="field"
            :key="key"
            :field-key="key"
            ></dynamic-form-item>
          </a-form-item>
            <slot name="footer"></slot>
            <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
                <slot name="button">
                    <a-button :loading="btnLoading" type="primary" html-type="submit">
                        提交
                    </a-button>
                    <a-button class="ml15" type="default" html-type="button" @click="reset">
                        重置
                    </a-button>
                </slot>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator'
// eslint-disable-next-line import/extensions,import/no-unresolved
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'
import { Col, message, Row } from 'ant-design-vue'
// eslint-disable-next-line import/extensions,import/no-unresolved
import { FormItem } from 'ant-design-vue/types/form/form-item'
import DynamicFormItem from '@/components/form/DynamicFormItem.vue';
import { AntField, BaseField, Fields } from '@/lib/types/common'
import { FieldTypes } from '@/lib/types/enum'
import InputPicker from './advanced/InputPicker.vue'
import InputSwitch from './basic/InputSwitch.vue'
import InputText from './basic/InputText.vue'
import InputEditor from './advanced/InputEditor.vue'
import InputRadio from '@/components/form/basic/InputRadio.vue'
import InputTree from '@/components/form/advanced/InputTree.vue'
import InputCheckers from '@/components/form/basic/InputCheckers.vue'
import { messages } from '@/components/form/messages-zh'

    interface InlineLayout {
    formRow: Row
    formCol: Col
}
interface DefaultLayout {
    formItem: FormItem
}
export type DynamicFormLayout = InlineLayout | DefaultLayout
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

    DynamicFormItem,
  },
})
export default class DynamicForm extends Vue {
    @Prop({
      type: Object,
      required: true,
    })
    readonly fields!: Fields

    @Prop({
      type: Object,

      default() {
        return {}
      },
    })
    readonly defaultFormValues!: any

    @Prop({
      type: Boolean,
    })
    readonly btnLoading!: boolean

    form: Vue | WrappedFormUtils | null = null

    created() {
      this.form = this.$form.createForm(this, {
        onFieldsChange: (props: any, fields: AntField) => {
          console.log('打印fields====', fields); // todo
        },
        onValuesChange: (props: any, values: {value:string}) => {
          console.log('打印fields====', values); // todo
        },
        // mapPropsToFields: () => Object.keys(this.defaultFormValues).map(key => ({
        //   [key]: this.$form.createFormField({ value: this.defaultFormValues[key] }),
        // })),
        validateMessages: messages,
      })
    }

    handleSubmit(e: Event) {
      e.preventDefault();
      (this.form as WrappedFormUtils).validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$emit('submit', values)
        }
      })
    }

    reset() {
      (this.form as WrappedFormUtils).resetFields()
    }

    getForm() {
      return this.form as WrappedFormUtils
    }
}
</script>

<style scoped ></style>
