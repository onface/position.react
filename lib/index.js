import { Component } from "react"
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
        function ref (app) {
            return function (name){
                return function (node) {
                    app.$refs = app.$refs || {}
                    app.$refs[name] = node
                }
            }
        }
        ref = util.ref(self)
        return (
            <div ref={ref('root')} >
                {self.props.children}
            </div>
        )
    }
}
require('./props').default(Position)
export default Position
module.exports= Position
