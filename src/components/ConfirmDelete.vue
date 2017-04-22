<template>
  <span>
    <button @click="onDelete" v-if="showDelete">delete</button>
    <button @click="onConfirm" v-else>yes, I'm sure</button>
  </span>
</template>

<script>
export default {
  name: 'confirm-delete',
  data() {
    return {
      showDelete: true,
      timeoutId: null,
    };
  },
  methods: {
    onDelete() {
      this.showDelete = false;
      this.timeoutId = setTimeout(() => {
        this.showDelete = true;
      }, 2000);
    },
    onConfirm() {
      this.$emit('deleted');
    },
  },
  destroyed() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  },
};
</script>

<style scoped>
</style>
