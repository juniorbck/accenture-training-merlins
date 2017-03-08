import {getTextFrom} from '../../../utils/parser-utils'

const privacyParser = ($, $html) => {
    const pageTitle = getTextFrom($html, '.page-title')

    console.log(`HERE HERE HEERE ${pageTitle}`)
    return {
        title: pageTitle
    }

}

export default privacyParser
