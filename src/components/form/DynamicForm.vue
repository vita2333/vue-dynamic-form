<template>
        <a-form v-if="form" id="dynamic-form" :form="form" @submit="handleSubmit">
            <component
              v-for="(field, key) in fields"
              :field="field"
              :key="key"
              :is="componentMap[field.type]"
              :fieldDefaultValue="defaultFormValues[key]"
              :field-key="key"
            ></component>
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
// eslint-disable-next-line import/extensions,import/no-unresolved
import { Button, Form } from 'ant-design-vue'
import { AntField, Fields } from '@/lib/types/common'
import { messages } from '@/components/form/messages-zh'
import { FieldTypes } from '@/lib/types/enum'
import 'ant-design-vue/dist/antd.css';
import { WrappedFormUtils } from 'ant-design-vue/types/form/form'

Vue.use(Form).use(Button)

    @Component({
      components: {
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

    form: Vue |WrappedFormUtils| null = null

    get componentMap() {
      return {
        [FieldTypes.text]: () => import('./basic/InputText.vue'),
        [FieldTypes.number]: () => import('./basic/InputText.vue'),
        [FieldTypes.textarea]: () => import('./basic/InputText.vue'),
        [FieldTypes.password]: () => import('./basic/InputText.vue'),
        [FieldTypes.picker]: 'InputPicker',
        [FieldTypes.pickers]: 'InputPicker',
        [FieldTypes.pickerTags]: 'InputPicker',
        [FieldTypes.search]: 'InputPicker',
        // [FieldTypes.date]: 'InputTimer',
        // [FieldTypes.time]: 'InputTimer',
        // [FieldTypes.datetime]: 'InputTimer',
        // [FieldTypes.year]: 'InputTimer',
        [FieldTypes.radio]: 'InputRadio',
        [FieldTypes.checkers]: 'InputCheckers',
        [FieldTypes.switch]: 'InputSwitch',
        [FieldTypes.img]: 'InputImg',
        [FieldTypes.video]: 'InputImg',
        // [FieldTypes.code]: 'InputCode',
        // [FieldTypes.contact]: 'InputContact',
        // [FieldTypes.address]: 'InputAddress',
        [FieldTypes.editor]: 'InputEditor',
        [FieldTypes.tree]: 'InputTree',
      }
    }

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
