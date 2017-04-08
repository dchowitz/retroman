<template>
  <div>
    <h2><a @click="back">participants</a> / {{who.name}}</h2>
    <div v-if="!selectedNote" class="notes-container">
      <note-list-item v-for="n in who.notes" :param="n" @select="selectedNote = n" />
    </div>
    <noteEditor v-if="selectedNote"
      :note="selectedNote"
      @save="save"
      @cancel="selectedNote = null" />
  </div>
</template>

<script>
import NoteListItem from '@/components/NoteListItem';
import NoteEditor from '@/components/NoteEditor';

export default {
  name: 'participant',
  props: ['who'],
  components: {
    noteListItem: NoteListItem,
    noteEditor: NoteEditor,
  },
  data() {
    return {
      selectedNote: null,
    };
  },
  methods: {
    back() {
      this.$emit('back');
    },
    save({ title, category, description }) {
      this.selectedNote.title = title;
      this.selectedNote.category = category;
      this.selectedNote.description = description;
      this.selectedNote = null;
      this.$emit('update', this.who);
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

.notes-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
