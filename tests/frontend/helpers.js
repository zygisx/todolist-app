import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { mount } from 'enzyme'
import moment from 'moment'


const muiTheme = getMuiTheme()

/**
 * Helper that hides meterial design context when mounting components
 */
export function mountMui (reactComponent) {
  return mount(
    reactComponent,
    {
      context: {muiTheme},
      childContextTypes: {muiTheme: React.PropTypes.object}
    }
  )
}

export const today = moment()
export const yesterday = moment().add(-1, 'days')
