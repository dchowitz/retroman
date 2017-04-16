<template>
  <div>
    <retro-header
      :name="name"
      :description="description" />

    <participant-list class="margin-top"
      :names="participants.map(p => p.name)"
      :selected="selectedParticipantName"
      @selected="onParticipantSelected" />

    <add-note class="margin-top"
      v-if="selectedParticipantName" />

    <note-list class="margin-top"
      :notes="selectedParticipant.notes" />

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
  },
  created() {
    this.initData();
    bus.$on('participant-added', this.onParticipantAdded);
    bus.$on('note-added', this.onNoteAdded);
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
    },

    onParticipantAdded(name) {
      // TODO: prevent adding participants when request is ongoing
      createOrUpdateParticipant(this.id, { name })
        .then(this.update)
        .then(() => {
          this.selectedParticipantName = name;
        })
        // eslint-disable-next-line
        .catch(console.log);
    },

    onNoteAdded(note) {
      this.selectedParticipant.notes.push(note);

      // TODO: prevent last update from overwriting changes in another client?
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
