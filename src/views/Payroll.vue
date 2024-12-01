<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Payroll Processing</v-card-title>
          <v-card-text>
            <v-btn @click="processPayroll">Process Payroll</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>View Payslips</v-card-title>
          <v-card-text>
            <v-text-field v-model="payslipSearch" label="Search Payslips" class="mb-4"></v-text-field>
            <v-data-table :headers="payslipHeaders" :items="filteredPayslips" class="elevation-1" @click:row="viewPayslip"></v-data-table>
            <v-btn @click="exportPayslips" class="mt-4">Export Payslips</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>Manage Bonuses and Deductions</v-card-title>
          <v-card-text>
            <v-text-field v-model="bonusSearch" label="Search Bonuses/Deductions" class="mb-4"></v-text-field>
            <v-data-table :headers="bonusHeaders" :items="filteredBonuses" class="elevation-1" @click:row="manageBonus"></v-data-table>
            <v-btn @click="exportBonuses" class="mt-4">Export Bonuses/Deductions</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="payslipDialog" max-width="500px">
      <v-card>
        <v-card-title>Payslip Details</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="(value, key) in selectedPayslip" :key="key">
              <v-list-item-content>
                <v-list-item-title>{{ key }}</v-list-item-title>
                <v-list-item-subtitle>{{ value }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="payslipDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="bonusDialog" max-width="500px">
      <v-card>
        <v-card-title>Bonus/Deduction Details</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="(value, key) in selectedBonus" :key="key">
              <v-list-item-content>
                <v-list-item-title>{{ key }}</v-list-item-title>
                <v-list-item-subtitle>{{ value }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="bonusDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'Payroll',
  data() {
    return {
      payslipHeaders: [
        { text: 'Employee', value: 'employee' },
        { text: 'Month', value: 'month' },
        { text: 'Amount', value: 'amount' }
      ],
      payslips: [
        { employee: 'Budi Santoso', month: 'October', amount: '$3000' },
        { employee: 'Siti Aminah', month: 'October', amount: '$3200' }
      ],
      bonusHeaders: [
        { text: 'Employee', value: 'employee' },
        { text: 'Type', value: 'type' },
        { text: 'Amount', value: 'amount' }
      ],
      bonuses: [
        { employee: 'Budi Santoso', type: 'Bonus', amount: '$500' },
        { employee: 'Siti Aminah', type: 'Deduction', amount: '$200' }
      ],
      payslipSearch: '',
      bonusSearch: '',
      payslipDialog: false,
      bonusDialog: false,
      selectedPayslip: {},
      selectedBonus: {}
    };
  },
  computed: {
    filteredPayslips() {
      return this.payslips.filter(payslip => 
        payslip.employee.toLowerCase().includes(this.payslipSearch.toLowerCase())
      );
    },
    filteredBonuses() {
      return this.bonuses.filter(bonus => 
        bonus.employee.toLowerCase().includes(this.bonusSearch.toLowerCase())
      );
    }
  },
  methods: {
    processPayroll() {
      alert('Payroll processed successfully!');
    },
    viewPayslip(item) {
      this.selectedPayslip = item;
      this.payslipDialog = true;
    },
    manageBonus(item) {
      this.selectedBonus = item;
      this.bonusDialog = true;
    },
    exportPayslips() {
      // Logic to export payslips
      alert('Payslips exported successfully!');
    },
    exportBonuses() {
      // Logic to export bonuses and deductions
      alert('Bonuses/Deductions exported successfully!');
    }
  }
};
</script>

<style scoped>
/* Add any specific styles for Payroll.vue here */
</style>