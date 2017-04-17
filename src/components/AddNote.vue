<template>
  <div>
    add something
    <a @click="selectCategory('positive')">positive</a>,
    <a @click="selectCategory('negative')">negative</a> or an
    <a @click="selectCategory('idea')">idea</a>
  </div>
</template>

<script>
export default {
  name: 'add-note',
  methods: {
    selectCategory(category) {
      this.$emit('categorySelected', category);
    },
  },
};
</script>

<style scoped>
</style>
