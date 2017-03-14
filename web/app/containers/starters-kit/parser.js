import {getTextFrom} from '../../utils/parser-utils'

export const startersKitParser = ($, $html) => {
    return {
        title: getTextFrom($html, 'title'),
        description: getTextFrom($html, '#text')
    }
}