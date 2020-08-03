import React from 'react';
import { Calendar as Cal, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { request } from '../utils';
import { Formik, Form, Field } from 'formik';
import Input from '../components/Input';
import classnames from 'classnames';
import ReactTable from 'react-table'
import q from 'query-string'

const localizer = momentLocalizer(moment)
export default class Administration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      selectedIndex: 0,
      dataTypes: [],
      createFormFields:[],
      menu: [
        {
          text:'Usuarios',
          id:'users'
        },
        {
          text:'Consultorios',
          id:'consulting_room'
        },
        {
          text:'Convenios',
          id:'agreements'
        },
        {
          text:'Laboratorios',
          id:'laboratories'
        },
        {
          text:'Inventario',
          id:'product'
        }
      ],
      initialValues:{}
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
      list:[]
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
      if(relationships.length > 0) {
        let reqsWithId = data2.map((data,index2) => {
          return {
            index:index2,
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
          response.forEach((resp,index3) => {
            data2[onlyRels[index3].index].options = resp.results;
          })
          dataTypes[index].meta = data2;
          this.setState({
            dataTypes,
            selectedIndex:index
          })
        })
      }else {
        this.setState({
          dataTypes,
          selectedIndex:index
        })
      }

    })
  }
  fetchData = (data) => {
    let page = '';
    if(data) {
      page = q.stringify({
        page:data.page + 1
      })
    } else {
      page = q.stringify({
        page:this.state.currentPage
      })
    }

    request.get(`/api/${this.state.dataTypes[this.state.selectedIndex].slug}?${page}`).then((data3) => {
      if(this.state.dataTypes[this.state.selectedIndex].server_side === 1) {
        this.setState({
          list: data3.data,
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
        createResponse:data.dataType,
        showForm: true,
        initialValues:{},
        addForm:true
      })
    })
  }

  close = () => {
    this.setState({
      showForm: false
    })
  }

  showDetail = (data)  => {
    Promise.all([
      request.get(`/api/${this.state.dataTypes[this.state.selectedIndex].slug}/${data.id}`),
    ]).then(([data]) => {
      this.setState({
        createFormFields: data.dataType.readRows,
        createResponse:data.dataType,
        showForm: true,
        initialValues: data.dataTypeContent,
        addForm:false
      })
    })
  }

  findRelation = (options,id) => {
    return  options.find((option) => {
      return option.id == id
    }) || {}
  }

  render() {
  
    const columns = this.state.dataTypes[this.state.selectedIndex] && this.state.dataTypes[this.state.selectedIndex].meta ?
    this.state.dataTypes[this.state.selectedIndex].meta.map((meta) => {
      return {
        Header: meta.display_name,
        accessor: meta.field, // String-based value accessors!
        Cell: props => {
          if(meta.type === 'image') {
            return <img 
              class="img img-table" 
              src={'/storage/' + props.row[meta.field]} 
            />
          }
          if(meta.type === 'relationship') {
            return (
              meta.options ?
              <div>{this.findRelation(meta.options,props.row[meta.details.column]).text}</div>
              :<div></div>
            )
          }
          return <div>{props.row[meta.field]}</div>
        }
      }
    }) : []
    
    return (
      <div className="wrap-tabs">
        <div className="menu-list">
          {this.state.dataTypes.map((dataType,index) => {
            return <div 
              onClick={this.selectIndex(index)}
            className={
              classnames({
                "menu-tab":true,
                "active":index === this.state.selectedIndex
              })}>{dataType.display_name_plural}</div>
          })}
        </div>
        <div className="menu-table">
          <div className="header-table">
            <div class="btn" onClick={this.getCreate}>+ {this.state.dataTypes[this.state.selectedIndex] ? this.state.dataTypes[this.state.selectedIndex].display_name_singular : ''}</div>
            <div className="search-input">
              <img src=""/> 
              <input className="wrap-input"/>
            </div>
          </div>
          <div>
              {
                this.state.dataTypes[this.state.selectedIndex] && this.state.dataTypes[this.state.selectedIndex].meta ?
                <ReactTable
                  getTdProps={(state, rowInfo, column, instance) => {
                    return {
                      onClick: (e, handleOriginal) => {
                        if(rowInfo && rowInfo.original) {

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
                  pageSizeOptions={[15]}
                  defaultPageSize={15}
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
          <div className="modal visible center">
            <Formik
              initialValues={this.state.initialValues}
              //validationSchema={formSchema}
              enableReinitialize
              onSubmit={(values, actions) => {
                

                var form_data = new FormData();
                console.log(this.state.createFormFields);
                for (let index = 0; index < this.state.createFormFields.length; index++) {
                  const element = this.state.createFormFields[index];
                  if(element.type === 'image' && values[element.field]  instanceof File ) {
                    form_data.append(element.field,new Blob([values[element.field]]),values[element.field].name );
                  } else if(element.type === 'text' ){//typeof values[key] === 'object' ) {
                    form_data.append(element.field,values[element.field]);
                  } else if ( element.type === 'relationship') {
                    form_data.append(element.details.column, values[element.details.column]);
                  }else if ( element.type === 'password') {
                    form_data.append(element.field,values[element.field]);
                  }
                }
                if(this.state.addForm) {
                  request
                    .post(`/api/${this.state.createResponse.slug}`, form_data,{
                      headers:{
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
                  request
                    .put(`/api/${this.state.createResponse.slug}/${this.state.initialValues.id}`, 
                      form_data,{
                        headers:{
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
                    {
                      this.state.addForm ?
                      `Nuevo ${this.state.createResponse.display_name_singular}`
                      :
                      `Editar ${this.state.createResponse.display_name_singular}`
                    }
                    {
                      this.state.createFormFields.map((field) => {
                        return <div>
                          {
                            field.type === 'relationship' ?
                            <Field
                              name={field.details.column}
                              id={field.details.column}
                              type={field.type}
                              component={Input}
                              slug={this.state.createResponse.slug}
                              placeholder={field.display_name}
                              fieldDescription={field}
                            />
                            :
                            <Field
                              name={field.field}
                              id={field.field}
                              type={field.type}
                              component={Input}
                              slug={this.state.createResponse.slug}
                              placeholder={field.display_name}
                              fieldDescription={field}
                            />
                          }
                          
                        </div>
                      })
                    }
                    {
                      this.state.addForm ?
                      <button className="button" type="submit">Crear</button>
                      :
                      <button className="button" type="submit">Editar</button>
                    }
                    
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        }
      </div>
    )
  }
}