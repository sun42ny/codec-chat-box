<template>
  <v-container class="welcome">
    <v-row justify="center">
      <v-col cols="10">
        <v-btn
          color="#35495e"
          class="float-right"
          style="font-family: 'VT323', monospace; font-size: 2vw;"
          x-large
          @click.prevent="adminAcess"
          text
          >&lt;ADMIN ACCESS&#47;&gt;</v-btn
        >
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10">
        <v-card class="px-6 py-12 text-center" elevation="20">
          <v-row>
            <v-col cols="12">
              <div
                style="font-family: 'Milonga', cursive; font-size: 5vw; color: #42b883;"
              >
                &lt; Codec : Chat-Box &#47;&gt;
              </div>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="6">
              <v-img
                class="mx-auto"
                height="200"
                width="200"
                style="border-radius: 50%;"
                src="../assets/welcome.jpg"
              ></v-img>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="6">
              <v-form @submit.prevent="submitForm">
                <v-text-field
                  clearable
                  style="font-family: 'PT Mono', monospace;"
                  label="What should i call you ..."
                  counter="20"
                  color="#42b883"
                  v-model="name"
                  prepend-inner-icon="mdi-pound"
                ></v-text-field>
                <p
                  style="font-family: 'Bree Serif', serif; font-size: 1.5vw;"
                  class="error--text"
                  v-if="feedback"
                >
                  {{ this.feedback }}
                </p>
              </v-form>
              <v-btn
                color="#42b883"
                class="white--text text-capitalize"
                large
                @click.prevent="submitForm"
                >ChatRoom;</v-btn
              >
              <v-btn
                v-if="deleteChatButton"
                color="error"
                class="white--text ml-3"
                large
                @click.prevent="deleteChat"
                >Clean Chat Box</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import db from '@/firebase'

export default {
  name: 'Home',

  data () {
    return {
      name: null,
      feedback: null,
      deleteChatButton: false
    }
  },

  methods: {
    submitForm () {
      if (this.name) {
        //alert('The Website is under production. Will be back Soon')
        return this.$router.push({ name: 'Chat', params: { name: this.name } })
      } else {
        this.feedback = 'You must Enter a name to continue ... '
      }
    },

    adminAcess () {
      const ans = prompt('Admint Rights !!')
      if (ans === 'Bunny_Codec') {
        this.deleteChatButton = true
      } else {
        alert('Admin Acess Denied !!')
      }
    },

    deleteChat () {
      db.collection('messages')
        .get()
        .then(snapshot => {
          snapshot.forEach(value => {
            db.collection('messages')
              .doc(value.id)
              .delete()
            console.log(
              value.id + ' of Name ' + value.data().name + ' is Deleted'
            )
          })
        })
      alert('Consider it Done!')
    }
  }
}
</script>
