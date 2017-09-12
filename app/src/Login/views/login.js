import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

import './login.less'
import ageUrl from '../../../image/spinner-circle.svg'
import dumbell from '../../../image/trainNoteIcon.svg'

class Login extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}  >
                <div className='iconWrap'>
                    <img className='dumbell icon' src={ageUrl} style={{ width:200 }} />
                </div>
                <div className='iconWrap revers'>
                    <img className='dumbell icon' src={ageUrl} style={{ width:200 }} />
                </div>
                <div style={{ width: 300 }}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                                )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                                )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                            </Button>
                                )}
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(Login)
export default WrappedNormalLoginForm