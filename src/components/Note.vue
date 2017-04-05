<template>
  <div class="note">
    <div v-if="isReadOnly">
      <div class="note-title" @click="isReadOnly = false">
        <strong>{{title}}</strong> ({{category}})
      </div>
      <div v-for="line in descriptionLines">{{line}}</div>
    </div>
    <div v-if="!isReadOnly">
      <div>
        <input v-model="title" placeholder="note title"/>
      </div>
      <div>
        <textarea v-model="description" placeholder="optional description"/>
      </div>
      <div>
        <button @click="save">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'note',
  props: ['param'],
  data() {
    return {
      isReadOnly: true,
      title: this.param.title,
      category: this.param.category,
      description: this.param.description,
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
      this.isReadOnly = true;
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

.note-title {
  cursor: pointer;
}

.note-title:hover {
  color: white;
  background-color: gray;
}

.note-title:hover::after {
  content: 'click to edit';
  color: white;
  font-size: 80%;
  margin: 20px;
}

button {
  font-size: 11px;
}
</style>
