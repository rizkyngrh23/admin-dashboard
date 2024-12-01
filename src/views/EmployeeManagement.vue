<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Employee Management</v-card-title>
          <v-card-text>
            <v-btn @click="showAddEmployeeDialog = true">Add Employee</v-btn>
            <v-text-field v-model="search" label="Search" class="mt-3"></v-text-field>
            <v-select
              v-model="selectedDepartment"
              :items="departments"
              label="Filter by Department"
              class="mt-3"
              append-icon="mdi-close"
              @click:append="clearFilter"
            ></v-select>
            <v-data-table
              :headers="headers"
              :items="filteredEmployees"
              :search="search"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:item.actions="{ item }">
                <v-icon small @click="editEmployee(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteEmployee(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Employees by Department</v-card-title>
          <v-card-text>
            <canvas id="departmentChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Employees by Role</v-card-title>
          <v-card-text>
            <canvas id="roleChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showAddEmployeeDialog" max-width="500px">
      <v-card>
        <v-card-title>Add Employee</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="newEmployee.name" label="Name" required></v-text-field>
            <v-text-field v-model="newEmployee.age" label="Age" type="number" required></v-text-field>
            <v-text-field v-model="newEmployee.department" label="Department" required></v-text-field>
            <v-text-field v-model="newEmployee.role" label="Role" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="addEmployee">Add</v-btn>
          <v-btn color="grey" text @click="showAddEmployeeDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showEditEmployeeDialog" max-width="500px">
      <v-card>
        <v-card-title>Edit Employee</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="editedEmployee.name" label="Name" required></v-text-field>
            <v-text-field v-model="editedEmployee.age" label="Age" type="number" required></v-text-field>
            <v-text-field v-model="editedEmployee.department" label="Department" required></v-text-field>
            <v-text-field v-model="editedEmployee.role" label="Role" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="updateEmployee">Save</v-btn>
          <v-btn color="grey" text @click="showEditEmployeeDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'EmployeeManagement',
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Age', value: 'age' },
        { text: 'Department', value: 'department' },
        { text: 'Role', value: 'role' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      employees: [
        { name: 'Adam Maulana', age: 30, department: 'Engineering', role: 'Developer' },
        { name: 'Asep Bara', age: 25, department: 'Marketing', role: 'Manager' },
        { name: 'Budi Santoso', age: 40, department: 'Finance', role: 'Accountant' },
        { name: 'Siti Aminah', age: 35, department: 'HR', role: 'HR Manager' },
        { name: 'Agus Salim', age: 28, department: 'IT', role: 'System Administrator' },
        { name: 'Dewi Lestari', age: 32, department: 'Sales', role: 'Sales Executive' }
      ],
      showAddEmployeeDialog: false,
      showEditEmployeeDialog: false,
      newEmployee: {
        name: '',
        age: '',
        department: '',
        role: ''
      },
      editedEmployee: {
        name: '',
        age: '',
        department: '',
        role: ''
      },
      search: '',
      selectedDepartment: null,
      departments: ['None', 'Engineering', 'Marketing', 'Finance', 'HR', 'IT', 'Sales']
    };
  },
  computed: {
    filteredEmployees() {
      const searchRegex = new RegExp(this.search, 'i');
      return this.employees.filter(employee => {
        return (
          (this.selectedDepartment === 'None' || !this.selectedDepartment || employee.department === this.selectedDepartment) &&
          (searchRegex.test(employee.name) || searchRegex.test(employee.role))
        );
      });
    }
  },
  methods: {
    addEmployee() {
      if (this.$refs.form.validate()) {
        this.employees.push({ ...this.newEmployee });
        this.showAddEmployeeDialog = false;
        this.resetNewEmployee();
        this.updateCharts();
      }
    },
    editEmployee(employee) {
      this.editedEmployee = { ...employee };
      this.showEditEmployeeDialog = true;
    },
    updateEmployee() {
      if (this.$refs.form.validate()) {
        const index = this.employees.findIndex(emp => emp.name === this.editedEmployee.name);
        if (index !== -1) {
          this.employees.splice(index, 1, this.editedEmployee);
        }
        this.showEditEmployeeDialog = false;
        this.editedEmployee = {
          name: '',
          age: '',
          department: '',
          role: ''
        };
        this.updateCharts();
      }
    },
    deleteEmployee(employee) {
      const index = this.employees.findIndex(emp => emp.name === employee.name);
      if (index !== -1) {
        this.employees.splice(index, 1);
      }
      this.updateCharts();
    },
    resetNewEmployee() {
      this.newEmployee = {
        name: '',
        age: '',
        department: '',
        role: ''
      };
    },
    clearFilter() {
      this.selectedDepartment = 'None';
    },
    updateCharts() {
      const departments = this.employees.reduce((acc, emp) => {
        acc[emp.department] = (acc[emp.department] || 0) + 1;
        return acc;
      }, {});

      const roles = this.employees.reduce((acc, emp) => {
        acc[emp.role] = (acc[emp.role] || 0) + 1;
        return acc;
      }, {});

      const roleColors = {
        'Developer': '#f87979',
        'Manager': '#36a2eb',
        'Accountant': '#ffcd56',
        'HR Manager': '#4bc0c0',
        'System Administrator': '#9966ff',
        'Sales Executive': '#ff9f40'
      };

      this.departmentChart.data.labels = Object.keys(departments);
      this.departmentChart.data.datasets[0].data = Object.values(departments);
      this.departmentChart.update();

      this.roleChart.data.labels = Object.keys(roles);
      this.roleChart.data.datasets[0].data = Object.values(roles);
      this.roleChart.data.datasets[0].backgroundColor = Object.keys(roles).map(role => roleColors[role]);
      this.roleChart.update();
    }
  },
  mounted() {
    const departmentCtx = document.getElementById('departmentChart').getContext('2d');
    this.departmentChart = new Chart(departmentCtx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Employees by Department',
            backgroundColor: '#36a2eb',
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    const roleCtx = document.getElementById('roleChart').getContext('2d');
    this.roleChart = new Chart(roleCtx, {
      type: 'pie',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Employees by Role',
            backgroundColor: [],
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    this.updateCharts();
  }
};
</script>

<style scoped>
#departmentChart, #roleChart {
  height: 300px;
}
</style>