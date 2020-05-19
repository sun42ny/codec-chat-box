<template>
  <v-form @submit.prevent="addMessage" class="py-2">
    <v-row justify="center">
      <v-col cols="10">
        <v-text-field
          label="Type here ..."
          color="teal"
          v-model="newMessage"
          style="width:100%; font-size: 1.5vw;"
        ></v-text-field>
        <p v-if="feedback" class="text-center error--text">{{ feedback }}</p>
      </v-col>
      <v-col cols="1">
        <v-btn class="teal" fab @click.prevent="addMessage">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import db from '../firebase'

export default {
  name: 'NewMessage',
  props: ['name'],

  data () {
    return {
      newMessage: null,
      feedback: null
    }
  },

  methods: {
    addMessage () {
      if (this.newMessage) {
        db.collection('messages')
          .add({
            content: this.newMessage,
            name: this.name,
            timestamp: Date.now()
          })
          .catch(err => {
            console.log(err)
          })
        this.newMessage = null
        this.feedback = null
      } else {
        this.feedback = 'You need to enter a message to Send ... '
      }
    }
  }
}
</script>

<style>
</style>
