<script setup>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { useToast } from 'primevue/usetoast'
import { required } from '@vuelidate/validators'

const toast = useToast()
const form = reactive({
  title: null,
  date: null,
  note: null
})
const rules = {
  title: { required, $lazy: true },
  date: { required, $lazy: true }
}

const v$ = useVuelidate(rules, form)

const submit = () => {
  v$.value.$touch()
  if (v$.value.$error) {
    toast.add({ severity: 'error', summary: '提示', detail: '請填寫必填欄位', life: 3000 })
    return
  }
  toast.add({ severity: 'success', summary: '成功', detail: '表單送出', life: 3000 })
}
</script>

<template>
  <h1>Demo 1 - 表單情境</h1>
  <div class="w-100 flex flex-column gap-2 mb-3">
    <label for="title">*活動名稱</label>
    <InputText
      data-test="titleInput"
      id="title"
      v-model="form.title"
      :invalid="Boolean(v$.title.$errors.length)"
    />
    <small class="text-red-500" v-if="v$.title.$dirty && v$.title.$error">請填寫活動名稱</small>
    <label for="date">*活動日期</label>
    <Calendar
      data-test="dateInput"
      id="date"
      v-model="form.date"
      dateFormat="yy/m/d"
      :invalid="v$.title.$dirty && Boolean(v$.date.$errors.length)"
    />
    <small class="text-red-500" v-if="v$.date.$dirty && v$.date.$error">請選擇活動日期</small>
    <label for="note">備註</label>
    <InputText data-test="noteInput" id="note" v-model="form.note" />
  </div>
  <Button data-test="submitButton" @click="submit">送出</Button>
</template>

<style lang="scss" scoped></style>
