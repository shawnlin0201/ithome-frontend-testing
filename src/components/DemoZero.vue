<script setup>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

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
    alert('請填寫必填欄位')
    return
  }
  alert('表單送出')
}
</script>

<template>
  <h1>Demo 0 - 表單情境</h1>
  <div class="form-group">
    <label class="mr-2" for="title">*活動名稱</label>
    <input
      data-test="titleInput"
      id="title"
      v-model="form.title"
      :class="{ invalid: v$.title.$errors.length > 0 }"
    />
    <small class="error" v-if="v$.title.$dirty && v$.title.$error">請填寫活動名稱</small>
  </div>
  <div class="form-group">
    <label class="mr-2" for="date">*活動日期</label>
    <input
      data-test="dateInput"
      type="date"
      id="date"
      v-model="form.date"
      :class="{ invalid: v$.date.$errors.length > 0 }"
    />
    <small class="error" v-if="v$.date.$dirty && v$.date.$error">請選擇活動日期</small>
  </div>
  <div class="form-group">
    <label class="mr-2" for="note">備註</label>
    <input data-test="noteInput" id="note" v-model="form.note" />
  </div>
  <button data-test="submitButton" @click="submit">送出</button>
</template>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
.invalid {
  border-color: red;
}
.error {
  color: red;
  font-size: 0.875rem;
}
</style>
