import React from 'react';
import { Calendar as Cal, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss"
import "react-big-calendar/lib/css/react-big-calendar.css"
import ReactTable from 'react-table'
import { request } from '../utils';
import q from 'query-string'
import classnames from 'classnames'
import { Formik, Form, Field } from 'formik';
import Input from '../components/Input';
import InputEasyImageFormik from '../components/InputEasyImageFormik';
import InputTextFormik from '../components/InputTextFormik';
import InputCheckboxFormik from '../components/InputCheckboxFormik';
import Modal from '../components/Modal';
import FormikOdontrogram from '../components/Odontogram/FormikOdontrogram';
import InputDateFormik from '../components/InputDateFormik';
import ClinicHistories from './ClinicHistories';

const localizer = momentLocalizer(moment)
export default class Patients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      selectedIndex: 0,
      dataTypes: [],
      history: false,
      odontogram: false,
      createFormFields: [],
      menu: [
        {
          text: 'Pacientes',
          id: 'patients'
        }
      ],
      initialValues: {}
    };
  }

  componentDidMount() {
    request.get('/api/alldatatypes').then((data) => {
      this.setState({
        dataTypes: data.filter((dataTemp) => {
          return this.state.menu.find((d1) => {
            return dataTemp.name === d1.id
          })
        })
      }, () => {
        this.getType(0)
      })
    })
  }

  selectIndex = (index) => () => {
    this.setState({
      list: []
    }, () => {
      this.getType(index)
    })
  }

  refresh = () => {
    this.fetchData({
      page: 0
    })
  }

  getType = (index) => {
    request.get(`/api/alldatatypesfrom?id=${this.state.dataTypes[index].id}`).then((data2) => {
      let dataTypes = this.state.dataTypes;
      dataTypes[index].meta = data2;
      let relationships = data2.filter((field) => {
        return field.type === 'relationship'
      })
      if (relationships.length > 0) {
        let reqsWithId = data2.map((data, index2) => {
          return {
            index: index2,
            isRelationship: data.type === 'relationship'
          }
        })
        let onlyRels = reqsWithId.filter((f) => {
          return f.isRelationship
        })
        let onlyreqs = onlyRels.map((d) => {
          return request.get(`/api/${dataTypes[index].slug}/relation?type=${data2[d.index].field}`)
        })
        Promise.all(onlyreqs).then((response) => {
          response.forEach((resp, index3) => {
            data2[onlyRels[index3].index].options = resp.results;
          })
          dataTypes[index].meta = data2;
          this.setState({
            dataTypes,
            selectedIndex: index
          })
        })
      } else {
        this.setState({
          dataTypes,
          selectedIndex: index
        })
      }

    })
  }
  fetchData = (data) => {
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

    request.get(`/api/${this.state.dataTypes[this.state.selectedIndex].slug}?${page}`).then((data3) => {
      if (this.state.dataTypes[this.state.selectedIndex].server_side === 1) {
        this.setState({
          list: data3.data.map((r) => {
            let odJson;
            try {
              if(r.odontograma) {
                odJson = JSON.parse(r.odontograma)
              }
            } catch (error) {
              odJson = {}
            }
            return {
              ...r,
              odontograma: r.odontograma
            }
          }),
          perPage: data3.per_page,
          currentPage: data3.current_page,
          totalPages: data3.last_page
        })
      } else {
        this.setState({
          list: data3,
        })
      }
    })
  }


  getCreate = () => {

    request.get(`/api/${this.state.dataTypes[this.state.selectedIndex].slug}/create`).then((data) => {
      this.setState({
        createFormFields: data.dataType.addRows,
        createResponse: data.dataType,
        showForm: true,
        initialValues: {},
        addForm: true
      })
    })
  }

  close = () => {
    this.setState({
      showForm: false,
      odontogram: false
    })
  }

  showDetail = (data) => {
    Promise.all([
      request.get(`/api/${this.state.dataTypes[this.state.selectedIndex].slug}/${data.id}`),
    ]).then(([data]) => {
      let odJson;
      try {
        if(data.dataTypeContent.odontograma) {
          odJson = JSON.parse(data.dataTypeContent.odontograma)
        }
      } catch (error) {
        odJson = {}
      }
      this.setState({
        createFormFields: data.dataType.readRows,
        createResponse: data.dataType,
        showForm: true,
        initialValues: {
          ...data.dataTypeContent,
          birthdate: [moment(data.dataTypeContent.birthdate).toDate()],
          odontograma: odJson
        },
        addForm: false
      })
    })
  }

  findRelation = (options, id) => {
    return options.find((option) => {
      return option.id == id
    }) || {}
  }

  showHistory = () => {
    this.setState({
      showForm: false,
      history: true
    })
  }

  hideHistory = () => {
    this.setState({
      showForm: true,
      history: false
    })

  }

  showOdontogram = () => {
    this.setState({
      showForm: false,
      odontogram: true
    })
  }
  hideOdontogram = () => {
    this.setState({
      showForm: true,
      odontogram: false
    })
  }

  delete = () => {
    request
    .delete(`/api/${this.state.createResponse.slug}/${this.state.initialValues.id}`, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(() => {
      this.refresh()
      this.close()

    })
  }

  render() {

    const columns = this.state.dataTypes[this.state.selectedIndex] && this.state.dataTypes[this.state.selectedIndex].meta ?
      this.state.dataTypes[this.state.selectedIndex].meta.map((meta) => {
        return {
          Header: meta.display_name,
          accessor: meta.field, // String-based value accessors!
          Cell: props => {
            if (meta.type === 'image') {
              return <img
                class="img img-table"
                src={'/storage/' + props.row[meta.field]}
              />
            }
            if (meta.type === 'relationship') {
              return (
                meta.options ?
                  <div>{this.findRelation(meta.options, props.row[meta.details.column]).text}</div>
                  : <div></div>
              )
            }
            return <div>{props.row[meta.field]}</div>
          }
        }
      }) : []
    columns.push({
      Header: '',
      accessor: '', // String-based value accessors!
      Cell: props => {
        return <span onClick={(e) => {
          e.stopPropagation();
          if(window.confirm('Eliminar?')) {
            if(this.state.dataTypes[this.state.selectedIndex]?.slug ) {
              const data = props.original;
              
              var form_data = new FormData();
              form_data.append("_method","DELETE");
              request.post(`/api/${this.state.dataTypes[this.state.selectedIndex].slug}/${data.id}`, form_data).then(() => {
                this.refresh();
              })
            }
          }
          //delete
        }}>
          Eliminar
        </span>
      }
    })

    return (
      <div className="wrap-tabs">
        
        <div className="menu-list">
          {this.state.dataTypes.map((dataType, index) => {
            return <div
              onClick={this.selectIndex(index)}
              className={
                classnames({
                  "menu-tab": true,
                  "active": index === this.state.selectedIndex
                })}>{dataType.display_name_plural}</div>
          })}
        </div>
        <div className="menu-table">
          <div className="header-table">
            <div class="btn" onClick={this.getCreate}>+ {this.state.dataTypes[this.state.selectedIndex] ? this.state.dataTypes[this.state.selectedIndex].display_name_singular : ''}</div>
            <div className="search-input">
              <img src="" />
              <input className="wrap-input" />
            </div>
          </div>
          <div>
            {
              this.state.dataTypes[this.state.selectedIndex] && this.state.dataTypes[this.state.selectedIndex].meta ?
                <ReactTable
                  getTdProps={(state, rowInfo, column, instance) => {
                    return {
                      onClick: (e, handleOriginal) => {
                        if (rowInfo && rowInfo.original) {

                          this.showDetail(rowInfo.original)
                          console.log('A Td Element was clicked!')
                          console.log('it produced this event:', e)
                          console.log('It was in this column:', column)
                          console.log('It was in this row:', rowInfo)
                          console.log('It was in this table instance:', instance)
                        }

                        // IMPORTANT! React-Table uses onClick internally to trigger
                        // events like expanding SubComponents and pivots.
                        // By default a custom 'onClick' handler will override this functionality.
                        // If you want to fire the original onClick handler, call the
                        // 'handleOriginal' function.
                        if (handleOriginal) {
                          handleOriginal()
                        }
                      }
                    }
                  }}
                  key={this.state.dataTypes[this.state.selectedIndex].slug}
                  pageSizeOptions={[10]}
                  defaultPageSize={10}
                  manual={this.state.dataTypes[this.state.selectedIndex].server_side === 1}// Forces table not to paginate or sort automatically, so we can handle it server-side
                  onFetchData={this.fetchData} // Request new data when things change
                  data={this.state.list}
                  pages={this.state.totalPages} // Display the total number of pages
                  // loading={loading} // Display the loading overlay when we need it
                  columns={columns}
                />
                :
                null
            }
          </div>
        </div>
        {
          this.state.showForm &&
          <Modal>

            <Formik
              initialValues={this.state.initialValues}
              //validationSchema={formSchema}
              enableReinitialize
              onSubmit={(values, actions) => {

                var form_data = new FormData();
                form_data.append("name", values.name)
                form_data.append("last_name", values.last_name)
                form_data.append("document_number", values.document_number)
                form_data.append("phone_number", values.phone_number)
                form_data.append("email", values.email)
                form_data.append("avatar",values.avatar)
                form_data.append("birthdate", values.birthdate)
                form_data.append("in_charge_name", values.in_charge_name)
                //form_data.append("state",values.state)
                //form_data.append("odontograma",values.odontograma)
                form_data.append("diseases", JSON.stringify(values.diseases))
                /* for (let index = 0; index < this.state.createFormFields.length; index++) {
                  const element = this.state.createFormFields[index];
                  if(element.type === 'image' && values[element.field]  instanceof File ) {
                    form_data.append(element.field,new Blob([values[element.field]]),values[element.field].name );
                  } else if(element.type === 'text' ){//typeof values[key] === 'object' ) {
                    form_data.append(element.field,values[element.field]);
                  } else if ( element.type === 'relationship') {
                    form_data.append(element.details.column, values[element.details.column]);
                  }
                } */
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
              }}
            >
              {({ errors, touched, values }) => (
                <Form className="modal-form">
                  <div className="custom-wrapper">
                    <div className="close-icon" onClick={this.close}>x</div>
                    <div className="header justify-content-center">
                      {
                        this.state.addForm ?
                          `NUEVO PACIENTE`
                          :
                          `INFORMACIÓN DE PACIENTE`
                      }
                    </div>
                    <div className="row-input">
                      <div className="mx-2">
                        <InputEasyImageFormik
                          name="avatar"
                        />
                      </div>
                      <div>
                        <div className="row-input">
                          <InputTextFormik
                            name="name"
                            placeholder="Nombre de Paciente"
                          />
                          <InputTextFormik
                            name="last_name"
                            placeholder="Apellido de Paciente"
                          />
                        </div>
                        <div className="row-input">
                          <InputTextFormik
                            name="document_number"
                            placeholder="Nro DNI"
                          />
                          <InputTextFormik
                            name="phone_number"
                            placeholder="Nro de Celular"
                          />
                        </div>

                        <div className="row-input">
                          <InputTextFormik
                            name="email"
                            placeholder="Correo Electronico"
                          />
                        </div>
                        <div className="row-input">
                          <InputDateFormik
                            name="birthdate"
                            placeholder="Fecha de Nacimiento"
                            options={{
                              defaultDate: moment().subtract(18,'year').toDate()
                            }}
                          />
                          <InputTextFormik
                            value={values.birthdate && values.birthdate[0] && moment(values.birthdate[0]).isValid() ?  moment().year() - moment(values.birthdate[0]).year() : ""}
                            disabled
                            valueChange
                            placeholder="Edad"
                          />
                        </div>
                        <div className="row-input">
                          {
                            values.birthdate && 
                            values.birthdate[0] && 
                            moment(values.birthdate[0]).isValid() &&
                            moment().year() - moment(values.birthdate[0]).year() < 18
                            ?  
                            <InputTextFormik
                              name="incharge_name"
                              placeholder="Nombre del tutor"
                            />
                            : null}
                          
                        </div>
                      </div>

                    </div>
                    
                    <hr />
                    <div className="header justify-content-center">Antecedentes</div>

                    <div className="row-input custom-wrap-patient">
                      <div
                        style={{
                          flex:1
                        }}
                      >
                        <div className="header justify-content-center">Salud General</div>
                        <div>
                          <InputCheckboxFormik
                            name="diseases.hepatitis"
                            label="Hepatitis"
                          />
                        </div>
                        <div>
                          <InputCheckboxFormik
                            name="diseases.diabetes"
                            label="Diabetes"
                          />
                        </div>
                        <div>
                          <InputCheckboxFormik
                            name="diseases.hipertension"
                            label="Hipertension"
                          />
                        </div>
                        <div>
                          <InputCheckboxFormik
                            name="diseases.hemorragias"
                            label="Hemorragias"
                          />
                        </div>
                        <div>
                          <InputCheckboxFormik
                            name="diseases.enfermedad_renal"
                            label="Enfermedad Renal"
                          />
                        </div>
                        <div>
                          <InputCheckboxFormik
                            name="diseases.alteracion_endocrina"
                            label="Alteracion endocrina"
                          />
                        </div>
                        <div>
                          <InputCheckboxFormik
                            name="diseases.alergia"
                            label="Alergias"
                          />
                          <InputTextFormik
                            name="diseases.alergiaff_text"
                            label="Alergias..."
                            placeholder="Alergias..."
                          />
                        </div>
                      </div>
                      <vr></vr>
                      <div style={{
                        flex:1
                      }}>
                        <div className="header justify-content-center">Salud Estomatológica</div>
                        <div>
                          <InputCheckboxFormik
                            name="diseases.r1"
                            label="Reacción adversa a la anestecia local"
                          />
                        </div>
                        <div>
                          <InputCheckboxFormik
                            name="diseases.r2"
                            label="Sufrió hemorragia después de alguna exodoncia"
                          />
                        </div>
                        <div>
                          <InputCheckboxFormik
                            name="diseases.r3"
                            label="Es Gestante"
                          />
                        </div>
                        <div>
                          <InputCheckboxFormik
                            name="diseases.r4"
                            label="Recibe Medicamentos"
                          />
                          <InputTextFormik
                            name="diseases.r4_text"
                            placeholder="Medicamentos..."
                            label="Medicamentos..."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="group-buttons">
                      {
                        this.state.addForm ?
                          <button className="button mx-1" type="submit">Crear</button>
                          :
                          <button className="button mx-1" type="submit">Editar</button>
                      }
                      
                      {
                        !this.state.addForm && <>
                          <button className="button mx-1" onClick={this.showHistory} type="button">Historia</button>
                          <button className="button mx-1" onClick={this.showOdontogram} type="button">Odontograma</button>
                          {/* <button className="button mx-1" onClick={this.delete} type="button">Eliminar</button> */}
                        </>
                      }

                    </div>

                  </div>
                </Form>
              )}
            </Formik>
          </Modal>
        }
        {
          this.state.history && <ClinicHistories
            initialValues={this.state.initialValues}
            onClose={() => {
              this.setState({
                history:undefined,
                showForm:true
              })
            }}
          />
        }
        {
          this.state.odontogram && <Modal>
            <Formik
              initialValues={this.state.initialValues}
              //validationSchema={formSchema}
              enableReinitialize
              onSubmit={(values, actions) => {

                var form_data = new FormData();
                form_data.append("name", this.state.initialValues.name)
                form_data.append("last_name", this.state.initialValues.last_name)
                form_data.append("document_number", this.state.initialValues.document_number)
                form_data.append("phone_number", this.state.initialValues.phone_number)
                form_data.append("email", this.state.initialValues.email)
                //form_data.append("avatar",values.avatar)
                form_data.append("birthdate", this.state.initialValues.birthdate)
                form_data.append("in_charge_name", this.state.initialValues.in_charge_name)
                //form_data.append("state",values.state)
                //form_data.append("odontograma",values.odontograma)
                form_data.append("diseases", JSON.stringify(this.state.initialValues.diseases))
                form_data.append("odontograma", JSON.stringify(values.odontograma))
                form_data.append("_method","PUT")
                /* for (let index = 0; index < this.state.createFormFields.length; index++) {
                  const element = this.state.createFormFields[index];
                  if(element.type === 'image' && values[element.field]  instanceof File ) {
                    form_data.append(element.field,new Blob([values[element.field]]),values[element.field].name );
                  } else if(element.type === 'text' ){//typeof values[key] === 'object' ) {
                    form_data.append(element.field,values[element.field]);
                  } else if ( element.type === 'relationship') {
                    form_data.append(element.details.column, values[element.details.column]);
                  }
                } */
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
              }}
            >
              {({ errors, touched, values }) => (
                <Form className="modal-form">
                  <div className="custom-wrapper large">
                    <div className="close-icon" onClick={this.close}>x</div>
                    <div style={{
                      flexDirection:'row',
                      display: 'flex'
                    }}>
                      <InputEasyImageFormik
                        name="avatar"
                      />
                      <div>
                        <div className="row-input">
                          <InputTextFormik
                            name="name"
                            placeholder="Nombre de Paciente"
                            disabled
                          />
                          <InputTextFormik
                            name="last_name"
                            placeholder="Apellido de Paciente"
                            disabled
                          />
                          <InputTextFormik
                            value={values.birthdate && values.birthdate[0] && moment(values.birthdate[0]).isValid() ?  moment().year() - moment(values.birthdate[0]).year() : ""}
                            valueChange
                            placeholder="Edad"
                            disabled
                          />
                        </div>
                        <div className="row-input">
                          <InputTextFormik
                            name="document_number"
                            placeholder="DNI"
                            disabled
                          />
                          <InputTextFormik
                            name="phone_number"
                            placeholder="Nro de Celular" 
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <FormikOdontrogram
                        name="odontograma"
                      />
                    </div>
                    
                    <button className="button" type="submit">Guardar</button>

                  </div>
                </Form>
              )}
            </Formik>
          </Modal>
        }
      </div>
    )
  }
}