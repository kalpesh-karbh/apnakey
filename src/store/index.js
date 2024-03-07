// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import dashboard from 'src/store/apps/dashboard'
import calendar from 'src/store/apps/calendar'
import timeline from 'src/store/apps/timeline'
import activity from 'src/store/apps/activity'
import field from 'src/store/apps/fields'
import event from 'src/store/apps/event'
import invoice from 'src/store/apps/invoice'
import user from 'src/store/apps/user'

import chat from 'src/store/apps/chat'
import email from 'src/store/apps/email'
import permissions from 'src/store/apps/permissions'

export const store = configureStore({
  reducer: {
    user,
    dashboard,
    timeline,
    activity,
    field,
    event,
    chat,
    email,
    invoice,
    calendar,
    permissions
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
