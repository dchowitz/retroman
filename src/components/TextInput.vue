<template>
  <input type="text"
    :placeholder="placeholder"
    :style="{ width: width || '100px' }"
    v-model="text"
    @keyup.enter="submit"
    @keyup.esc="esc"
    @focus="focus"
    @blur="blur" />
</template>

<script>
export default {
  name: 'text-input',
  props: ['placeholder', 'width'],
  data() {
    return {
      text: null,
    };
  },
  methods: {
    submit() {
      this.$emit('onSubmit', this.text);
    },
    focus() {
      this.$emit('onFocus');
    },
    blur() {
      this.$emit('onBlur');
    },
    esc() {
      this.text = null;
      this.$emit('onEsc');
    },
  },
};
</script>

<style scoped>
input {
  text-align: left;
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  border: none;
  border-bottom: solid #42b983 2px;
}

input:focus {
  text-align: left;
  outline: none;
  border: none;
  border-bottom: solid #2c3e50 2px;
}
</style>
