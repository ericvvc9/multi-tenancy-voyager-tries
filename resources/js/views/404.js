import React from 'react';
import {Calendar as Cal, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss"
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = momentLocalizer(moment)
export default class PageNotFound extends React.Component{
  render() {
    
    return (<div>
      Pagina no encontrada error 404
    </div>)
  }
}