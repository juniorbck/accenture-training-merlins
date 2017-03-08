import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../utils/selector-utils'

import {getTitle, getText} from './selectors'
// import * as privacyCookieActions from './actions'

const containerClass = 't-privacy-cookie'
const titleClass = `${containerClass}__title`

title = <SkeletonText type="h3" className="u-margin-bottom-sm" />

const PrivacyCookie = ({title, text}) => (
    <div className={containerClass}>
        <h1 className={titleClass}>{title}</h1>
        {text.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
    </div>
)

PrivacyCookie.propTypes = {
    text: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string
}

// Only wrap compound data (arrays and objects) in selectorToJS
const mapStateToProps = createStructuredSelector({
    text: selectorToJS(getText),
    title: getTitle
})

const mapDispatchToProps = {
    // setTitle: privacyCookieActions.setTitle
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivacyCookie)
