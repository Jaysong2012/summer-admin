<template>
  <el-dialog :title="dialogStatus | dialogStatusFilter" :visible.sync="visibale" @close="handleDialogVisible(false)">
    <el-form :model="item" label-width="80px" label-position="left">
      <el-form-item :label="$t('table.name')">
        <el-input v-model="item.name" :placeholder="$t('table.name')" />
      </el-form-item>
      <el-form-item :label="$t('table.remark')">
        <el-input
          v-model="item.remark"
          :autosize="{ minRows: 2, maxRows: 4}"
          type="textarea"
          :placeholder="$t('table.remark')"
        />
      </el-form-item>
      <el-form-item v-loading="powerLoading" :label="$t('system.role.permission')">
        <el-tree
          ref="tree"
          class="filter-tree"
          :data="data"
          show-checkbox
          node-key="uri"
          highlight-current
          :props="defaultProps"
          @check-change="handleCheckdChange"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleDialogVisible(false)">{{ $t('table.cancel') }}</el-button>
      <el-button type="primary" @click="save">{{ $t('table.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { fetchRolePower, saveRole } from '../../../api/system'
import waves from '../../../directive/waves' // Waves directive
import i18n from '../../../lang'
export default {
  name: 'RoleAddOrEdit',
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: i18n.t('status.forbidden'),
        1: i18n.t('status.enable')
      }
      return statusMap[status]
    },
    dialogStatusFilter(dialogStatus) {
      const dialogStatusMap = {
        update: i18n.t('table.edit'),
        create: i18n.t('table.add')
      }
      return dialogStatusMap[dialogStatus]
    }
  },
  props: ['dialogVisible', 'item'],
  data() {
    return {
      data: [],
      powerLoading: false,
      visibale: this.dialogVisible,
      dialogStatus: 'create',
      defaultProps: {
        children: 'sub',
        label: 'name'
      }
    }
  },
  watch: {
    item(obj) {
      if (obj.id === 0) {
        this.dialogStatus = 'create'
      } else {
        this.dialogStatus = 'update'
      }
      this.fetchRolePowerTree(obj)
    },
    dialogVisible(visible) {
      if (this.visibale !== visible) {
        this.visibale = visible
      }
    }
  },
  methods: {
    handleDialogVisible: function(visible) {
      if (this.visibale !== visible) {
        this.visibale = visible
      }
      this.$emit('handleDialogVisible', visible)
    },
    setCheckedKeys(power_key_list) {
      this.$refs.tree.setCheckedKeys(power_key_list)
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
    },
    save() {
      const power_array = []
      this.$refs.tree.getCheckedKeys().forEach(function(value) {
        power_array.push({
          uri: value,
          power: 1
        })
      })
      this.item.powerList = power_array
      saveRole(this.item)
        .then(response => {
          if (response.returnCode === '000000') {
            this.handleDialogVisible(false)
            this.$emit('getList', 0)
          } else {
            this.message({
              message: response.returnMsg,
              type: 'fail',
              duration: 2000
            })
          }
        })
    },
    handleCheckdChange() {
    },
    fetchRolePowerTree(item) {
      let request = {}
      if (item.id !== 0) {
        request = { id: item.id }
      }
      this.powerLoading = true
      fetchRolePower(request).then(response => {
        if (response.returnCode === '000000') {
          this.data = response.data
          const power_key_list = []
          response.data.forEach(function(vale) {
            vale.sub.forEach(function(value) {
              if (value.power === 1) {
                power_key_list.push(value.uri)
              }
            })
          })
          this.setCheckedKeys(power_key_list)

          this.powerLoading = false
        } else {
          this.message({
            message: response.returnMsg,
            type: 'fail',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
