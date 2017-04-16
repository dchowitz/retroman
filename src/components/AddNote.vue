<template>
  <div>
    <div v-if="!category">
      add something
      <a @click="selectCategory('positive')">positive</a>,
      <a @click="selectCategory('negative')">negative</a> or an
      <a @click="selectCategory('idea')">idea</a>
    </div>
    <note-editor v-else
      :note="noteTemplate"
      @cancel="category = null"
      @save="category = null" />
  </div>
</template>

<script>
import NoteEditor from '@/components/NoteEditor';

export default {
  name: 'add-note',
  components: {
    'note-editor': NoteEditor,
  },
  data() {
    return {
      category: null,
    };
  },
  computed: {
    noteTemplate() {
      return {
        title: null,
        category: this.category,
        description: null,
      };
    },
  },
  methods: {
    selectCategory(category) {
      this.category = category;
    },
  },
};
</script>

<style scoped>
</style>
