<template>
  <div class="row flex flex-center">
    <div class="q-pa-md" style="width: 1350px">
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>
          <q-icon name="account_circle" size="30px"></q-icon> {{ profile.NAME + ' - ' + profile.CODE }}
        </q-toolbar-title>
      </q-toolbar>

      <q-list bordered>
        <q-item class="q-my-sm">

          <q-avatar size="190px">
            <img :src="'http://10.107.11.169/getpic?i=' + profile.CODE">
          </q-avatar>

          <q-item-section class="q-ml-md">
            <div class="row bg-grey-2 q-pa-sm rounded-borders row-pad">
              <div class="col-md-3">
                <b>FIRST NAME</b>
                <div>
                  <q-label class="n-label">{{ profile.FIRSTNAME }}</q-label>
                </div>
              </div>
              <div class="col-md-3">
                <b>MIDDLE NAME</b>
                <div>
                  <q-label class="n-label">{{ profile.MIDDLENAME }}</q-label>
                </div>
              </div>
              <div class="col-md-3">
                <b>LAST NAME</b>
                <div>
                  <q-label class="n-label">{{ profile.LASTNAME }}</q-label>
                </div>
              </div>
              <div class="col-md-3">
                <b>GENDER</b>
                <div>
                  <q-label class="n-label">{{ profile.GENDER === 'M' ? 'MALE' : 'FEMALE' }}</q-label>
                </div>
              </div>
            </div>
            <div class="row bg-grey-2 q-pa-sm rounded-borders row-pad">
              <div class="col-md-3">
                <b>BIRTH DATE</b>
                <div>
                  <q-label class="n-label">{{ moment(profile.BDATE).format('MMMM d, YYYY') }}</q-label>
                </div>
              </div>
              <div class="col-md-3">
                <b>MIDDLE NAME</b>
                <div>
                  <q-label class="n-label">{{ profile.AGE }}</q-label>
                </div>
              </div>
              <div class="col-md-3">
                <b>CITIZENSHIP</b>
                <div>
                  <q-label class="n-label">{{ profile.CITIZEN_DESC }}</q-label>
                </div>
              </div>
              <div class="col-md-3">
                <b>RELIGION</b>
                <div>
                  <q-label class="n-label">{{ profile.RELIGION_DESC }}</q-label>
                </div>
              </div>

            </div>
            <q-separator />
            <div class="row bg-grey-2 q-pa-sm rounded-borders">
              <div class="col-md-3">
                <b>EMAIL</b>
                <div>
                  <q-label class="n-label">{{ profile.EMAIL }}</q-label>
                </div>
              </div>
              <div class="col-md-3">
                <b>MIDDLE NAME</b>
                <div>
                  <q-label class="n-label">{{ profile.MIDDLENAME }}</q-label>
                </div>
              </div>
              <div class="col-md-3">
                <b>ADDRESS</b>
                <div>
                  <q-label class="n-label">{{ profile.ADDRESS }}</q-label>
                </div>
              </div>
              <div class="col-md-3">
                <b>MOBILE NO.</b>
                <div>
                  <q-label class="n-label">{{ profile.MOBILENO }}</q-label>
                </div>
              </div>
            </div>

            <q-separator />

            <div class="row bg-grey-2 q-pa-sm rounded-borders">
              <div class="col-md-3">
                <b>DEPARTMENT</b>
                <div>
                  <q-label class="n-label">{{ profile.DEPT_DESC }}</q-label>
                </div>
              </div>
              <div class="col-md-3">
                <b>POSITION</b>
                <div>
                  <q-label class="n-label">{{ profile.POS_DESC }}</q-label>
                </div>
              </div>
              <div class="col-md-3">
                <b>HIRED</b>
                <div>
                  <q-label class="n-label">{{ moment(profile.HIRED).format('MMMM d, YYYY') }}</q-label>
                </div>
              </div>
              <div class="col-md-3">
                <b>REGULARIZED</b>
                <div>
                  <q-label class="n-label">{{ moment(profile.REGULARIZED).format('MMMM d, YYYY') }}</q-label>
                </div>
              </div>
            </div>
            <q-separator />
            <div class="row bg-grey-2 q-pa-sm rounded-borders">
              <div class="col-md-3">
                <b>EMPLOYEE CLASS</b>
                <div>
                  <q-label class="n-label">{{ profile.DEPT_DESC }}</q-label>
                </div>
              </div>
              <div class="col-md-3">
                <b>EMPLOYEE STATUS</b>
                <div>
                  <q-label class="n-label">{{ profile.POS_DESC }}</q-label>
                </div>
              </div>
              <div class="col-md-3">
                <b>SERVICE YEARS</b>
                <div>
                  <q-label class="n-label">{{ profile['SERVICE YEARS'] }}</q-label>
                </div>
              </div>
            </div>
          </q-item-section>

        </q-item>

        <q-separator />
        <q-item-label header>SERVICE RECORD</q-item-label>
        <q-item-label class="q-ml-md">{{ profile.EMP_STATUS_DESC === 'PROBY' ? 'PROBATIONARY' : '' }}</q-item-label>
        <q-item class="q-mb-sm">

          <q-item-section>
            <div class="row bg-grey-2 q-pa-sm rounded-borders row-pad">
              <div class="col-md-3">
                <b>POSITION</b>
                <div>
                  <q-label class="n-label">{{ profile.POS_DESC }}</q-label>
                </div>
              </div>
              <div class="col-md-3">
                <b>DEPARTMENT</b>
                <div>
                  <q-label class="n-label">{{ profile.DEPT_DESC }}</q-label>
                </div>
              </div>
              <div class="col-md-3">
                <b>FROM</b>
                <div>
                  <q-label class="n-label">{{ moment(profile.HIRED).format('MMMM d, YYYY') }}</q-label>
                </div>
              </div>
              <div class="col-md-3">
                <b>TO</b>
                <div>
                  <q-label class="n-label">{{ moment(profile.REGULARIZED).format('MMMM d, YYYY') }}</q-label>
                </div>
              </div>

            </div>
          </q-item-section>


        </q-item>
      </q-list>
    </div>

  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'
import { date } from 'quasar'
import moment from 'moment'

export default defineComponent({
  name: 'EmployeeProfile',
  data() {
    return {
      profile: {},
      pageStatus: '',
      moment: moment
    }
  },

  computed: {
    ...mapGetters({
      employeeProfile: 'activeEmployees/employeeProfile',
      pageStatus: 'activeEmployees/pageStatus',
    })
  },
  created() {
    this.getEmployeeProfile()
  },
  methods: {
    async getEmployeeProfile() {
      const profileData = await this.$store.dispatch('activeEmployees/getEmployeeProfile', this.$route.params.id)
      console.log('result: ', profileData);
      this.profile = profileData
    },
  }
})


</script>
<style scoped>
.n-label {
  margin-top: -12px;
}

.row-pad {
  margin-top: -6px;
}
</style>