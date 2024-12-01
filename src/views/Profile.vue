<template>
  <v-container fluid class="profile-container">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="profile-card">
          <v-card-title class="headline text-center">Profile</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div v-if="!isEditing" class="profile-view">
              <v-row>
                <v-col cols="12" md="4" class="text-center profile-avatar">
                  <v-avatar size="120" class="mx-auto my-4">
                    <img :src="user.profilePicture || defaultProfilePicture" alt="Profile Picture">
                  </v-avatar>
                  <v-btn color="primary" class="mt-4 edit-btn" @click="isEditing = true">Edit Profile</v-btn>
                </v-col>
                <v-col cols="12" md="8">
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="info-title"><strong>Name:</strong> {{ user.name }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="info-title"><strong>Email:</strong> {{ user.email }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="info-title"><strong>Phone:</strong> {{ user.phone }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="info-title"><strong>Address:</strong> {{ user.address }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="info-title"><strong>Date of Birth:</strong> {{ user.dob }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="info-title"><strong>Gender:</strong> {{ user.gender }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="info-title"><strong>Position:</strong> {{ user.position }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="info-title"><strong>Department:</strong> {{ user.department }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="info-title"><strong>Employee ID:</strong> {{ user.employeeId }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </div>
            <v-form v-else class="profile-edit">
              <v-row>
                <v-col cols="12" md="4" class="text-center">
                  <v-avatar size="120" class="mx-auto my-4">
                    <img :src="profilePicturePreview || user.profilePicture || defaultProfilePicture" alt="Profile Picture">
                  </v-avatar>
                  <v-file-input
                    ref="fileInput"
                    v-model="profilePictureFile"
                    label="Upload Profile Picture"
                    accept="image/*"
                    prepend-icon="mdi-camera"
                    show-size
                    hide-input
                    @change="previewProfilePicture"
                  ></v-file-input>
                  <v-btn text class="change-pfp-link" @click.prevent="triggerFileInput">Change Profile Picture</v-btn>
                </v-col>
                <v-col cols="12" md="8">
                  <v-text-field v-model="user.name" label="Name"></v-text-field>
                  <v-text-field v-model="user.email" label="Email" disabled></v-text-field>
                  <v-text-field v-model="user.phone" label="Phone"></v-text-field>
                  <v-text-field v-model="user.address" label="Address"></v-text-field>
                  <v-menu
                    ref="dobMenu"
                    v-model="dobMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="user.dob"
                        label="Date of Birth"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="user.dob" @input="dobMenu = false"></v-date-picker>
                  </v-menu>
                  <v-select v-model="user.gender" :items="['Male', 'Female', 'Other']" label="Gender"></v-select>
                  <v-text-field v-model="user.position" label="Position"></v-text-field>
                  <v-text-field v-model="user.department" label="Department"></v-text-field>
                  <v-text-field v-model="user.employeeId" label="Employee ID"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="text-center">
                  <v-btn color="primary" class="mt-4 update-btn" @click="updateProfile">Update Profile</v-btn>
                  <v-btn class="mt-4 cancel-btn" @click="isEditing = false">Cancel</v-btn>
                </v-col>
              </v-row>
            </v-form>
            <v-alert v-if="successMessage" type="success" class="mt-4">{{ successMessage }}</v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import defaultProfilePicture from '@/assets/default_pfp.jpeg';

export default {
  data() {
    return {
      user: {
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        profilePicture: '',
        dob: '',
        gender: '',
        position: '',
        department: '',
        employeeId: ''
      },
      profilePictureFile: null,
      profilePicturePreview: null,
      defaultProfilePicture,
      successMessage: '',
      isEditing: false,
      dobMenu: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.getUser;
    },
    profilePicture() {
      return this.$store.getters.getProfilePicture || this.defaultProfilePicture;
    }
  },
  methods: {
    async updateProfile() {
      try {
        if (this.profilePictureFile) {
          const formData = new FormData();
          formData.append('profilePicture', this.profilePictureFile);
          try {
            const response = await axios.post('/api/uploadProfilePicture', formData);
            this.user.profilePicture = response.data.profilePictureUrl;
            this.$store.commit('setProfilePicture', this.user.profilePicture);
          } catch (error) {
            console.error('Profile picture upload failed:', error);
            if (error.response) {
              console.error('Response data:', error.response.data);
              console.error('Response status:', error.response.status);
              console.error('Response headers:', error.response.headers);
            } else if (error.request) {
              console.error('Request data:', error.request);
            } else {
              console.error('Error message:', error.message);
            }
            this.user.profilePicture = URL.createObjectURL(this.profilePictureFile);
            this.$store.commit('setProfilePicture', this.user.profilePicture);
          }
        }
        await this.$store.dispatch('updateProfile', this.user);
        this.successMessage = 'Profile successfully updated!';
        this.isEditing = false;
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      } catch (error) {
        console.error('Profile update failed:', error);
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.$el.querySelector('input[type="file"]').click();
    },
    previewProfilePicture() {
      if (this.profilePictureFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profilePicturePreview = e.target.result;
          this.user.profilePicture = this.profilePicturePreview;
          localStorage.setItem(`userProfile_${this.user.id}`, JSON.stringify(this.user));
          this.$store.commit('setProfilePicture', this.user.profilePicture);
        };
        reader.readAsDataURL(this.profilePictureFile);
      }
    },
    fillProfileWithRegisteredInfo() {
      if (this.currentUser) {
        this.user = { ...this.currentUser };
      }
    }
  },
  mounted() {
    const savedUserProfile = JSON.parse(localStorage.getItem(`userProfile_${this.currentUser.id}`));
    if (savedUserProfile) {
      this.user = savedUserProfile;
      this.$store.commit('setProfilePicture', savedUserProfile.profilePicture);
    } else {
      this.fillProfileWithRegisteredInfo();
    }
  },
  watch: {
    currentUser(newUser) {
      if (newUser) {
        this.user = { ...newUser };
        localStorage.setItem(`userProfile_${this.user.id}`, JSON.stringify(this.user));
      }
    }
  }
};
</script>

<style scoped>
.profile-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  min-height: 100vh; 
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.my-4 {
  margin-top: 16px;
  margin-bottom: 16px;
}
.mt-4 {
  margin-top: 16px;
}
.profile-card {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  border-radius: 12px;
  padding: 20px;
}
.profile-card .v-card-title {
  font-size: 24px;
  font-weight: bold;
  color: #344675;
}
.info-title {
  font-size: 1.2em; 
  color: #424242;
}
.v-list-item-content {
  font-size: 1em; 
  color: #424242;
}
.edit-btn, .update-btn, .cancel-btn {
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}
.edit-btn:hover, .update-btn:hover {
  background-color: #1976d2;
  transform: translateY(-2px);
}
.cancel-btn:hover {
  background-color: #e53935;
  transform: translateY(-2px);
}
.change-pfp-link {
  display: block;
  margin-top: 8px;
  color: #1976d2;
  cursor: pointer;
  text-decoration: underline;
}
.change-pfp-link:hover {
  color: #1565c0;
}
.profile-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
