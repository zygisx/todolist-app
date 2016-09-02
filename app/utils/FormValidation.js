
/**
 * Simple but useful form validation base class.
 * To use this you should:
 *  - extend FormValidation class
 *  - implement validate method - fill super.errors according to validation rules
 *  - call validate whenever you want to do validation
 *  - access this.errors to see
 */
class FormValidation {
  constructor() {
    this._reset();
  }

  validate = (formFields) => {
    this._reset();
    return this.errors;
  }

  hasErrors = () => {
    let nonEmptyErrors = _filter(_.values(this.errors), _.isEmpty)
    return !_.isEmpty(nonEmptyErrors);
  }

  _reset = () =>  {
    this.errors = {};
  }
}
