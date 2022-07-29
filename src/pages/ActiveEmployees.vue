<template>
  {{ pageStatus }}
  <div class="q-pa-md">
    <q-inner-loading :showing="visible" class="q-mr-xl">
      <q-spinner color="primary" size="3em" />
    </q-inner-loading>
    <div class="q-pa-sm">
      <q-form @submit="submitFilter" class="q-gutter-md" ref="form">
        <div class="q-gutter-md row items-start s-input q-ml-sm">
          <q-select outlined v-model="search.campus" :options="campus" label="Campus" hint="Campus" lazy-rules
            :rules="[val => val && val.length > 0 || 'This is required']" />
          <q-input outlined v-model="search.employee_no" placeholder="Employee No." hint="Employee No." />
          <q-input outlined v-model="search.firstname" placeholder="Employee First Name" hint="First Name" />
          <q-input outlined v-model="search.lastname" placeholder="Employee Last Name" hint="Last Name" />
          <q-input outlined v-model="search.middlename" placeholder="Middle Name" hint="Middle Name" />
        </div>
        <br>
        <q-btn class="q-mr-md s-btn" label="Submit" type="submit" color="primary" />
      </q-form>
    </div>
  </div>
  <div class="q-ml-lg q-pa-md" v-if="resultEmployees.length >= 1">Filter: <b>{{ resultEmployees.length
  }}</b>
    <q-btn class="q-ml-lg" color="primary" icon-right="archive" label="Export to Excel" no-caps @click="exportTable" />
    <div class="q-gutter-md row items-start s-input">
      <q-input outlined placeholder="Employee Class" v-model="employee_class" @keyup="filterClass" />
      <q-input outlined placeholder="Department" v-model="department" @keyup="filterDepartment" />
      <q-input outlined placeholder="Position" v-model="employee_position" @keyup="filterPosition" />
      <q-input outlined placeholder="Status" v-model="employee_status" @keyup="filterStatus" />
    </div>
  </div>

  <div class="row" style="width: 1400px;">
    <div class="col-md-3 q-pa-md" v-for="resultEmployee in resultEmployees" :key="resultEmployee">
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>
          {{ resultEmployee.CODE }} - {{ resultEmployee.NAME }}
        </q-toolbar-title>
      </q-toolbar>

      <q-list bordered>
        <q-item class="q-my-sm">
          <q-item-section avatar>
            <q-avatar size="100px">
              <img :src="'http://10.107.11.169/getpic?i=' + resultEmployee.CODE">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="dept-label"><b>{{ resultEmployee.DEPT_DESC }}</b></q-item-label>
            <q-item-label>{{ resultEmployee.POS_DESC }}</q-item-label>
            <q-item-label>{{ resultEmployee.EMP_CLASS_CODE + ' ' + resultEmployee.EMP_STATUS_DESC }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="resultEmployee.IS_ACTIVE" clickable v-ripple :active="active"
          active-class="bg-teal-1 text-grey-8">
          <q-item-section avatar>
            <q-icon v-if="resultEmployee.GENDER === 'M'" name="face_6" />
            <q-icon v-else name="face_3" />
          </q-item-section>
          <q-item-section>
            <router-link :to="'/active_employees/profile/' + resultEmployee.CODE" style="text-decoration: none;"
              target="_blank">View
              Profile</router-link>
          </q-item-section>
          <q-item-section side>{{ resultEmployee.IS_ACTIVE ? 'ACTIVE' : 'IN-ACTIVE'
          }}</q-item-section>
        </q-item>
        <q-item v-else clickable v-ripple :active="active" active-class="bg-red-2 text-grey-8">
          <q-item-section avatar>
            <q-icon v-if="resultEmployee.GENDER === 'M'" name="face_6" />
            <q-icon v-else name="face_3" />
          </q-item-section>
          <q-item-section>
            <router-link :to="'/active_employees/profile/' + resultEmployee.CODE" style="text-decoration: none;"
              target="_blank">View
              Profile</router-link>
          </q-item-section>
          <q-item-section side>{{ resultEmployee.IS_ACTIVE ? 'ACTIVE' : 'IN-ACTIVE'
          }}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>

  <q-dialog v-model="filterAlert">
    <q-card>
      <q-card-section>
        <div class="text-h6">UERMMMCI FILTER</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        Sorry, No results found upon searching employees. Please try again
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { exportFile, useQuasar } from 'quasar'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'ActiveEmployees',
  setup() {
    const $q = useQuasar()
    return {
      filter: ref(''),
      tab: ref('mails'),
      model: ref(null),
      active: ref(true),
      visible: ref(false)
    }
  },
  data() {
    return {
      search: {
        employee_type: '',
        campus: '',
        employee_no: '',
        firstname: '',
        lastname: '',
        middlename: '',
        employee_status: '',
        employee_department: '',
        gender: '',
        employee_position: '',
        employee_class: '',
        isActive: ''
      },
      campus: [
        '',
        'UE Caloocan',
        'UE Manila',
        'UERM'
      ],
      filterAlert: false,
      department: '',
      employee_class: '',
      employee_position: '',
      employee_status: '',
      searchStatus: '',
      title: '',
      resultCount: '',
      loading: false,
      columns,
      resultEmployees: [],
      localFilter: [],
      rows: []
    }
  },

  computed: {
    ...mapGetters({
      employees: 'activeEmployees/employees',
      pageStatus: 'activeEmployees/pageStatus',
      searchedEmployees: 'activeEmployees/searchedEmployees',
      resultForStateFilters: 'activeEmployees/resultForStateFilter',
    })

  },
  mounted() {
    this.getActiveEmployees()
  },

  methods: {
    async getActiveEmployees() {
      const getEmployees = await this.$store.dispatch('activeEmployees/getActiveEmployees')
      console.log('result: ', getEmployees.data);
    },
    async submitFilter() {
      this.visible = true
      this.resultEmployees = ''
      let sData = {
        employee_type: this.search.employee_type,
        campus: this.search.campus === 'UE Caloocan' ? '0' : this.search.campus === 'UE Manila' ? '1' : '2',
        employee_no: this.search.employee_no,
        firstname: this.search.firstname,
        lastname: this.search.lastname,
        middlename: this.search.middlename,
        gender: this.search.gender,
        employee_department: this.search.employee_department,
        employee_position: this.search.employee_position,
        employee_status: this.search.employee_status,
        employee_class: this.search.employee_class,
        isActive: this.search.isActive
      }

      const result = await this.$store.dispatch('activeEmployees/getSearchedEmployees', sData)
      setTimeout(() => {
        this.resultEmployees = this.searchedEmployees
        result.data.length <= 0 ? this.filterAlert = true : false
        this.visible = false
      }, 1000)

    },
    filterClass() {
      console.log('class: ', this.employee_class)
      if (this.employee_class === '') {
        this.resultEmployees = this.searchedEmployees
      } else {
        this.resultEmployees = this.resultEmployees.filter(resultEmployee => typeof resultEmployee.EMP_CLASS_DESC === 'string' ? resultEmployee.EMP_CLASS_DESC.toLowerCase().includes(this.employee_class.toLowerCase()) : '')
      }
    },
    filterDepartment() {
      if (this.department === '') {
        this.resultEmployees = this.searchedEmployees
      } else {
        this.resultEmployees = this.resultEmployees.filter(resultEmployee => typeof resultEmployee.DEPT_DESC === 'string' ? resultEmployee.DEPT_DESC.toLowerCase().includes(this.department.toLowerCase()) : '')
      }
    },
    filterPosition() {
      if (this.employee_position === '') {
        this.resultEmployees = this.searchedEmployees
      } else {
        this.resultEmployees = this.resultEmployees.filter(resultEmployee => typeof resultEmployee.POS_DESC === 'string' ? resultEmployee.POS_DESC.toLowerCase().includes(this.employee_position.toLowerCase()) : '')
      }
    },
    filterStatus() {
      if (this.employee_status === '') {
        this.resultEmployees = this.searchedEmployees
      } else {
        this.resultEmployees = this.resultEmployees.filter(resultEmployee => typeof resultEmployee.EMP_STATUS_DESC === 'string' ? resultEmployee.EMP_STATUS_DESC.toLowerCase().includes(this.employee_status.toLowerCase()) : '')
      }
    },
    wrapCsvValue(val, formatFn, row) {
      let formatted = formatFn !== void 0
        ? formatFn(val, row)
        : val

      formatted = formatted === void 0 || formatted === null
        ? ''
        : String(formatted)

      formatted = formatted.split('"').join('""')
      return `"${formatted}"`
    },
    exportTable() {
      // naive encoding to csv format
      const content = [columns.map(col => this.wrapCsvValue(col.label))].concat(
        this.searchedEmployees.map(row => columns.map(col => this.wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[col.field === void 0 ? col.name : col.field],
          col.format,
          row
        )).join(','))
      ).join('\r\n')

      const status = exportFile(
        'table-export.csv',
        content,
        'text/csv'
      )

      if (status !== true) {
        $q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    }

  }
})

const columns = [
  {
    name: 'CODE',
    required: true,
    label: 'CODE',
    align: 'left',
    field: 'CODE',
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'NAME',
    align: 'left',
    label: 'NAME',
    field: 'NAME',
    sortable: true
  },
  {
    name: 'DEPARTMENT',
    align: 'left',
    label: 'DEPARTMENT',
    field: 'DEPARTMENT',
    sortable: true
  },
  {
    name: 'ACTIVE',
    align: 'left',
    label: 'ACTIVE',
    field: 'IS_ACTIVE',
    sortable: true
  }
]

</script>
<style scoped>
.q-input {
  width: 20em;
}

.q-select {
  width: 20em;
}

.s-input {
  margin-top: 20px;
  margin-left: 1px;
}

.dept-label {
  font-size: 12px;
  margin-top: -50px;
}

.code-label {
  font-size: 14px;
}
</style>