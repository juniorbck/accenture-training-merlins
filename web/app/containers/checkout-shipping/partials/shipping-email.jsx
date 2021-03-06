import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import * as ReduxForm from 'redux-form'

import {checkCustomerEmail, submitSignIn} from '../actions'
import {getCustomerEmailRecognized, getEmailError} from '../selectors'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import Icon from 'progressive-web-sdk/dist/components/icon'
import Link from 'progressive-web-sdk/dist/components/link'


const ShippingEmail = ({submitSignIn, customerEmailRecognized, checkCustomerEmail}) => {
    const passwordHint = (
        <Link className="u-color-brand" href="/customer/account/forgotpassword/">
            Forgot password
        </Link>
    )

    return (
        <div>
            <div className="t-checkout-shipping__email-title" />

            <div className="u-padding-md u-border-light-top u-border-light-bottom u-bg-color-neutral-00">

                <FieldRow>
                    <ReduxForm.Field component={Field} className="pw--overlayed-hint" name="username" label="Email order confirmation to">
                        <input type="email" noValidate onBlur={checkCustomerEmail} />
                    </ReduxForm.Field>
                </FieldRow>

                {customerEmailRecognized &&
                    <FieldRow>
                        <ReduxForm.Field component={Field} name="password" label="Password" hint={passwordHint}>
                            <input type="password" noValidate />
                        </ReduxForm.Field>
                    </FieldRow>
                }

                {customerEmailRecognized &&
                    <FieldRow>
                        <Button
                            className="c--secondary u-width-full u-text-uppercase"
                            onClick={submitSignIn}>
                            <Icon name="user" className="u-margin-end" />
                            Sign In
                        </Button>
                    </FieldRow>
                }
            </div>
        </div>
    )
}

ShippingEmail.propTypes = {
    /**
    * Checks if the users email address has an account associated with it
    */
    checkCustomerEmail: React.PropTypes.func,
    /**
    * True if the users email address has an account associated with it
    */
    customerEmailRecognized: React.PropTypes.bool,
    /**
    * Submits the sign in form data
    */
    submitSignIn: React.PropTypes.func
}

const mapStateToProps = createStructuredSelector({
    customerEmailRecognized: getCustomerEmailRecognized,
    emailError: getEmailError
})

const mapDispatchToProps = {
    submitSignIn,
    checkCustomerEmail
}


export default connect(mapStateToProps, mapDispatchToProps)(ShippingEmail)
