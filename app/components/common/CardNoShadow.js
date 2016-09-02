import React from 'react'
import Card from 'material-ui/Card'

/**
 * Component overrides material-ui/Card
 * It removes styles that are changed dynamically via css
 */

const customStyles = {
  'boxShadow': false,
  'backgroundColor': false
}

const CardNoShadow = (props) => (
  <Card
    style={customStyles}
    {...props}
  />
)

module.exports = CardNoShadow;
