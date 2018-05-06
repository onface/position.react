var React = require('react')
var Position = require('position.react')
class Basic extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            height:20
        }
        const self = this
        setTimeout(function callee () {
            self.setState({
                height: Math.random() * 100
            })
            setTimeout(callee, 500)
        }, 500)
    }
    render () {
        const self = this
        return (
            <div ref="root" style={{position: 'relative', border: '1px solid blue'}} >
                <div style={{height: self.state.height}} >abcdef</div>
                <Position
                    target={function() {
                        return self.refs.root
                    }}
                    baseOn={{
                        target: 'left bottom',
                        el: 'left top'
                    }}
                    onPosition={function(position, el, target, offsetParent) {
                        return {
                            x: 0,
                            y: 0
                        }
                    }}
                >
                    <div style={{width: 100, height:100, background: "pink", opacity: .8}} ></div>
                </Position>
            </div>
        )
    }
}
/*ONFACE-DEL*/Basic = require("react-hot-loader").hot(module)(Basic)
module.exports = Basic
