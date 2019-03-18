<template>
    <el-select v-model="roleId" :placeholder="$t('system.sysuser.list.role')" clearable style="width: 140px" class="filter-item" v-on:change="handleSelectChange" v-bind:v-loading="loading">
        <el-option  v-for="role in roleOptions" :label="role.name" :key="role.id" :value="role.id"/>
    </el-select>
</template>

<script>
    import { conditionRoleList } from '../../api/system'
    export default {
        name: "RoleSelect",
        props:['selectedRoleId'],
        data : function(){
            return{
                loading:false,
                roleId : this.selectedRoleId,
                roleOptions: []
            };
        },
        created() {
            this.getList()
        },
        methods:{
            handleSelectChange() {
                if(this.selectedRoleId != this.roleId){
                    this.$emit('handleRoleIdSelectChange',this.roleId);
                }
            },
            getList() {
                this.loading = true;
                conditionRoleList().then(response => {
                    if (response.returnCode == "000000"){
                        this.roleOptions = response.data;
                        this.loading = false
                    }else {
                        this.loading = false
                        this.message({
                            message: response.returnMsg,
                            type: 'fail',
                            duration: 2000
                        })
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>
