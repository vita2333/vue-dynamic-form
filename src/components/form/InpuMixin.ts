import { Component, Prop, Vue } from 'vue-property-decorator'
import { FieldDecoratorOptions, ValidationRule } from 'ant-design-vue/types/form/form'
import { FormItem } from 'ant-design-vue/types/form/form-item'
import { Rules } from '@/lib/types/enum'
import { BaseField } from '@/lib/types/common'

@Component({
  components: {},
})
export default class InputMixin extends Vue {
    @Prop({
      type: [Object],
      required: true,
    })
    public field!: BaseField

    @Prop({
      type: [String],
      required: true,
    })
    public fieldKey!: string

    @Prop({
      // PropSync: prop.sync是父子组件双向绑定的简写
      type: [String, Number, Boolean, Array, Date, Object],
    })
    public fieldDefaultValue?: any

    @Prop({
      type: Object,
      default() {
        return {}
      },
    })
    public cellStyle?: any

    @Prop({
      type: Boolean,
    })
    public hasError?: boolean

    @Prop({
      type: Object,
    })
    public layout!: FormItem

    protected get required() {
      return !this.field.disabled && this.field.rules && this.field.rules.includes(Rules.required)
    }

    get initialValue() {
      return this.fieldDefaultValue
    }

    get valuePropName() {
      // 指的是v-model的value
      return 'value'
    }

    // 格式化提交数据
    protected normalize(value: any, _prevValue: any, _allValues: any) {
      return value
    }

    get decoratorOptions(): FieldDecoratorOptions {
      const rules: ValidationRule[] = [
        {
          required: this.required || false,
          message: `请输入${this.field.label}`,
        },
      ]
      return {
        initialValue: this.initialValue,
        rules,
        valuePropName: this.valuePropName,
        normalize: this.normalize,
      }
    }

    protected get decorator() {
      return [this.fieldKey, this.decoratorOptions]
    }
}
