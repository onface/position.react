import { Component } from "react"
import ReactDOM from "react-dom"
import extend from "extend"
import util from "util.react"
require('./index.css')
import Pos from "face-position"
class Position extends Component {
    constructor (props) {
        super(props)
        const self = this
        this.state = {}
    }
    position = () => {
        const self = this
        requestAnimationFrame(function () {
            Pos({
                el: self.$refs.root,
                target: self.props.target(),
                onPosition: self.props.onPosition,
                baseOn: self.props.baseOn,
                useCssTransform: true
            })
        })

    }
    componentWillUnmount () {
        const self = this
        switch (self.props.trigger) {
            case false:
            break
            case 'onResize':
                window.removeEventListener('resize', self.position)
            break
            case 'requestAnimationFrame':

            break
        }
    }
    componentDidUpdate () {
        const self = this
        if (self.props.trigger === 'componentDidUpdate') {
            self.position()
        }
    }
    componentDidMount () {
        const self = this
        if (self.props.trigger === 'onResize') {
            window.addEventListener('resize', self.position)
        }
        self.position()
        requestAnimationFrame(function callee() {
            if (self.props.trigger === 'requestAnimationFrame') {
                self.position()
            }
            requestAnimationFrame(callee)
        })
    }
    render() {
        const self = this
        var rootClassName = [
            self.props.prefixClassName,
            util.themes(self.props),
        ].join(' ')
        const ref = util.ref(self)
        return ReactDOM.createPortal(
            (
                <div ref={ref('root')} >
                    {self.props.children}
                </div>
            ),
            document.body
        )
    }
}
require('./props').default(Position)
export default Position
module.exports= Position
