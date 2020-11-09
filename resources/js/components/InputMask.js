import React from 'react';
import AsyncSelect from 'react-select/async'
import classnames from 'classnames'
import { request } from '../utils';
import Inputmask from "inputmask";

export default class InputMask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSelected: false,
      image: ''
    }
  }

  componentDidMount() {
    const im = new Inputmask(this.props.regex);
    im.mask(this.input);
  }

  render() {
    const { field = { name: '' }, type = "text" } = this.props;
    let meta;
    

    if (this.props.form) {
      meta = this.props.form.getFieldMeta(field.name); // <-- the workaround.
    }
    return <>
      <div className="input-wrapper">
        <div>{this.props.placeholder}</div>
        <input
          ref={(input) => this.input = input}
          autoComplete="off"
          className={
            classnames({
              "input": true,
              "is-invalid": meta && meta.error
            })
          }
          name={this.props.name}
          tabIndex={this.props.tabIndex}
          type={type}
          onKeyDown={(ele) => {
            if (ele.key === 'Enter' && this.props.onEnter) {
              this.props.onEnter(ele)
              //alert(ele.value);
            }
          }
          }
          {...field}
          onChange={(e) => {
            this.props.form.setFieldValue(field.name, e.target.value)
          }}
          onBlur={(e) => {
            this.props.form.setFieldTouched(field.name, true)
          }}
          onFocus={() => {
            this.props.form.setFieldTouched(field.name, false)
          }}
          value={field.value}
          placeholder={this.props.placeholder} />
        {meta && meta.error && meta.touched ? (
          <div className="invalid-tooltip mt-25">{meta.error}</div>
        ) : null}
      </div>
    </>
  }
}