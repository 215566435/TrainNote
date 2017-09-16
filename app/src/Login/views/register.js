import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import request from '../../NetWorkUtils/request'


import './login.less'


const Url = 'http://127.0.0.1:3000/api/register'
const FormItem = Form.Item;

class registerForm extends React.Component {
    handleSubmit = (e) => {
        console.log(document.cookie.split(';'))
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                request.Post({
                    url: Url,
                    jsonData: values
                }).then((res) => {
                    res.json().then((resJson) => {
                        if (resJson.state === 'EMAIL_DUPLICATE') {
                            message.error('邮箱/用户名重复，请使用另外一个')
                            return
                        } else if (resJson.state === 'LOGINED') {
                            message.success('注册成功，自动跳转登陆')
                        }

                    }).catch((errs) => {

                        console.log(errs)
                    })
                }).catch((error) => {
                    message.error(error)
                })
            }
        })
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码必须相同！')
        } else {
            callback()
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <div style={{ width: 300 }}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '用户名不能为空!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="邮箱/用户名" />
                                )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '密码不能为空!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                                )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('check-password', {
                                rules: [{ required: true, message: '密码不能为空!' }, { validator: this.checkPassword }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="确认密码" />
                                )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                注册
                            </Button>
                            <Button type="default" className="register-button" onClick={this.props.return}>
                                返回
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}

export const WrappedregisterForm = Form.create()(registerForm)