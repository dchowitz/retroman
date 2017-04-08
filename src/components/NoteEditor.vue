<template>
  <div class="noteEditor">
    <div>
      <input v-model="title" placeholder="note title"/>
    </div>
    <div>
      <textarea v-model="description" placeholder="optional description" rows="10"/>
    </div>
    <div class="button-line">
      <button @click="cancel">Cancel</button>
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
    cancel() {
      this.$emit('cancel');
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

input {
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid lightgray;
}

textarea {
  width: 100%;
  resize: none;
  margin-bottom: 10px;
  border: 1px solid lightgray;
}

button {
  font-size: 11px;
  margin-left: 10px;
}

.button-line {
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
}
</style>
