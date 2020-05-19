<template>
  <v-container fluid>
    <v-row justify="center" style="height: 97vh;">
      <v-col cols="3">
        <v-img
          class="mx-auto"
          style="width: 100%; height: 100%; border-radius: 1%;"
          src="../assets/1.jpg"
        ></v-img>
      </v-col>
      <v-col cols="9">
        <v-card
          class="px-8 py-4"
          elevation="10"
          height="750"
          style="overflow: auto;"
          v-chat-scroll
        >
          <div v-for="message in messages" :key="message.id" class="py-2">
            <p class="teal--text d-inline-block my-0" style="font-size: 1.5vw;">
              {{ message.name }}
            </p>
            <p
              class="grey--text text--darken-4 d-inline-block ml-2 my-0"
              style="font-size: 1.5vw;"
            >
              {{ message.content }}
            </p>
            <p class="grey--text my-0" style="font-size: 1vw;">
              {{ message.timestamp }}
            </p>
          </div>

          <NewMessage :name="name"></NewMessage>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NewMessage from '../components/NewMessage'
import db from '@/firebase'
import moment from 'moment'

export default {
  created () {
    const ref = db.collection('messages').orderBy('timestamp')
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const doc = change.doc
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp).format('lll')
          })
        }
      })
    })
  },

  name: 'Chat',
  props: ['name'],
  components: { NewMessage },

  data () {
    return {
      messages: []
    }
  }
}
</script>
<style></style>
