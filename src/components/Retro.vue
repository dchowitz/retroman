<template>
  <div>
    <retro-header :name="name" :description="description" />
    <participants v-if="!selectedParticipant" :list="participants" @add="addParticipant" @select="selectParticipant" />
    <participant v-if="selectedParticipant" :who="selectedParticipant" @back="selectedParticipant = null" @update="updateParticipant" />
  </div>
</template>

<script>
import { getRetro, createOrUpdateParticipant } from '@/api';
import Header from '@/components/Header';
import Participants from '@/components/Participants';
import Participant from '@/components/Participant';

export default {
  name: 'retro',
  props: ['id'],
  components: {
    'retro-header': Header,
    participants: Participants,
    participant: Participant,
  },
  created() {
    this.initData();
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
      selectedParticipant: null,
    };
  },
  methods: {
    initData() {
      getRetro(this.id)
        .then(this.update)
        .then(() => {
          this.selectedParticipant = null;
        })
        // eslint-disable-next-line
        .catch(console.log);
    },
    addParticipant(participantName) {
      createOrUpdateParticipant(this.id, { name: participantName })
        .then(this.update)
        .then(() => {
          this.selectedParticipant = null;
        })
        // eslint-disable-next-line
        .catch(console.log);
    },
    updateParticipant(participant) {
      createOrUpdateParticipant(this.id, participant)
        .then(this.update)
        // eslint-disable-next-line
        .catch(console.log);
    },
    selectParticipant(participant) {
      this.selectedParticipant = participant;
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
</style>
