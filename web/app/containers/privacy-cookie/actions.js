import {createAction} from '../../utils/utils'
import privacyParser from './parsers/privacy-cookie'

export const receiveData = createAction('Receive PrivacyCookie data')
// HERE ADDED 
export const process = ({payload: {$, $response}}) => receiveData(privacyParser($, $response))



// This action will change the `title` key in the local private state
export const changeTitle = createAction('Change PrivacyCookie title', 'title')
