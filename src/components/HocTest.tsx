import React from 'react'

// function Lesson(props) {
//     return (
//         <div>
//             {props.stage} - {props.title}
//         </div>
//     )
// }

const lessons = [
    { stage: "React", title: "核心API"},
    { stage: "React", title: "組件化1"},
    { stage: "React", title: "組件化2"},
]

const withContent = Comp => props => {
    const content = lessons[props.idx]
    return <Comp {...content} />
}

const withLog = Comp => {
    return class extends React.Component {
        componentDidMount() {
            console.log('didMount', this.props)
        }
        render() {
            return <Comp {...this.props}/>
        }
    }
}

// const LessonWithContent = withLog(withContent(Lesson))
@withLog
@withContent
class Lesson extends React.Component {
    render() {
        return (
            <div>
                {this.props.stage} - {this.props.title}
            </div>
        )
    }
}

export default function HocTest() {
    return <div >
        {[0, 0 ,0].map((item, index) => (<Lesson key={index} idx={index}/>))}
    </div>
}
