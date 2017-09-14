<template>
    <div class="form-box">
        <el-form ref="form" :model="form" :rules="rules" label-width="160px">
            <el-form-item label="原密码" prop="pwd">
                <el-input v-model="form.pwd"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd1">
                <el-input v-model="form.newPwd1"></el-input>
            </el-form-item>
            <el-form-item label="再次输入新密码" prop="newPwd2">
                <el-input v-model="form.newPwd2"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                <el-button @click="onReset('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Check from '../../assets/js/validate.js'
    export default {
        data(){
            var validatePwd2 = (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入新密码'));
                } else if (value !== this.form.newPwd1) {
                  callback(new Error('两次输入密码不一致!'));
                } else {
                  callback();
                }
            };
            return {
                form: {
                    pwd: '',
                    newPwd1: '',
                    newPwd2: ''
                },
                rules: {
                    pwd: [
                        {required:true,message:"请输入密码",trigger:"blur"},
                        { validator: Check.validatePassword, trigger: 'blur' }
                    ],
                    newPwd1: [
                        {required:true,message:"请输入新密码",trigger:"blur"},
                        { validator: Check.validatePassword, trigger: 'blur' }
                    ],
                    newPwd2: [
                        { validator: validatePwd2, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                    this.$message.success('提交成功！');
                  } else {
                    this.$message.error('请正确填写表单！');
                    return false;
                  }
                });
            },
            onReset(formName){
                this.$refs[formName].resetFields();
            }
        },
        beforeMount(){
        }
    }
</script>
<style lang="less" scoped>
    @import '../../assets/less/mixins.less';
    .form-box{
        .clearfix();
    }
</style>