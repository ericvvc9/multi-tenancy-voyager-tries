import React from 'react';
import Flatpickr from 'react-flatpickr';
import classnames from 'classnames'

export default class DateTimePicker extends React.Component {
  render(){
    
    const { field = { name: '' }, type = "text" } = this.props;
    let meta;
    if (this.props.form) {
      meta = this.props.form.getFieldMeta(field.name); // <-- the workaround.
    }
    return(
      <div className="input-wrapper" >
        <div>{this.props.placeholder}</div>
        <Flatpickr
          className={
            classnames({
              "input": true,
              "is-invalid": meta && meta.error
            })
          }
          value={field.value}
          options={{
            enableTime: true,
            static: true,
            //noCalendar: true,
            //dateFormat: "H:i",
          }}
          onChange={date => {
            this.props.form.setFieldValue(field.name, date)
            //this.setState({ basic : date });
          }}
        />
      </div>
    )
  }
}