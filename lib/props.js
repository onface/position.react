import p from 'prop-types'
export default function (app) {
    app.defaultProps = {
        prefixClassName: 'face-position',
        themes: ''
    }
    app.propTypes = {
        prefixClassName: p.string,
        themes: p.string
    }
}
