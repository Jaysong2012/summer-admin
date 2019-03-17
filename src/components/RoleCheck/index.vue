<template>
    <el-checkbox-group v-model="checkRoles" v-on:change="handleCheckChange" v-bind:v-loading="loading">
        <el-checkbox-button v-for="role in roleOptions" :label="role.name" :key="role.id" >{{role.name}}</el-checkbox-button>
    </el-checkbox-group>
</template>

<script>
    import { conditionRoleList } from '../../api/system'
    export default {
        name: "RoleCheck",
        props: {
            checkedRoles: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        watch:{
            checkedRoles(roles){
                this.checkRoles = roles;
            }
        },
        data () {
            return {
                checkRoles: this.checkedRoles,
                loading:false,
                roleOptions: []
            };
        },
        created() {
            this.getList()
        },
        methods: {
            handleCheckChange: function(checks){
                console.log('handleCheckChange'+checks);
                this.checkedRoles = checks;
                let _this = this;
                let val = {};
                val.checks = checks;
                let idList = []
                checks.forEach(function (value) {
                    _this.roleOptions.forEach(obj => {
                        if(obj.name == value){
                            idList.push(obj.id);
                        }
                    })
                });
                val.ids = idList;
                console.log(val);
                this.$emit('handleCheckRolesChange', val)
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
