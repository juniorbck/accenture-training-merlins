import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../utils/selector-utils'

import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'
import List from 'progressive-web-sdk/dist/components/list'

import {getTitle, getText, getDescription, getHasProducts, getStartersKitProducts} from './selectors'
import ProductTile from '../product-list/partials/product-tile'
// import * as startersKitActions from './actions'

const containerClass = 't-starters-kit'
const titleClass = `${containerClass}__title`

const StartersKit = ({description, hasProducts, products, title, text}) => (
    <div className={containerClass}>
        { title
            ? <h1 className={titleClass}>{title}</h1>
            : <SkeletonText lines={1} type="h1" width="100px" />
        }
        {description
            ? <Accordion>
                <AccordionItem header="Description">
                    {description}
                </AccordionItem>
            </Accordion>
            : <SkeletonBlock height="100px" />
        }
        <br />
            <div>
                {hasProducts ?
                    <ResultList products={products} />
                        :
                    <SkeletonBlock height="50px" />
                }
            </div>
    </div>
)

StartersKit.propTypes = {
    description: PropTypes.string,
    hasProducts: PropTypes.bool,
    products: PropTypes.array,
    text: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string
}

const ResultList = ({products}) => (
    <List className="c--borderless">
        {products.map((product, idx) => ( <ProductTile key={idx} {...product} /> ))}
    </List>
)

ResultList.propTypes = {
    products: PropTypes.array
}

// Only wrap compound data (arrays and objects) in selectorToJS
const mapStateToProps = createStructuredSelector({
     description: getDescription,
     hasProducts: getHasProducts,
     products: selectorToJS(getStartersKitProducts),
     title: getTitle
})

const mapDispatchToProps = {
    // setTitle: startersKitActions.setTitle
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartersKit)
