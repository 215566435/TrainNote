import React from 'react'
import { Input, Icon, Upload, message } from 'antd';
import { Form, Button } from 'antd';
const { TextArea } = Input;

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const property = {
    headers: { 'Access-Control-Allow-Origin': '*' }
}


class CourseFrom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            close: false,
            url: ''
        }
    }

    submit = (e) => {
        e.preventDefault();
        let value = this.props.form.getFieldsValue()
        console.log(value)
        if (typeof value.upload === 'undefined') {
            message.error('图片位置不能为空');
            return
        }
        switch (value.upload.file.status) {
            case 'done':
                break
            case 'uploading':
                message.error('正在上传别着急');
                break
            default:
                message.error('图片上传不成功，请重新上传');
                return
        }
        let upload = {
            url: 'https://zh.9uhxir.top/uploads/' + value.upload.file.response + '.jpg',
            name: value.trainer,
            bref: value.bref,
            id: value.upload.file.response
        }
        this.props.upload(upload)
    }
    beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('你只能上传jpg格式!');
            return false;
        }
    }
    onchange = (info) => {
        console.log(info.file)
        if (info.file.status === 'done') {
            this.setState({
                close: true,
                url: 'https://zh.9uhxir.top/uploads/' + info.file.response + '.jpg'
            })
        } else if (info.file.status == "removed") {
            this.setState({
                close: false,
                url: ''
            })
        }
    }

    goback = ()=>{
        location.href='https://zh.9uhxir.top/uploads/'
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.submit}>
                    <FormItem {...formItemLayout} label='教练姓名'>
                        {getFieldDecorator('trainer')(
                            <Input size='large' placeholder='王明' />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='教练简介'>
                        {getFieldDecorator('bref')(
                            <TextArea placeholder="教练简介..王明是个能人.." autosize={{ minRows: 2, maxRows: 6 }} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="教练头像"
                        extra="目前只支持jpg格式">
                        {getFieldDecorator('upload')(
                            <Upload
                                name="logo"
                                action="https://zh.9uhxir.top/django/zongheng/file/"
                                {...property}
                                onChange={this.onchange}
                                disabled={this.state.close}
                                beforeUpload={this.beforeUpload}>
                                <img className='uploadimg' src={this.state.url} />
                                <Button><Icon type="upload" /> 点击上传</Button>
                            </Upload>
                        )}
                    </FormItem>

                    <FormItem
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 16, offset: 8 },
                        }}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </FormItem>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <Button type="default"  size='large' onClick={this.goback}>返回首页</Button>
                    </div>
                </Form>

            </div>
        )
    }
}

const WrappedCourseFrom = Form.create()(CourseFrom);

export default WrappedCourseFrom

