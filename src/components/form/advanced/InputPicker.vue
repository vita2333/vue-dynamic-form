<template>
    <div>
        <a-form-item :label="field.label" :extra="field.desc" v-bind="layout">
            <a-select
                allowClear
                :style="cellStyle"
                v-decorator="decorator"
                :mode="modeMap[field.type]"
                :placeholder="placeholder"
                :class="{ hidden: field.hidden }"
                :disabled="field.disabled"
                :show-search="true"
                :filter-option="filterOptionByTitle"
                @search="handleSearch"
                :notFoundContent="fetching ? undefined : null"
            >
                <a-spin v-if="fetching" slot="notFoundContent" size="small" />
                <span v-if="field.unit" slot="suffixIcon">
                    {{ field.unit }}
                </span>
                <a-select-option
                    v-for="(option, id) in this.field.options"
                    :key="id"
                    :value="(option.val || id).toString()"
                    :title="option.text || option"
                    >{{ option.text || option }}</a-select-option
                >
            </a-select>
        </a-form-item>
    </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Prop, Watch } from 'vue-property-decorator'
import _ from 'lodash'
import Vue, { ComponentOptions, VNode } from 'vue'
import { FieldTypes, Rules } from '@/lib/types/enum'
import { PickerField, SearchField } from '@/lib/types/common'
import InputMixin from '@/components/form/InpuMixin'

@Component({
  components: {},
})
export default class InputPicker extends mixins(InputMixin) {
    @Prop({
      type: [Object],
      required: true,
    })
    public field!: PickerField | SearchField

    public fetching = false

    // 节流
    handleSearch = _.throttle((value) => {
      if (!value || !(this.field as SearchField).searchFunc) {
        return
      }
      this.fetch(value)
    }, 1000)

    get modeMap() {
      return {
        [FieldTypes.picker]: 'default',
        [FieldTypes.pickers]: 'multiple',
        [FieldTypes.pickerTags]: 'tags',
        [FieldTypes.search]: 'default',
      }
    }

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

    get hasInput() {
      return ([
        FieldTypes.pickers,
        FieldTypes.pickerTags,
        FieldTypes.search,
      ] as string[]).includes(this.field.type)
    }

    get isSearch() {
      return this.field.type === FieldTypes.search
    }

    // 初始值生成一个选项
    @Watch('fieldDefaultValue', { immediate: true })
    change1(now: any) {
      const searchField: SearchField = this.field as any
      if (now && searchField.init) {
        this.fetching = true
        if (typeof searchField.init === 'string') {
          this.field.options = [{ text: searchField.init, val: now }]
          this.fetching = false
        } else {
          Promise.resolve(searchField.init(now) as Promise<any> | Function).then(
            (res: any) => {
              if (typeof res === 'object') {
                this.field.options = res
              } else {
                this.field.options = [{ text: res, val: now }]
              }
              this.fetching = false
            },
          )
        }
      }
    }

    fetch(value: string) {
      if ((this.field as SearchField).searchFunc) {
        this.fetching = true;
        (this.field as SearchField).searchFunc(value).then((res: any) => {
          this.field.options = res
          this.fetching = false
        })
      }
    }

    filterOptionByTitle(inputValue: string, vNode: VNode) {
      const { title } = (vNode.componentOptions as ComponentOptions<Vue>).propsData as any
      if (title) {
        return title.includes(inputValue)
      }
      return false
    }
}
</script>

<style scoped lang="less">
@import '../input.less';
</style>
