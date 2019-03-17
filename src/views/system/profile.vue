<template>
    <el-card class="box-card" style="margin-top: 40px">
        <div slot="header" class="clearfix">
            <span>个人中心</span>
            <el-button style="float: right; padding: 3px 0" type="text" v-on:click="handleChange">想要修改？</el-button>
        </div>
        <el-form label-position="left" label-width="80px">
            <el-form-item label="账户">
                <span>{{ name }}</span>
            </el-form-item>
            <el-form-item label="密码">
                <span>******</span>
            </el-form-item>
            <el-form-item label="邮箱">
                <span>{{ email }}</span>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
import { mapGetters } from 'vuex'
import { MessageBox} from 'element-ui'

export default {
   name: "Profile",
   computed: {
        ...mapGetters([
            'email',
            'name',
        ])
   },
    methods: {
       handleChange: function () {
           MessageBox.confirm('当前不可以修改哦', '拒绝修改', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
           }).then(() => {
           })
       }
    }
}
</script>
<style scoped>
    .box-card {
        margin-left: 20px;
        width: 480px;
    }
</style>
