<template>
    <div>
        <div class="email">
            <h2 style="margin: 0 0 8px 0;padding: 0">邮件配置:</h2>
            <table>
                <tr>
                    <td>邮件发送开关:</td>
                    <td>
                        <el-select v-model="email.status" placeholder="请选择">
                            <el-option
                                    v-for="item in option"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </td>
                    <td>
                        <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            默认关闭状态,如需开启请选择开启并设置好通知参数并保存
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>SMTP服务器:</td>
                    <td>
                        <el-input class="longInput" v-model="email.smtp_server" placeholder="请输入邮箱服务器地址"></el-input>
                    </td>
                    <td>
                         <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            网易163邮箱：<el-tag>smtp.163.com</el-tag>，qq邮箱：<el-tag>smtp.qq.com</el-tag>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>SMTP服务器端口:</td>
                    <td>
                        <el-input class="longInput" v-model="email.smtp_port" placeholder="请输入邮箱服务器地址"></el-input>
                    </td>
                    <td>
                         <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            网易163邮箱：<el-tag>25</el-tag>，qq邮箱：<el-tag>465</el-tag>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>SMTP账户:</td>
                    <td>
                        <el-input class="longInput" v-model="email.smtp_user" placeholder="请输入邮箱账号"></el-input>
                    </td>
                    <td>
                         <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            输入邮箱的登录账户
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>登录授权码:</td>
                    <td>
                        <el-input class="longInput" v-model="email.smtp_password" placeholder="第三方授权密码"></el-input>
                    </td>
                    <td>
                         <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            填写邮箱的客户端授权密码
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>邮件标题:</td>
                    <td>
                        <el-input class="longInput" v-model="email.email_title" placeholder="请输入邮箱服务器地址"></el-input>
                    </td>
                    <td>
                         <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            通知信息的标题
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        操作:
                    </td>
                    <td>
                        <el-button type="primary">保存配置</el-button>
                    </td>
                    <td>
                        <el-button type="success">测试发送</el-button>
                    </td>
                </tr>
            </table>
        </div>
        <div class="phone">
            <h2 style="margin: 0 0 8px 0;padding: 0">短信配置:</h2>
            <table>
                <tr>
                    <td>短信发送开关:</td>
                    <td>
                        <el-select v-model="phone.status" placeholder="请选择">
                            <el-option
                                    v-for="item in option"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </td>
                    <td>
                          <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            默认关闭状态,如需开启请选择开启并设置好通知参数并保存
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>选择服务商:</td>
                    <td>
                        <el-select v-model="phone.provider" placeholder="请选择">
                            <el-option
                                    v-for="item in provider"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </td>
                    <td>
                          <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            选择服务商类型
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>accessKeyId:</td>
                    <td>
                        <el-input class="longInput" v-model="phone.access_key_id" placeholder="请输入授权Id"></el-input>
                    </td>
                    <td>
                          <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            填写授权Id
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Secret密匙:</td>
                    <td>
                        <el-input class="longInput" v-model="phone.secret" placeholder="填写授权密匙"></el-input>
                    </td>
                    <td>
                          <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            填写授权密匙
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>短信签名:</td>
                    <td>
                        <el-input class="longInput" v-model="phone.sing_anme" placeholder="请输入短信的签名"></el-input>
                    </td>
                    <td>
                          <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            填写短信签名
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>短信内容:</td>
                    <td>
                        <el-input class="longInput" v-model="phone.content" placeholder="请填写短信通知内容"></el-input>
                    </td>
                    <td>
                          <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            短信的通知内容
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        操作:
                    </td>
                    <td>
                        <el-button type="primary">保存配置</el-button>
                    </td>
                    <td>
                        <el-button type="success">测试发送</el-button>
                    </td>
                </tr>
            </table>

        </div>
    </div>
</template>

<script>
    export default {
        name: "notify",
        data() {
            return {
                option: [
                    {
                        label: '关闭',
                        value: '0'
                    },
                    {
                        label: '开启',
                        value: '1'
                    }
                ],
                provider: [
                    {
                        label: '阿里大鱼',
                        value: '0'
                    },
                    {
                        label: '凌众短信',
                        value: '1'
                    }
                ],
                email: {
                    status: '0',
                    smtp_server: 'smtp.163.com',
                    smtp_port: '25',
                    smtp_user: '',
                    smtp_password: '',
                    email_title: '测试通知信息'
                },
                phone: {
                    status: '0',
                    provider: '',
                    access_key_id: '',
                    secret: '',
                    content: '测试通知信息',
                    sing_anme: '',
                }
            }
        }
    }
</script>

<style scoped>
    .longInput {
        width: 400px;
    }

    tr {
        line-height: 50px;
    }

    .email {
        background-color: #ffffff;
    }

    .phone {
        margin-top: 15px;
        background-color: #ffffff;
    }
</style>