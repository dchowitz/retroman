<template>
  <div class="noteEditor">
    <div class="fullWidth">
      <input v-model="title" placeholder="note title"/>
    </div>
    <div class="fullWidth">
      <textarea v-model="description" placeholder="optional description" rows="10"/>
    </div>
    <div>
      <button @click="save">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'noteEditor',
  props: ['note'],
  data() {
    return {
      title: this.note.title,
      category: this.note.category,
      description: this.note.description,
    };
  },
  computed: {
    descriptionLines() {
      return this.description.split('\n');
    },
  },
  methods: {
    save() {
      this.$emit('save', {
        title: this.title,
        category: this.category,
        description: this.description,
      });
    },
  },
};
</script>

<style scoped>
.noteEditor {
  width: 300px;
  margin: 10px;
  text-align: left;
  margin: auto;
}

.fullWidth {
  width: 100%;
}

.edit input {
  width: 100%;
  margin-bottom: 10px;
}

.edit textarea {
  width: 100%;
  resize: none;
  margin-bottom: 10px;
}

button {
  font-size: 11px;
}
</style>
