<template>
  <div>
    <retro-header
      :name="name"
      :description="description" />

    <participant-list class="margin-top"
      :names="participants.map(p => p.name)"
      :selected="selectedParticipantName"
      @selected="onParticipantSelected" />

    <note-editor class="margin-top"
      v-if="showNoteEditor"
      :note="noteToEdit"
      @save="onNoteSave"
      @cancel="showNoteEditor = false" />

    <div v-else>
      <add-note class="margin-top"
        v-if="selectedParticipantName"
        @categorySelected="onNoteCategorySelected" />
      <note-list class="margin-top"
        :notes="selectedParticipant.notes" />
    </div>

    <div class="debug">
      {{JSON.stringify(selectedParticipant)}}
    </div>
  </div>
</template>

<script>
import { getRetro, createOrUpdateParticipant } from '@/api';
import Header from '@/components/Header';
import ParticipantList from '@/components/ParticipantList';
import AddParticipant from '@/components/AddParticipant';
import NoteList from '@/components/NoteList';
import AddNote from '@/components/AddNote';
import NoteEditor from '@/components/NoteEditor';
import bus from '@/bus';

export default {
  name: 'retro',
  props: ['id'],
  components: {
    'retro-header': Header,
    'participant-list': ParticipantList,
    'add-participant': AddParticipant,
    'note-list': NoteList,
    'add-note': AddNote,
    'note-editor': NoteEditor,
  },
  created() {
    this.initData();
    bus.$on('participant-added', this.onParticipantAdded);
    bus.$on('note-selected', this.onNoteSelected);
    bus.$on('note-deleted', this.onNoteDeleted);
  },
  watch: {
    $route() {
      this.initData();
    },
  },
  data() {
    return {
      name: '',
      description: '',
      participants: [],
      selectedParticipantName: null,
      noteToEdit: null,
      showNoteEditor: false,
    };
  },
  computed: {
    selectedParticipant() {
      return this.selectedParticipantName
        ? this.participants.find(p => p.name === this.selectedParticipantName)
        : { name: null, notes: [] };
    },
  },
  methods: {
    initData() {
      getRetro(this.id)
        .then(this.update)
        .then(() => {
          this.selectedParticipantName = null;
        })
        // eslint-disable-next-line
        .catch(console.log);
    },

    onParticipantSelected(name) {
      this.selectedParticipantName = name;
      this.showNoteEditor = false;
    },

    onParticipantAdded(name) {
      // TODO: prevent adding participants when request is ongoing
      createOrUpdateParticipant(this.id, { name })
        .then(this.update)
        .then(() => {
          this.selectedParticipantName = name;
          this.showNoteEditor = false;
        })
        // eslint-disable-next-line
        .catch(console.log);
    },

    onNoteCategorySelected(category) {
      this.noteToEdit = { title: null, category, description: null };
      this.showNoteEditor = true;
    },

    onNoteSelected(note) {
      this.noteToEdit = note;
      this.showNoteEditor = true;
    },

    // TODO: dedicated api endpoint for note update/creation?
    // TODO: better overall state handling - this fiddling here is gruesome - vuex?!
    onNoteSave(editedNote) {
      const note = this.selectedParticipant.notes.find(n => n.id === editedNote.id);
      if (note) {
        Object.assign(note, editedNote);
      } else {
        this.selectedParticipant.notes.push(editedNote);
      }

      // TODO: prevent last update from overwriting changes in another client?
      createOrUpdateParticipant(this.id, this.selectedParticipant)
        .then(this.update)
        .then(() => {
          this.showNoteEditor = false;
        })
        // eslint-disable-next-line
        .catch(console.log);
    },

    onNoteDeleted(deletedNote) {
      const notes = this.selectedParticipant.notes;
      const position = notes.indexOf(deletedNote);
      if (position === -1) {
        return;
      }

      notes.splice(position, 1);

      createOrUpdateParticipant(this.id, this.selectedParticipant)
        .then(this.update)
        // eslint-disable-next-line
        .catch(console.log);
    },

    update(retro) {
      this.name = retro.name;
      this.description = retro.description;
      this.participants = retro.participants;
    },
  },
};
</script>

<style scoped>

.margin-top {
  margin-top: 20px;
}

</style>
