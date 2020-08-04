import React from 'react';
import q from 'query-string'
import { request } from '../utils';
import ReactTable from 'react-table'
import InputTextFormik from '../components/InputTextFormik';
import InputEasyImageFormik from '../components/InputEasyImageFormik';
import InputTextAreaFormik from '../components/InputTextAreaFormik';
import * as moment from 'moment';
import { connect, withFormik, Form, Formik, Field, FieldArray } from 'formik';
import Modal from '../components/Modal';
import InputDateFormik from '../components/InputDateFormik';
import SelectFormik from '../components/SelectFormik';
import AsyncSelectFormik from '../components/AsyncSelectFormik';
import BigNumber from 'bignumber.js';
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
      budget: {
        budgetItems: []
      }
    }

  }

  getBudget = () => {
    this.setState({
      currentView: 'budget'
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
      addHistory: true,
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
        <>
          <div className="modal-form">
            <div className="custom-wrapper large">
              <div className="close-icon" onClick={this.props.onClose}>x</div>
              <Formik
                initialValues={{
                  ...this.props.initialValues,
                }}
                //validationSchema={formSchema}
                enableReinitialize
              >
                {({ errors, touched, values, }) => (
                  <Form >
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
                  </Form>
                )}
              </Formik>

              {
                this.state.currentView === 'histories' &&
                <>
                  <div>
                    <ReactTable
                      getTdProps={(state, rowInfo, column, instance) => {
                        return {
                          onClick: (e, handleOriginal) => {
                            if (rowInfo && rowInfo.original) {
                              this.setState({
                                currentView: 'history',
                                history:{
                                  ...rowInfo.original,
                                },
                                addHistory:false
                              })
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
                          accessor: 'consulting_room_display_name', // String-based value accessors!
                        },
                        {
                          Header: 'DOCTOR',
                          accessor: 'doctor_id_display_name', // String-based value accessors!
                        },
                        {
                          Header: 'TRATAMIENTO',
                          accessor: 'treatment', // String-based value accessors!
                        },
                        {
                          Header: 'PRESUPUESTO',
                          accessor: 'doctor_display_name', // String-based value accessors!
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
                  <Formik
                    initialValues={this.state.history}
                    //validationSchema={formSchema}
                    enableReinitialize
                    onSubmit={(values, actions) => {
                      if (this.state.addHistory) {
                        request
                          .post(`/api/clinic_histories`, {
                            date: typeof(values.date) === 'object' && values.date[0] ? values.date[0] : '',
                            consulting_room: values.consulting_room.id,
                            treatment: values.treatment,
                            doctor_id: values.doctor_id.id,
                            patient_id: this.props.initialValues.id,
                            observations: values.observations,
                          })
                          .then(response => {
                            this.setState({
                              currentView: 'budget'
                            })
                            //
                          }).catch((er) => {
                            //actions.setErrors(er.response.data.errors)
                          })
                      } else {
                        request
                          .put(`/api/clinic_histories/${this.state.history.id}`, {
                            date:  typeof(values.date) === 'object' && values.date[0] ? values.date[0] :  values.date,
                            consulting_room: values.consulting_room.id || values.consulting_room,
                            treatment: values.treatment,
                            doctor_id: values.doctor_id.id ||  values.doctor_id,
                            patient_id: this.props.initialValues.id,
                            observations: values.observations,
                          })
                          .then(response => {
                            this.setState({
                              currentView: 'histories'
                            }, ()=> {
                              this.refresh();
                            })
                            //
                          }).catch((er) => {
                            //actions.setErrors(er.response.data.errors)
                          })
                      }
                    }}
                  >
                    {({ errors, touched, values, }) => (
                      <Form >
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
                            label: "anything",
                            value: 'anything'
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
                      </Form>
                    )}
                  </Formik>
                </>
              }

              {
                this.state.currentView === 'budget' &&
                <>
                  <Formik
                    initialValues={this.state.budget}
                    //validationSchema={formSchema}
                    enableReinitialize
                    onSubmit={(values, actions) => {
                      debugger
                    }}
                  >
                    {({ errors, touched, values, setFieldValue}) => (
                      <Form >
                        
                        <InputDateFormik
                          name="date"
                          placeholder="Fecha"
                          disabled
                        />
                        <AsyncSelectFormik
                          name="consulting_room"
                          slug="clinic_histories"
                          relation="clinic_history_belonsto_consulting_room_relationship"
                          placeholder="Seleccionar Consultorio"
                          disabled
                        />

                        <SelectFormik
                          name="treatment"
                          options={[{
                            label: "anything",
                            value: 'anything'
                          }]}
                          placeholder="Seleccionar Tratamiento"
                          disabled
                        />
                        <AsyncSelectFormik
                          name="doctor_id"
                          slug="clinic_histories"
                          relation="clinic_history_belonsto_doctor_relationship"
                          placeholder="Seleccionar Doctor"
                          disabled
                        />
                        {/* 
                          <InputTextFormik
                            name="code_budget"
                            placeholder="DNI"
                          />
                        <AsyncSelectFormik
                          name="agreement"
                          slug="clinic_histories"
                          relation="clinic_history_belonsto_doctor_relationship"
                          placeholder="Seleccionar Doctor"
                        /> */}
            {/* $table->integer('clinic_history');
            $table->integer('agreement');
            $table->string('code_budget');
            $table->string('total');
            $table->string('balance');
            $table->string('partial_payment'); */}
                        <div className="custom-table-basic">
                          <div className="header custom-row">
                            <div>CANT</div>
                            <div>TRATAMIENTO</div>
                            <div>PRECIO</div>
                          </div>
                          <div className="body">
                            <FieldArray
                              name="budgetItems"
                              render={arrayHelpers => (
                                <div>
                                  {values.budgetItems && values.budgetItems.length > 0 ? (
                                    values.budgetItems.map((budgetItem, index) => (
                                      <div key={index} className="custom-row">
                                        <div>
                                          <Field name={`budgetItems.${index}.quantity`} />
                                          {/* <input 
                                            type="numeric"
                                            className="custom-input-table" 
                                          /> */}
                                        </div>
                                        <div>
                                          <Field name={`budgetItems.${index}.detail`} />
                                          {/* <input className="custom-input-table" /> */}
                                        </div>
                                        <div>
                                          {/* <input className="custom-input-table" /> */}
                                          <Field name={`budgetItems.${index}.price`} />
                                          <button
                                            type="button"
                                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                          >
                                            -
                                          </button>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    null
                                  )}
                                  
                                  <div onClick={() => {
                                    let arr = [...values.budgetItems]
                                    arr.push({})
                                    setFieldValue('budgetItems', arr)
                                  }}>+</div>
                                </div>
                              )}
                            />
                          </div>
                        </div>
                        <InputTextFormik
                          valueChange
                          value={
                            values.budgetItems.reduce((prev,current) => {
                              let p = new BigNumber(current.price)
                              let q = new BigNumber(current.quantity)
                              return prev.plus(p.multipliedBy(q))
                            },new BigNumber(0)).toFormat() 
                          }
                          placeholder="Total"
                        />
                        <div>
                          <InputTextFormik
                            name="total"
                            placeholder="Total"
                          />
                          <InputTextFormik
                            name="partial_payment"
                            placeholder="A cuenta"
                          />
                          <InputTextFormik
                            name="balance"
                            placeholder="Saldo"
                          />
                          <button
                            className="button mx-1"
                            type="submit"
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
                      </Form>
                    )}
                  </Formik>
                </>
              }
            </div>
          </div>
        </>
      </Modal >
    );
  }

  addRow = () => {

  }
}
