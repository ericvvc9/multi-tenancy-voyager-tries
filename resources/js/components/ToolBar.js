import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'

let navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE',
}
class Toolbar extends React.Component {
  render() {
    let {
      localizer: { messages },
      label,
    } = this.props

    return (
      <div className="rbc-toolbar">
        <div className="rbc-btn-group">
          <div className="btn" onClick={()=> {
            this.props.onClickButton()
          }}>+ CREAR CITA</div>
        </div>

        <div className="rbc-toolbar-label">
          
          <button
            type="button"
            className="header-month"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            {"<"}
          </button>
          <button
            type="button"
            className="header-month"
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            {label}
          </button>
          <button
            type="button"
            className="header-month"
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            {">"}
          </button>
        </div>

        <div className="rbc-btn-group">{this.viewNamesGroup(messages)}</div>
      </div>
    )
  }

  navigate = action => {
    this.props.onNavigate(action)
  }

  view = view => {
    this.props.onView(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return viewNames.map(name => (
        <button
          type="button"
          key={name}
          className={clsx({ 'rbc-active': view === name })}
          onClick={this.view.bind(null, name)}
        >
          {messages[name]}
        </button>
      ))
    }
  }
}

const ToolbarComponent = (propsOn) => (props) => {
  return <Toolbar {...propsOn} {...props} />
}

export default ToolbarComponent;