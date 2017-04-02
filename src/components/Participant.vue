<template>
  <div>
    <h2><a @click="back">participants</a> / {{who.name}}</h2>
  </div>
</template>

<script>
export default {
  name: 'participant',
  props: ['who'],
  data() {
    return {
    };
  },
  methods: {
    back() {
      this.$emit('back');
    },
  },
};
</script>

<style scoped>
p {
  margin: 10px;
}

h2 {
  margin: 10px;
}

button {
  font-size: 11px;
}
</style>
