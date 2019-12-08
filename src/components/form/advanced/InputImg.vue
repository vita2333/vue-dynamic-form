<template>
    <a-form-item :label="field.label" :extra="field.desc" v-bind="layout">
        <img-upload :type="typeMap[field.type]" :max-pic="field.maxPic" v-decorator="decorator" />
    </a-form-item>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'
import InputMixin from '@/components/form/InpuMixin'
import ImgUpload from './ImgUpload.vue'
import { ImgField } from '@/lib/types/common'
import { FieldTypes } from '@/lib/types/enum'

@Component({
  components: { ImgUpload },
})
export default class InputImg extends mixins(InputMixin) {
    @Prop({
      type: [Object],
      required: true,
    })
    public field!: ImgField

    get typeMap() {
      return {
        [FieldTypes.img]: 'img',
        [FieldTypes.video]: 'video',
      }
    }
}
</script>

<style scoped lang="less">
@import '../input.less';
</style>
