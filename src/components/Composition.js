import React from 'react'

function Dialog(props) {
    console.log(props.children);
    const message = {
        foo: {title: "foo", content: "foo~"},
        bar: {title: "bar", content: "bar~"},
    }
    const {def, footer} = props.children(message[props.msg])
    
    return <div style={{border: "1px solid blue"}}>
        {def}
        <div>{footer}</div>
    </div>
}

function RadioGroup(props) {
    return (
        <div>
            {React.Children.map(props.children, radio => {
                // 要修改虚拟dom， 只能克隆它
                // 参数1是克隆对象，参数2是设置的属性
                return React.cloneElement(radio, {name: props.name})
                // return <Item name={props.name}/>
            })}
        </div>
    )
}

function Radio({children, ...abc}) {
    return (
        <label>
            <input type="radio" {...abc}></input>{children}
        </label>
        )
}


export default function Composition() {
    return (
        <div>
            <Dialog msg="foo">
                {({title, content}) => ({
                    def: (
                        <>
                            <h1>{title}</h1>
                            <p>fdsahgjfdsahgfkjhdsafhsdakj</p>
                        </>
                        ),
                    footer: <button onClick={() => alert('react真好')}>确定</button>
                })}
            </Dialog> 

            <RadioGroup name="mvvm">
                <Radio value="vue">vue</Radio>
                <Radio value="react">react</Radio>
                <Radio value="angular">angular</Radio>
            </RadioGroup>
        </div>
    )
}
