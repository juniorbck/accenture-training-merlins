import {handleActions} from 'redux-actions'
import {fromJS, List} from 'immutable'
import {mergePayloadForActions, mergePayload} from '../../utils/reducer-utils'
import {urlToPathKey} from '../../utils/utils'

import * as appActions from './actions'
import {CURRENT_URL, FETCHED_PATHS} from './constants'

const initialState = fromJS({
    [CURRENT_URL]: window.location.href,
    notifications: [],
    fetchError: null,
    [FETCHED_PATHS]: {}
})

export default handleActions({
    ...mergePayloadForActions(appActions.receiveData),
    [appActions.onRouteChanged]: (state, {payload: {currentURL}}) => {
        return state.set(CURRENT_URL, currentURL)
    },
    [appActions.onPageReceived]: (state, {payload: {url}}) => {
        const path = urlToPathKey(url)
        return state.setIn([FETCHED_PATHS, path], true)
    },
    [appActions.addNotification]: (state, {payload}) => {
        return state.update('notifications', (notifications) => {
            // Don't allow duplicate notifications to be added
            return notifications.every(({id}) => id !== payload.id) ? notifications.push(payload) : notifications
        })
    },
    [appActions.removeNotification]: (state, {payload}) => {
        return state.update('notifications', (notifications) => {
            return notifications.filterNot(({id}) => id === payload)
        })
    },
    [appActions.removeAllNotifications]: (state) => {
        return state.set('notifications', List())
    },
    [appActions.setPageFetchError]: mergePayload,
    [appActions.clearPageFetchError]: (state) => {
        return state.set('fetchError', null)
    }
}, initialState)
