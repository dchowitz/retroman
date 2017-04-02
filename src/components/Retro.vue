<template>
  <div>
    <h2>{{name}}</h2>
    <p>
      {{description}}<br/>
      <span id="jsCopyLink">{{link}}</span> <button @click="copyLink">copy link</button>
    </p>
    <hr/>
    <participants v-if="!selectedParticipant" :list="participants" @add="addParticipant" @select="selectParticipant"/>
    <participant v-if="selectedParticipant" :who="selectedParticipant" @back="selectedParticipant = null"/>
  </div>
</template>

<script>
import { getRetro, createParticipant } from '@/api';
import Participants from '@/components/Participants';
import Participant from '@/components/Participant';

function toClipboard(containerId) {
  let range;
  const node = document.getElementById(containerId);
  if (document.selection) {
    range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
    document.execCommand('copy');
  } else if (window.getSelection) {
    range = document.createRange();
    range.selectNodeContents(node);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  }
}

export default {
  name: 'retro',
  props: ['id'],
  components: {
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
      link: '',
      name: '',
      description: '',
      participants: [],
      selectedParticipant: null,
    };
  },
  computed: {
    canAddParticipant() {
      return !!this.newParticipant;
    },
  },
  methods: {
    initData() {
      getRetro(this.id)
        .then(this.update)
        // eslint-disable-next-line
        .catch(console.log);
    },
    copyLink() {
      toClipboard('jsCopyLink');
    },
    addParticipant(newParticipant) {
      createParticipant(this.id, newParticipant)
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
      this.link = window.location.toString();
      this.selectedParticipant = null;
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
