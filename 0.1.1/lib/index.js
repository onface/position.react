import { Component } from "react"
import ReactDOM from "react-dom"
import extend from "extend"
import util from "util.react"
require('./index.css')
import Pos from "face-position"
class Position extends Component {
    constructor (props) {
        super(props)
        util.betterDefaultValue(props)
        const self = this
        this.state = {}
    }
    position = () => {
        const self = this
        Pos({
            el: self.refsRoot,
            target: self.props.target(),
            onPosition: self.props.onPosition,
            baseOn: self.props.baseOn,
            useCssTransform: true
        })
    }
    componentWillUnmount () {
        const self = this
        switch (self.props.trigger) {
            case false:
            break
            case 'onresize':
                window.removeEventListener('resize', self.position)
            break
            case 'requestAnimationFrame':

            break
        }
    }
    componentDidMount () {
        const self = this
        setTimeout(function () {
            requestAnimationFrame(function callee() {
                Pos({
                    el: self.$refs.root,
                    target: self.props.target(),
                    onAlign: self.props.onAlign,
                    baseOn: self.props.baseOn
                })
                requestAnimationFrame(callee)
            })
        }, 0)
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
