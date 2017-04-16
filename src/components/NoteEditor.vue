<template>
  <div class="noteEditor">
    <div>
      <input ref="title" v-model="title" placeholder="title"/>
    </div>
    <div>
      <textarea v-model="description" placeholder="optional description" rows="10"/>
    </div>
    <div class="button-line">
      <button @click="save">OK</button>
      <button @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
import bus from '@/bus';

export default {
  name: 'note-editor',
  props: ['note'],
  created() {
    setTimeout(() => {
      this.$refs.title.focus();
    }, 0);
  },
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
      const note = {
        title: this.title,
        category: this.category,
        description: this.description,
      };
      this.$emit('save', note);
      bus.$emit('note-added', note);
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
