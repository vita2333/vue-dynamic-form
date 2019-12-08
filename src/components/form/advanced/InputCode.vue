<template>
    <van-field
        :style="cellStyle"
        v-model="currentValue"
        :placeholder="field.placeholder || '请输入' + field.label"
        :required="required"
        :class="{ hidden: field.hidden }"
        :disabled="field.disabled"
        :type="field.type"
        @input="updateFormValue"
        input-align="right"
        clearable
        autosize
    >
        <span slot="label" :class="{ error: hasError }">{{ field.label }}</span>
        <van-icon
            v-if="field.desc"
            slot="right-icon"
            name="question-o"
            @click="
                $dialog.alert({
                    message: field.desc,
                    messageAlign: 'left',
                    confirmButtonText: '我已了解',
                })
            "
        />
        <span slot="button">
            <van-button
                slot="button"
                :disabled="!!verCode.timer"
                size="small"
                type="primary"
                round
                @click="sendVC"
                >{{ verCode.text }}</van-button
            >
        </span>
    </van-field>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'
import InputMixin from '@/components/form/InpuMixin'
import { CodeField } from '@/lib/types/common'

@Component({
  components: {},
})
export default class InputCode extends mixins(InputMixin) {
    @Prop({
      type: [Object],
      required: true,
    })
    public field!: CodeField

    // 验证码
    verCode: any = {
      time: 61,
      text: '发送验证码',
      timer: false,
    }

    /**
     * 发送验证码 需要在field中指定 mobileField(string) sendFunc(promise)
     */
    sendVC() {
      const { field } = this
      this.$emit('validateField', field.mobileField, (mobile: string) => {
        field.sendFunc(mobile).then(() => {
          this.setTime()
          this.verCode.timer = setInterval(this.setTime, 1000)
        })
      })
    }

    setTime() {
      if (this.verCode.time > 0) {
        this.verCode.time -= 1
        this.verCode.text = `${this.verCode.time}s后重试`
      } else {
        clearInterval(this.verCode.timer)
        this.verCode.timer = false
        this.verCode.time = 60
        this.verCode.text = '发送验证码'
      }
    }
}
</script>

<style scoped lang="less">
@import '../input.less';
</style>
