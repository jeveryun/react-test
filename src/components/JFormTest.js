import React, {Component} from 'react'
import { Input, Button} from 'antd'

// 创建一个高级组件
function JFormCreate(Comp) {
    return class extends Component {

        constructor(props) {
            super(props)

            this.state = {
            }

            this.options = {}
        }

        handleChange = (e) => {
            const {name, value} = e.target
            this.setState({
                [name]: value
            }, () => {
                this.validateField(name)
            })
        }

        validateFields = (cb) => {
            const rets = Object.keys(this.options).map(field => {
                return this.validateField(field)
            })
            const ret = rets.every(v => v)
            cb(ret, this.state)
        }

        validateField = (field) => {
            const {rules} = this.options[field]
            const ret = !rules.some(rule => {
                
                if (rule.required) {
                    if (!this.state[field]) {
                        this.setState({
                            [field + 'Message']: rule.message
                        })
                        return true
                    }
                }

                return false
            })

            if (ret) {
                this.setState({
                    [field + 'Message']: ''
                })
            }

            return ret
        }

        getFieldDec = (field, option) => {
            this.options[field] = option

            return (InputComp) => {
                return (
                    <div>
                        {
                            React.cloneElement(InputComp, {
                                name: field,
                                value: this.state[field] || '',
                                onChange: this.handleChange
                            })
                        }
                        
                        {
                            this.state[field + 'Message'] && (
                                <p style={{color: 'red'}}>{this.state[field + 'Message']}</p>
                            )
                        }
                    </div>
                )
            }
        }

        render() {
            return (
                <Comp 
                    {...this.props}
                    getFieldDec={this.getFieldDec}
                    validateFields={this.validateFields}
                ></Comp>
            )
        }
    }
}

@JFormCreate
class JFormTest extends React.Component {

    onLogin = () => {
        this.props.validateFields((isValid, data) => {
            if(isValid) {
                console.log('登录');
                
            } else {
                alert('校验失败')
            }
        })
    }

    render() {
        const { getFieldDec } = this.props
        return (
            <div>
                {getFieldDec('username', {
                    rules: [{required: true, message: '请输入用户名'}]
                })(
                    <Input />
                )}
                {getFieldDec('password', {
                    rules: [{required: true, message: '请输入密码'}]
                })(
                    <Input type="password" />
                )}
                <Button onClick={this.onLogin}>登录</Button>
            </div>
        )
    }
}
export default JFormTest