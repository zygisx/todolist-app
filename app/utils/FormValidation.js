import _ from 'lodash'
/**
 * Simple form validation base class.
 * To use this you should:
 *  - extend FormValidation class
 *  - pass template with empty error messages
 *  - implement validateInternal method - fill this.errors according to form validation rules
 *  - call validate whenever you want to do validation
 *  - access super.errors to see error messages
 *  - access super.hasErrors() to see if any errors present
 */
class FormValidation {
  constructor (template) {
    this.template = template
    this._reset()
  }

  validate (formFields) {
    this._reset()
    this.validateInternal(formFields)
    return this.errors
  }

  validateInternal (formFields) {
    throw Error('This method should be overrided')
  }

  hasErrors () {
    let nonEmptyErrors = _.filter(_.values(this.errors), _.negate(_.isEmpty))
    return !_.isEmpty(nonEmptyErrors)
  }

  _reset () {
    this.errors = _.cloneDeep(this.template)
  }
}

export default FormValidation
