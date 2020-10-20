import React from 'react';
import {Calendar as Cal, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import Toolbar from '../components/ToolBar';
import { Formik, Form, Field } from 'formik';
import DateTimePicker from '../components/DateTimePicker';
import q from 'query-string'
import { request, reasons } from '../utils';
import specialities from '../assets/data/specialities.json'
import Input from '../components/Input';
import * as Yup from 'yup'
import Row from '../components/Row';
import SelectFormik from '../components/SelectFormik';
import 'moment/locale/es'

const schema = Yup.object().shape({
  start_date:  Yup.date()
    .required('Required'),
  document_number:  Yup.string()
    .required('Required'),
  name:  Yup.string()
    .required('Required'),
  last_name:  Yup.string()
    .required('Required'),
});
const localizer = momentLocalizer(moment)
export default class Calendar extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      showForm:false,
      createFormFields: [],
      events:[],
      appointment: {
        reason:'',
        speciality:'',
      }
    }
    request.get('/api/appointments/create').then((response) => {
      this.setState({
        createFormFields:response.dataType.addRows
      })
      //response.dataType.addRows
      //debugger
    })
    
  }

  show = () => {
    this.setState({
      showForm:true,
      addForm:true,
      appointment: {}
    })
  }
  //http://localhost:3000/api/users?key=document_number&filter=equals&s=72604076

  close = () => {
    this.setState({
      showForm: false
    })
  }

  componentDidMount() {
    this.onRangeChange({
      start:moment().startOf('month').startOf('week'),
      end:moment().endOf('month').endOf('week'),
    })
  }

  onRangeChange = (dates) => {
    if(!dates) {
      dates = this.state.dates
    }
    this.setState({
      events: [],
      dates
    })
    let dataToSend = '';
    let start = moment(dates.start).add(-(moment().utcOffset()), 'm')
    let end = moment(dates.end).add(-(moment().utcOffset()), 'm') //moment.utc(dates.end.format('YYYY-MM-DD'))

    let data = `(
      ${start.format('YYYY-MM')}
      |
      ${end.format('YYYY-MM')}
    )`
    const arrayData = [];
    for (let index = start; index <= end; index = index.add(1,'month').startOf('month')) {
      const element = index;
      let dataToSend2 = q.stringify({
        s: element.format('YYYY-MM'),
        key: 'start_date',
        filter: 'contains',
      })
      arrayData.push(
        request.get(`/api/appointments?${dataToSend2}`)
      );
    }

    Promise.all(arrayData).then((responses) => {
      let events = []
      for (let index = 0; index < responses.length; index++) {
        const event = responses[index];
        events.push(...event)
      }
      this.setState({
        events: events.map((event) => {
          return {
            title: `${moment(event.start_date).format("HH:mm")} ${event.patient_id.name} ${event.patient_id.last_name} ${event.reason}`,
            // Hora minutos y el nombre
            start: moment(event.start_date).toDate(),
            end: moment(event.start_date).clone().add(1,'hour').toDate(),
            //allDay?: boolean
            //resource?: any,
            ...event,
            start_date: [moment(event.start_date).toDate()],
          }
        }),
      })
    })
  }

  onSelectEvent = (event,synth) => {
    let query = q.stringify({
      key:"id",
      filter:"equals",
      s:event.patient_id
      //s:values.document_number
    })
    this.setState({
      appointment: {
        ...event,
        patient_id:event.patient_id.id,
        name:event.patient_id.name,
        last_name:event.patient_id.last_name,
        phone_number:event.patient_id.phone_number,
        document_number:event.patient_id.document_number,
        email:event.patient_id.email,
      },
      showForm:true,
      addForm:false
    })
  }

  render() {
    
    return (<div>
      <Cal 
        ref={(cal) => {
          this.cal = cal;
        }} 
        localizer={localizer}
        events={this.state.events}
        onRangeChange={this.onRangeChange}
        onSelectEvent={this.onSelectEvent}
        startAccessor="start"
        endAccessor="end"
        culture='es'
        style={{ height: 500 }}
        messages={{
          allDay: 'Todo el dia',
          previous: 'Anterior',
          next: 'Siguiente',
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Dia',
          agenda: 'Agenda',
          date: 'Fecha',
          time: 'Hora',
          event: 'Evento', // Or anything you want
          showMore: total => `+ ${total} `
        }}
        components={{
          toolbar:Toolbar({
            onClickButton:() => {
              this.show()
            }
          })
        }}
        elementProps={{d:2}}
        views={['month', 'week', 'day']}
        
        formats={ {
          //timeGutterFormat: 'HH:mm',
          /* agendaTimeFormat:'HH:ss',
          agendaHeaderFormat: ({start, end}) => {
              return (moment.utc(start).format('DD/MM/YYYY') + ' - ' + moment.utc(end).format('DD/MM/YYYY') );
          },
          eventTimeRangeFormat:'HH:ss' */
          /* dateFormat: 'dd',
          dayFormat: (date, , localizer) =>
            localizer.format(date, 'DDD', culture),
        
          dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
            localizer.format(start, { date: 'short' }, culture) + ' — ' +
            localizer.format(end, { date: 'short' }, culture) */
        }}
      />
      {
        this.state.showForm &&
        <div className="modal visible center">
          <Formik
            initialValues={this.state.appointment}
            validationSchema={schema}
            enableReinitialize
            onSubmit={(values,  actions) => {
              var form_data = new FormData();
              for (let index = 0; index < this.state.createFormFields.length; index++) {
                const element = this.state.createFormFields[index];
                if(element.type === 'image' && values[element.field]  instanceof File ) {
                  form_data.append(element.field,new Blob([values[element.field]]),values[element.field].name );
                } else if(element.type === 'text' ){//typeof values[key] === 'object' ) {
                  form_data.append(element.field,values[element.field]);
                } else if ( element.type === 'relationship') {
                  form_data.append(element.details.column, values[element.details.column]);
                } else if ( element.type === 'date') {
                  //2020-09-22 17:00:00
                  console.log(moment(values[element.field][0]).utc().format("YYYY-MM-DD HH:mm:ss"));
                  form_data.append(element.field,moment(values[element.field][0]).format("YYYY-MM-DD HH:mm:ss"));
                } else {
                  form_data.append(element.field,values[element.field]);

                }
              }

              new Promise((resolve) => {
                let query = q.stringify({
                  key:"document_number",
                  filter:"equals",
                  s:values.document_number
                  //s:values.document_number
                })
                request.get(`/api/patients?${query}`).then(({data}) => {
                  if(data.length>0) {
                    form_data.set('patient_id',data[0].id)
                    resolve();
                  } else {
                    var form_data2 = new FormData();
                    form_data2.append("name",values.name);
                    form_data2.append("last_name",values.last_name);
                    form_data2.append("document_number",values.document_number);
                    form_data2.append("phone_number",values.phone_number);
                    form_data2.append("email",values.email);
                    form_data2.append("in_charge_name","");
                    form_data2.append("state","");
                    form_data2.append("odontograma","");
                    form_data2.append("birthdate","");
                    request
                      .post(`/api/patients`, form_data2,{
                        headers:{
                          'Content-Type': 'multipart/form-data'
                        }
                      })
                      .then(response => {
                        
                        let query = q.stringify({
                          key:"document_number",
                          filter:"equals",
                          s:values.document_number
                          //s:values.document_number
                        })
                        request.get(`/api/patients?${query}`).then(({data}) => {
                          if(data.length>0) {
                            form_data.set('patient_id',data[0].id)
                            resolve();
                          }
                        })
                      }).catch((er) => {
                      })
                  }
                })

              }).then((response2) => {
                if(this.state.addForm) {
                  request
                    .post(`/api/appointments`, form_data,{
                      headers:{
                        'Content-Type': 'multipart/form-data'
                      }
                    })
                    .then(response => {
                      this.onRangeChange()
                      this.close()
                      //
                    }).catch((er) => {
                      //actions.setErrors(er.response.data.errors)
                    })
                } else {
                  form_data.append("_method","PUT");
                  request
                    .post(`/api/appointments/${this.state.appointment.id}`, 
                      form_data,{
                        headers:{
                          'Content-Type': 'multipart/form-data'
                        }
                      })
                    .then(response => {
                      this.onRangeChange()
                      this.close()
                    }).catch((er) => {
                    })
                }
              })
            }}
          >
            {({ errors, touched, values ,...rest }) => (
              
              <Form className="modal-form">
                <div className="custom-wrapper">
                  <div className="close-icon" onClick={this.close}>x</div>
                  {
                    this.state.addForm ?
                    `Nueva cita`
                    :
                    `Editar cita`
                  }
                  <div>
                    <Field
                      name={"start_date"}
                      id={"start_date"}
                      component={DateTimePicker}
                      placeholder={"Fecha y Hora de Inicio"}
                    />
                    <Row>
                      
                      <Field
                        name={"document_number"}
                        id={"document_number"}
                        type={"text"}
                        component={Input}
                        onEnter={(ele) => {
                          ele.stopPropagation()
                          ele.preventDefault()
                          let query = q.stringify({
                            key:"document_number",
                            filter:"equals",
                            s:values.document_number
                          })
                          request.get(`/api/patients?${query}`).then(({data}) => {
                            if(data.length>0) {
                              rest.setFieldValue('patient_id',data[0].id)
                              rest.setFieldValue('name',data[0].name)
                              rest.setFieldValue('last_name',data[0].last_name)
                              rest.setFieldValue('phone_number',data[0].phone_number)
                              rest.setFieldValue('email',data[0].email)
                            } else {
                              rest.setFieldValue('patient_id',"")
                              rest.setFieldValue('name',"")
                              rest.setFieldValue('last_name',"")
                              rest.setFieldValue('phone_number',"")
                              rest.setFieldValue('email',"")
                            }
                          })
                        }}
                        placeholder={"Número de Documento"}
                      />
                    </Row>
                    <Row>

                      <Field
                        name={"name"}
                        id={"name"}
                        type={"text"}
                        component={Input}
                        placeholder={"Nombres"}
                      />
                      <Field
                        name={"last_name"}
                        id={"last_name"}
                        type={"text"}
                        component={Input}
                        placeholder={"Apellidos"}
                      />
                    </Row>
                    <Row>

                      <Field
                        name={"phone_number"}
                        id={"phone_number"}
                        type={"text"}
                        component={Input}
                        placeholder={"Telefono"}
                      />
                      <Field
                        name={"email"}
                        id={"email"}
                        type={"text"}
                        component={Input}
                        placeholder={"Email"}
                      />
                    </Row>
                    <Row>

                      <Field
                        name={"consulting_room_id"}
                        id={"consulting_room_id"}
                        type={"relationship"}
                        component={Input}
                        slug={"appointments"}
                        placeholder={"Consultorio"}
                        fieldDescription={{
                          field:"appointment_belonsto_consulting_room_relationship"
                        }}
                      />
                      <Field
                        name={"reason"}
                        id={"reason"}
                        type={"text"}
                        options={reasons}
                        component={Input}
                        placeholder={"Motivo"}
                      />
                    </Row>
                    <Row>
                      
                      <SelectFormik
                        name="speciality"
                        options={specialities}
                        placeholder="Especialidad"
                      />
                    </Row>
                  </div>
                  <button className="button" type="submit">Confirmar Cita</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      }
    </div>)
  }
}