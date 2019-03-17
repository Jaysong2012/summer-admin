<template>
    <el-dialog v-bind:title="dialogStatus | dialogStatusFilter" :visible.sync="visibale" v-on:close="handleDialogVisible(false)">
        <el-form :model="item" label-width="80px" label-position="left"	>
            <el-form-item :label="$t('table.name')">
                <el-input v-model="item.name" :placeholder="$t('table.name')"/>
            </el-form-item>
            <el-form-item :label="$t('system.sysuser.list.passwd')">
                <el-input v-model="item.passwd" :placeholder="$t('system.sysuser.list.passwd')"/>
            </el-form-item>
            <el-form-item :label="$t('system.sysuser.list.email')">
                <el-input v-model="item.email" :placeholder="$t('system.sysuser.list.email')"/>
            </el-form-item>
            <el-form-item :label="$t('system.sysuser.list.role')">
                <role-check v-bind:checkedRoles="userCheckedRoles" v-on:handleCheckRolesChange="handleCheckRolesChange" ></role-check>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleDialogVisible(false)">{{ $t('table.cancel') }}</el-button>
            <el-button type="primary" v-on:click="save">{{ $t('table.confirm') }}</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import { saveSysuser } from '../../../api/system'
    import waves from '../../../directive/waves' // Waves directive
    import RoleCheck from '../../../components/RoleCheck'
    import i18n from '../../../lang'
    export default {
        name: "sysuser.AddOrEdit",
        components: {  RoleCheck },
        directives: { waves },
        props:['dialogVisible','item'],
        filters: {
            dialogStatusFilter(dialogStatus) {
                const dialogStatusMap = {
                    update: i18n.t('table.edit'),
                    create: i18n.t('table.add')
                };
                return dialogStatusMap[dialogStatus]
            }
        },
        data() {
            return {
                userCheckedRoles: [],
                data: [],
                visibale: this.dialogVisible,
                dialogStatus: 'create',
            }
        },
        watch:{
            item(obj){
                if(obj.id == 0){
                    this.dialogStatus = 'create';
                }else{
                    this.dialogStatus = 'update';
                }

                this.userCheckedRoles =obj.roleNameList;
            },
            dialogVisible(visible){
                if(this.visibale != visible){
                    this.visibale = visible
                }
            }
        },
        methods:{
            handleDialogVisible:function (visible) {
                if(this.visibale != visible){
                    this.visibale = visible
                }
                this.$emit('handleDialogVisible', visible);
            },
            handleCheckRolesChange(val){
                this.userCheckedRoles = val.checks;
                this.item.roleNameList = val.checks;
                this.item.roleIdList = val.ids;
            },
            save(){
                if(this.item.passwd =='*****'){
                    delete this.item.passwd;
                }
                saveSysuser(this.item).then(response => {
                    if (response.returnCode == "000000"){
                        this.handleDialogVisible(false);
                        this.$emit('getList',0);
                    }else {
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
