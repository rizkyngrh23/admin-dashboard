<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Contact IT Support</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitSupportRequest">
              <v-text-field
                v-model="supportRequest.name"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="supportRequest.email"
                label="Email"
                required
              ></v-text-field>
              <v-textarea
                v-model="supportRequest.message"
                label="Message"
                required
              ></v-textarea>
              <v-btn type="submit" color="primary">Submit</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ContactItSupport',
  data() {
    return {
      supportRequest: {
        name: '',
        email: '',
        message: ''
      }
    };
  },
  methods: {
    submitSupportRequest() {
      console.log('Support request submitted:', this.supportRequest);
      this.supportRequest = {
        name: '',
        email: '',
        message: ''
      };
      this.$toast.success('Support request submitted successfully');
    }
  }
};
</script>

<style scoped>
</style>
