import React from 'react'
import { Form, Icon, Input, Button } from 'antd';

import { WrappedregisterForm } from './register'
import request from '../../NetWorkUtils/request'


import ageUrl from '../../../image/spinner-circle.svg'
import dumbell from '../../../image/trainNoteIcon.svg'

import './login.less'


const Url = 'http://127.0.0.1:3000/api/login'
const FormItem = Form.Item;

class LoginForm extends React.Component {
    handleSubmit = (e) => {
        console.log(document.cookie.split(';'))
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                request.Post({
                    url: Url,
                    jsonData: values
                }).then((res) => {
                    // window.location.href = 'http://192.168.20.6:8080/Database'
                }).catch((error) => {
                    console.log(error)
                })
            }
        })
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
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                            <Button type="default" className="register-button" onClick={this.props.register}>
                                注册
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}

const WrappedLoginForm = Form.create()(LoginForm)

class Login extends React.Component {
    state = {
        isLogin: true
    }
    register() {
        this.setState({
            isLogin: !this.state.isLogin
        })
    }
    render() {
        return (
            <div style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}  >
                <div className='iconWrap'>
                    <img className='dumbell icon' src={ageUrl} style={{ width: 200 }} />
                </div>
                <div className='iconWrap revers'>
                    <img className='dumbell icon' src={ageUrl} style={{ width: 200 }} />
                </div>
                {this.state.isLogin ?
                    <WrappedLoginForm
                        register={this.register.bind(this)}
                    />
                    : <WrappedregisterForm
                        return={this.register.bind(this)}
                    />
                }
            </div>
        )
    }
}

export default Login