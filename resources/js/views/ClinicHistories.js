import React from 'react';
import q from 'query-string'
import { request,Utility } from '../utils';
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
import classnames from 'classnames';
import treatments from '../assets/data/treatments.json';

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
      },
      history:{

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
        list: data3.data.map((d) => {
          return {
            ...d,
            date: moment(d.date + "+00:00").format("YYYY-MM-DD HH:mm:ss")
          }
        }),
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
      history: {
        date: new Date()
      }
    })
  }

  refresh = () => {
    this.getClinicHistory()
  }
  export = () => {

  }

  generate = (values) => () =>{
    request.post(`/api/clinic_histories`, {
      date: values.date instanceof Date ? values.date : typeof(values.date) === 'object' && values.date[0] ? values.date[0] : '',
      consulting_room: values.consulting_room ? values.consulting_room.id:'',
      treatment: values.treatment,
      doctor_id: values.doctor_id ? values.doctor_id.id:'',
      patient_id: this.props.initialValues.id,
      observations: values.observations,
    })
    .then(response => {
      this.setState({
        history: response.data,
        addHistory:false
      })
      //
    }).catch((er) => {
      //actions.setErrors(er.response.data.errors)
    })
  }

  goToBudget = () => {
    console.log(this.state)
    debugger
  }

  print = () => {
    window.print();
  }
  render() {
    return (
      <Modal>
        <>
          <div className="modal-form">
            <div className={
              classnames({
                "custom-wrapper":true,
                "large":this.state.currentView === 'histories' 
                //|| this.state.currentView === 'budget'
              })}>
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
                      <div className="mx-2">
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
                            value={
                              typeof(values.birthdate) === 'object' && moment(values.birthdate[0]).isValid() ? moment().year() - moment(values.birthdate[0]).year() : 
                              moment(values.birthdate).isValid() ? moment().year() - moment(values.birthdate).year() :""
                            }
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
                  <div style={{
                    position: 'relative'
                  }}>
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
                      pageSizeOptions={[10]}
                      defaultPageSize={10}
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
                          id: 'c',
                          Header: 'CONSULTORIO',
                          accessor: (row) => {
                            return row.consulting_room ? row.consulting_room.name: ''
                          }
                        },
                        {
                          id: 'doctor',
                          Header: 'DOCTOR',
                          accessor: (row) => {
                            return row.doctor_id ? row.doctor_id.name + ' '+ row.doctor_id.last_name: ''
                          }, // String-based value accessors!
                        },
                        {
                          Header: 'TRATAMIENTO',
                          accessor: 'treatment', // String-based value accessors!
                        },
                        {
                          Header: 'TOTAL',
                          accessor: 'clinic_history_hasone_budget_relationship.total', // String-based value accessors!
                        },
                        {
                          Header: 'Saldo',
                          accessor: 'clinic_history_hasone_budget_relationship.balance', // String-based value accessors!
                        },
                        {
                          Header: 'OBS',
                          accessor: 'observations', // String-based value accessors!
                        },
                      ]}
                    />
                    <button
                      style={{
                        position: 'absolute',
                        bottom: 37,
                        right: 13
                      }}
                       className="button mx-1" type="button" onClick={this.add}>+</button>
                  </div>
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
                            consulting_room: values.consulting_room ? values.consulting_room.id :'',
                            treatment: values.treatment,
                            doctor_id: values.doctor_id ? values.doctor_id.id: '',
                            patient_id: this.props.initialValues.id,
                            observations: values.observations,
                          })
                          .then(response => {
                            this.setState({
                              currentView: 'budget',
                              history: {
                                ...response.data
                              }
                            })
                            //
                          }).catch((er) => {
                            //actions.setErrors(er.response.data.errors)
                          })
                      } else {
                        request
                          .post(`/api/clinic_histories/${this.state.history.id}`, {
                            date:  typeof(values.date) === 'object' && values.date[0] ? values.date[0] :  values.date,
                            consulting_room: values.consulting_room ? values.consulting_room.id:'',
                            treatment: values.treatment,
                            doctor_id: values.doctor_id ? values.doctor_id.id: '',
                            patient_id: this.props.initialValues.id,
                            observations: values.observations,
                            _method: 'PUT'
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
                          options={{
                            enableTime: true,
                            defaultDate: moment().toDate()
                          }}
                          placeholder="Fecha"
                        />
                        <AsyncSelectFormik
                          name="consulting_room"
                          slug="clinic_histories"
                          relation="clinic_history_belonsto_consulting_room_relationship"
                          placeholder="Seleccionar Consultorio"
                          getOptionValue={(option) => {
                            return option.value
                          }}
                          getOptionLabel = {(option) => {
                            return option.name || option.text
                          }}
                        />

                        <SelectFormik
                          name="treatment"
                          options={treatments}
                          placeholder="Seleccionar Tratamiento"
                        />
                        <AsyncSelectFormik
                          name="doctor_id"
                          slug="clinic_histories"
                          relation="clinic_history_belonsto_doctor_relationship"
                          placeholder="Seleccionar Doctor"
                          getOptionValue={(option) => {
                            return option.value
                          }}
                          getOptionLabel = {(option) => {
                            return option.name || (typeof(option.text) === 'object' ? option.text.name + ' ' + option.text.last_name :option.text)
                          }}
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
                              <>
                                <button className="button mx-1" type="button" onClick={this.generate(values)}>Guardar</button>
                                <button className="button mx-1" type="submit">Generar presupuesto</button>
                              </>
                              :
                              <>
                                <button className="button mx-1" type="submit">Guardar</button>
                                {
                                  typeof this.state.history.clinic_history_hasone_budget_relationship !== 'undefined' ?
                                  <button
                                    className="button mx-1"
                                    type="button"
                                    onClick={this.getBudget}
                                  >
                                    Ir a Presupuesto
                                  </button>
                                  :
                                  <button
                                    className="button mx-1"
                                    type="button"
                                    onClick={this.getBudget}
                                  >
                                    Generar Presupuesto
                                  </button>
                                }
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
                    initialValues={
                      this.state.history.clinic_history_hasone_budget_relationship ?
                      {
                        ...this.state.history,
                        ...this.state.history.clinic_history_hasone_budget_relationship,
                        budgetItems: this.state.history.clinic_history_hasone_budget_relationship.budget_items.map((budgetItem) => {
                          return {
                            ...budgetItem
                          }
                        }) ,
                        date:this.state.history.date
                      }
                      :
                      {
                        budgetItems:[],
                        ...this.state.history,
                      }
                    }
                    //validationSchema={formSchema}
                    enableReinitialize
                    onSubmit={(values, actions) => {
                      let path = '/api/budget';
                      let isEdition = false;
                      if(
                        this.state.history && 
                        this.state.history.clinic_history_hasone_budget_relationship &&
                        this.state.history.clinic_history_hasone_budget_relationship.id
                      ){
                        isEdition = true;
                        path =`/api/budget/${this.state.history.clinic_history_hasone_budget_relationship.id}`
                      }
                      let data = {
                        clinic_history:this.state.history.id,
                        agreement:values.agreement ? values.agreement.id: "", 
                        code_budget:values.code_budget,
                        total:values.budgetItems.reduce((prev,current) => {
                          let p = new BigNumber(current.price)
                          let q = new BigNumber(current.quantity)
                          return prev.plus(p.multipliedBy(q))
                        },new BigNumber(0)).toFormat(),
                        balance:values.budgetItems.reduce((prev,current) => {
                          let p = new BigNumber(current.price)
                          let q = new BigNumber(current.quantity)
                          return prev.plus(p.multipliedBy(q))
                        },new BigNumber(0)).minus(new BigNumber(values.partial_payment)).toFormat() ,
                        partial_payment:values.partial_payment,
                        budgetItems: values.budgetItems.map((budgetItem) => {
                          return {
                            ...budgetItem,
                          }
                        }),
                        ...(isEdition ? {_method:"PUT"}:{})
                      }
                      let form_data = Utility.convertModelToFormData(data);
                      request
                        .post(path, form_data)
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
                    }}
                  >
                    {({ errors, touched, values, setFieldValue}) => (
                      <Form >
                        <div className="mx-2">

                          <div className="row-input">
                            <InputDateFormik
                              name="date"
                              placeholder="Fecha"
                              disabled
                              options={{
                                enableTime: true,
                              }}
                            />
                            <AsyncSelectFormik
                              name="consulting_room"
                              getOptionValue={(option) => {
                                return option.value
                              }}
                              getOptionLabel = {(option) => {
                                return option.name || (typeof(option.text) === 'object' ? option.text.name + ' ' + option.text.last_name :option.text)
                              }}
                              slug="clinic_histories"
                              relation="clinic_history_belonsto_consulting_room_relationship"
                              placeholder="Seleccionar Consultorio"
                              disabled
                            />
                          </div>
                          <div className="row-input">
                            <SelectFormik
                              name="treatment"
                              options={treatments}
                              placeholder="Seleccionar Tratamiento"
                              disabled
                            />
                            <AsyncSelectFormik
                              name="doctor_id"
                              getOptionValue={(option) => {
                                return option.value
                              }}
                              getOptionLabel = {(option) => {
                                return option.name || (typeof(option.text) === 'object' ? option.text.name + ' ' + option.text.last_name :option.text)
                              }}
                              slug="clinic_histories"
                              relation="clinic_history_belonsto_doctor_relationship"
                              placeholder="Seleccionar Doctor"
                              disabled
                            />
                          </div>
                          <div className="row-input">
                            <InputTextFormik
                              name="code_budget"
                              placeholder="Codigo Presupuesto"
                            />
                            <AsyncSelectFormik
                              name="agreement"
                              slug="budget"
                              relation="budget_belonsto_agreement_relationship"
                              placeholder="Seleccionar Convenio"
                            /> 
                          </div>
                        </div>
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
                                          <Field className="table-input-text" name={`budgetItems.${index}.quantity`} />
                                          {/* <input 
                                            type="numeric"
                                            className="custom-input-table" 
                                          /> */}
                                        </div>
                                        <div>
                                          <Field className="table-input-text" name={`budgetItems.${index}.detail_treatment`} />
                                          {/* <input className="custom-input-table" /> */}
                                        </div>
                                        <div>
                                          {/* <input className="custom-input-table" /> */}
                                          <div  className="row-custom">
                                            <Field className="table-input-text" name={`budgetItems.${index}.price`} />
                                            <button
                                              type="button"
                                              onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                            >
                                              -
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    null
                                  )}
                                </div>
                              )}
                            />
                          </div>
                        </div>
                        <div className="button-add-wrap">
                          <div onClick={() => {
                            let arr = [...values.budgetItems]
                            arr.push({
                              quantity: 1,
                              price: 100,
                            })
                            setFieldValue('budgetItems', arr)
                          }}
                            className="button-add"
                          
                          >+</div>
                        </div>
                        <div className="wrap-amount">
                          <div className="content-amount">
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
                          </div>
                        </div>
                        <div className="row-input">
                          <InputTextFormik
                            valueChange
                            disabled
                            value={
                              values.budgetItems.reduce((prev,current) => {
                                let p = new BigNumber(current.price)
                                let q = new BigNumber(current.quantity)
                                return prev.plus(p.multipliedBy(q))
                              },new BigNumber(0)).toFormat() 
                            }
                            placeholder="Total"
                          />
                          <InputTextFormik
                            name="partial_payment"
                            placeholder="A cuenta"
                          />
                          <InputTextFormik
                            valueChange
                            value={
                              values.budgetItems.reduce((prev,current) => {
                                let p = new BigNumber(current.price)
                                let q = new BigNumber(current.quantity)
                                return prev.plus(p.multipliedBy(q))
                              },new BigNumber(0)).minus(new BigNumber(values.partial_payment)).toFormat() 
                            }
                            placeholder="Saldo"
                          />
                        </div>
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
