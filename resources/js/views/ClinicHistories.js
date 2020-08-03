import React from 'react';
import q from 'query-string'
import { request } from '../utils';
import ReactTable from 'react-table'
import InputTextFormik from '../components/InputTextFormik';
import InputEasyImageFormik from '../components/InputEasyImageFormik';
import InputTextAreaFormik from '../components/InputTextAreaFormik';
import * as moment from 'moment';
import { connect, withFormik, Form, Formik } from 'formik';
import Modal from '../components/Modal';
import InputDateFormik from '../components/InputDateFormik';
import SelectFormik from '../components/SelectFormik';
import AsyncSelectFormik from '../components/AsyncSelectFormik';
let values = {}


export default class ClinicHistories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      totalPages: 1,
      perPage: 15,
      currentPage: 1,
      currentView: 'histories',
    }

  }

  getBudget = () => {
    this.setState({
      currentView:'budget'
    })
  }
  getClinicHistory = (data) => {
    let page = '';
    if (data) {
      page = q.stringify({
        page: data.page + 1
      })
    } else {
      page = q.stringify({
        page: this.state.currentPage
      })
    }

    request.get(`/api/clinic_histories?${page}`).then((data3) => {
      this.setState({
        list: data3.data,
        perPage: data3.per_page,
        currentPage: data3.current_page,
        totalPages: data3.last_page
      })
    })

  }

  add = () => {
    this.setState({
      currentView: 'history',
      addHistory:true,
    })
  }

  refresh = () => {

  }
  export = () => {

  }
  print = () => {
    window.print();
  }
  render() {
    return (
      <Modal>
        <Formik
          initialValues={{...this.props.initialValues,
            budgetItems: []
          }}
          //validationSchema={formSchema}
          enableReinitialize
          onSubmit={(values, actions) => {
            if(this.state.currentView === 'history'){ 
              if (this.state.addHistory) {
                request
                  .post(`/api/clinic_histories`, {
                    date: values.date && values.date[0] ? values.date[0]:'',
                    consulting_room: values.consulting_room.id,
                    treatment:values.treatment,
                    doctor_id:values.doctor_id.id,
                    patient_id:this.props.initialValues.id,
                    observations:values.observations,
                  })
                  .then(response => {
                    this.setState({
                      currentView:'budget'
                    })
                    //
                  }).catch((er) => {
                    //actions.setErrors(er.response.data.errors)
                  })
              } else {
                debugger
              }
            } else if (this.state.currentView === 'budget'){
              var form_data = new FormData();
              form_data.append("name", values.name)
              form_data.append("last_name", values.last_name)
              form_data.append("document_number", values.document_number)
              form_data.append("phone_number", values.phone_number)
              form_data.append("email", values.email)
              form_data.append("avatar",values.avatar)
              form_data.append("birthdate", values.birthdate)
              form_data.append("in_charge_name", values.in_charge_name)
              form_data.append("diseases", JSON.stringify(values.diseases))
              if (this.state.addForm) {
                request
                  .post(`/api/${this.state.createResponse.slug}`, form_data, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  })
                  .then(response => {
                    this.refresh()
                    this.close()
                    //
                  }).catch((er) => {
                    //actions.setErrors(er.response.data.errors)
                  })
              } else {
                form_data.append("_method", "PUT")
                request
                  .post(`/api/${this.state.createResponse.slug}/${this.state.initialValues.id}`,
                    form_data, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  })
                  .then(response => {
                    this.refresh()
                    this.close()
                  }).catch((er) => {
                  })
              }
            }
          }}
        >

          {({ errors, touched, values ,setFieldValue }) => (
            <>
              <Form className="modal-form">
                <div className="custom-wrapper large">
                  <div className="close-icon" onClick={this.props.onClose}>x</div>
                  <div className="header justify-content-center">
                    Historia Clinica
                  </div>
                  <div className="row-input custom-wrap-patient">
                    <div>
                      <InputEasyImageFormik
                        name="avatar"
                        disabled
                      />
                    </div>
                    <div>
                      <div className="row-input">
                        <InputTextFormik
                          name="name"
                          disabled
                          placeholder="Nombre de Paciente"
                        />
                        <InputTextFormik
                          name="last_name"
                          disabled
                          placeholder="Apellido de Paciente"
                        />
                        <InputTextFormik
                          value={values.birthdate && values.birthdate[0] && moment(values.birthdate[0]).isValid() ? moment().year() - moment(values.birthdate[0]).year() : ""}
                          disabled
                          valueChange
                          placeholder="Edad"
                        />
                      </div>
                      <div className="row-input">
                        <InputTextFormik
                          name="document_number"
                          disabled
                          placeholder="DNI"
                        />
                        <InputTextFormik
                          name="phone_number"
                          disabled
                          placeholder="Nro. Celular"
                        />
                      </div>
                    </div>
                  </div>

                  {
                    this.state.currentView === 'histories' &&
                    <>
                      <div>
                        <ReactTable
                          getTdProps={(state, rowInfo, column, instance) => {
                            return {
                              onClick: (e, handleOriginal) => {
                                if (rowInfo && rowInfo.original) {
                                  this.showDetail(rowInfo.original)
                                }
                                if (handleOriginal) {
                                  handleOriginal()
                                }
                              }
                            }
                          }}
                          pageSizeOptions={[15]}
                          defaultPageSize={15}
                          manual={true}// Forces table not to paginate or sort automatically, so we can handle it server-side
                          onFetchData={this.getClinicHistory} // Request new data when things change
                          data={this.state.list}
                          pages={this.state.totalPages} // Display the total number of pages
                          // loading={loading} // Display the loading overlay when we need it
                          columns={[
                            {
                              Header: 'FECHA',
                              accessor: 'date', // String-based value accessors!
                            },
                            {
                              Header: 'CONSULTORIO',
                              accessor: 'consulting_room', // String-based value accessors!
                            },
                            {
                              Header: 'DOCTOR',
                              accessor: 'doctor_id', // String-based value accessors!
                            },
                            {
                              Header: 'TRATAMIENTO',
                              accessor: 'treatment', // String-based value accessors!
                            },
                            {
                              Header: 'PRESUPUESTO',
                              accessor: 'doctor', // String-based value accessors!
                            },
                            {
                              Header: 'OBS',
                              accessor: 'observations', // String-based value accessors!
                            },
                          ]}
                        />
                      </div>
                      <button className="button mx-1" type="button" onClick={this.add}>+</button>
                      <div className="group-buttons">
                        <button className="button mx-1" type="button" onClick={this.refresh}>Actualizar</button>
                        <button className="button mx-1" type="button" onClick={this.export} type="button">Exportar</button>
                        <button className="button mx-1" type="button" onClick={this.print} type="button">Imprimir</button>
                        {/* <button className="button mx-1" onClick={this.delete} type="button">Eliminar</button> */}
                      </div>
                    </>
                  }
                  {
                    this.state.currentView === 'history' &&
                    <>
                    
                      <InputDateFormik
                        name="date"
                        placeholder="Fecha"
                      />
                      <AsyncSelectFormik
                        name="consulting_room"
                        slug="clinic_histories"
                        relation="clinic_history_belonsto_consulting_room_relationship"
                        placeholder="Seleccionar Consultorio"
                      />
                      
                      <SelectFormik
                        name="treatment"
                        options={[{
                          label:"anything",
                          value:'anything'
                        }]}
                        placeholder="Seleccionar Tratamiento"
                      />
                      <AsyncSelectFormik
                        name="doctor_id"
                        slug="clinic_histories"
                        relation="clinic_history_belonsto_doctor_relationship"
                        placeholder="Seleccionar Doctor"
                      />
                      <InputTextAreaFormik
                        name="observations"
                        placeholder="Observaciones"
                      />
                      <div className="group-buttons">
                        {/* <button className="button mx-1" type="submit">
                          Editar
                        </button> */}
                        {
                          this.state.addHistory ?
                            <button className="button mx-1" type="submit">Generar</button>
                            :
                            <>
                              <button className="button mx-1" type="submit">Editar</button>
                              <button 
                                className="button mx-1" 
                                type="button"
                                onClick={this.getBudget}
                              >
                                Generar Presupuesto
                              </button>
                            </>
                        }
                        
                      </div>

                    </>
                  }

                  {
                    this.state.currentView === 'budget' &&
                    <>
                      <div className="custom-table-basic">
                        <div className="header custom-row">
                          <div>CANT</div>
                          <div>TRATAMIENTO</div>
                          <div>PRECIO</div>
                        </div>
                        <div className="body">
                          {values.budgetItems.map((budgetItem) => {
                            return <div className="custom-row">
                              <div>
                                <input />
                              </div>
                              <div>
                                <input />
                              </div>
                              <div>
                                <input />
                              </div>
                            </div>
                          })}
                        </div>
                      </div>
                      <div onClick={() => {
                        let arr = [...values.budgetItems]
                        arr.push({})
                        setFieldValue('budgetItems',arr)
                      }}>+</div>
                      <div>

                        <input placeholder="Total"/>
                        <input placeholder="Total"/>
                        <input placeholder="A Cuenta"/>
                        <input placeholder="Saldo"/>
                        <button 
                          className="button mx-1" 
                          type="button"
                          onClick={this.getBudget}
                        >
                          Guardar
                        </button>
                        <button 
                          className="button mx-1" 
                          type="button"
                          onClick={this.print}
                        >
                          Imprimir
                        </button>
                      </div>
                    </>
                  }
                </div>
              </Form>
            </>
          )}
        </Formik>
      </Modal>
    );
  }

  addRow = () => {

  }
}
