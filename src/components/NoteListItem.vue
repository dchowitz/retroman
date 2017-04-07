<template>
  <div class="note">
    <div>
      <a @click="select"><strong>{{title}}</strong> ({{category}})</a>
    </div>
    <div v-for="line in descriptionLines">{{line}}</div>
    <div v-if="hasMore">...</div>
  </div>
</template>

<script>
export default {
  name: 'noteListItem',
  props: ['param'],
  data() {
    return {
      title: this.param.title,
      category: this.param.category,
      description: this.param.description,
    };
  },
  computed: {
    descriptionLines() {
      return this.description.split('\n').slice(0, 2);
    },
    hasMore() {
      return this.description.split('\n').length > 2;
    },
  },
  methods: {
    select() {
      this.$emit('select');
    },
  },
};
</script>

<style scoped>

.note {
  width: 300px;
  margin: 10px;
  text-align: left;
}

</style>
