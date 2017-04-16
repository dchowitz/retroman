<template>
  <div>
    <input type="text"
      :placeholder="placeholder"
      v-model="name"
      @keyup.enter="add"
      @keyup.esc="clear"
      @focus="placeholder = null"
      @blur="placeholder = initialPlaceholder" />
  </div>
</template>

<script>
import bus from '@/bus';

const initialPlaceholder = 'new name';

export default {
  name: 'add-participant',
  data() {
    return {
      name: null,
      initialPlaceholder,
      placeholder: initialPlaceholder,
    };
  },
  methods: {
    add() {
      if (this.name) {
        this.$emit('added', this.name);
        bus.$emit('participant-added', this.name);
        this.clear();
      }
    },
    clear() {
      this.name = null;
    },
  },
};
</script>

<style scoped>
input {
  text-align: center;
  width: 100px;
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
