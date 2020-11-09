import React from 'react';
import ReactTooltip from "react-tooltip";
import './Odontogram.scss'
import classnames from 'classnames';
import ap_ortodontico_fijo_bueno from '../../assets/img/odontogram/ap_ortodontico_fijo_bueno.png'
import implante from '../../assets/img/odontogram/implante.png'
import ap_ortodontico_fijo_malo from '../../assets/img/odontogram/ap_ortodontico_fijo_malo.png'
import macrodoncia from '../../assets/img/odontogram/macrodoncia.png'
import ap_ortodontico_removible_bueno from '../../assets/img/odontogram/ap_ortodontico_removible_bueno.png'
import microdoncia from '../../assets/img/odontogram/microdoncia.png'
import ap_ortodontico_removible_malo from '../../assets/img/odontogram/ap_ortodontico_removible_malo.png'
import migracion from '../../assets/img/odontogram/migracion_derecha.png'
import caries from '../../assets/img/odontogram/caries.png'
import migracion_izquierda from '../../assets/img/odontogram/migracion_izquierda.png'
import corona_definitiva from '../../assets/img/odontogram/corona_definitiva.png'
import movilidad from '../../assets/img/odontogram/movilidad.png'
import corona_definitiva_CC from '../../assets/img/odontogram/corona_definitiva_CC.png'
import corona_definitiva_CF from '../../assets/img/odontogram/corona_definitiva_CF.png'
import protesis_fija_malo from '../../assets/img/odontogram/protesis_fija_mala.png'
import protesis_fija_malo2 from '../../assets/img/odontogram/protesis_fija_mala2.png'
import protesis_fija_malo3 from '../../assets/img/odontogram/protesis_fija_mala3.png'
import corona_definitiva_CJ from '../../assets/img/odontogram/corona_definitiva_CJ.png'
import protesis_removible_bueno from '../../assets/img/odontogram/protesis_removible_bueno.png'
import corona_definitiva_CMC from '../../assets/img/odontogram/corona_definitiva_CMC.png'
import protesis_removible_malo from '../../assets/img/odontogram/protesis_removible_malo.png'
import corona_definitiva_CV from '../../assets/img/odontogram/corona_definitiva_CV.png'
import protesis_total_buena from '../../assets/img/odontogram/protesis_total_buena.png'
import corona_temporal from '../../assets/img/odontogram/corona_temporal.png'
import protesis_total_malo from '../../assets/img/odontogram/protesis_total_malo.png'
import desgaste_oclusal from '../../assets/img/odontogram/desgaste_oclusal.png'
import remanente_radicular from '../../assets/img/odontogram/remanente_radicular.png'
import diastema from '../../assets/img/odontogram/diastema.png'
import restauracion from '../../assets/img/odontogram/restauracion.png'
import diente_ausente from '../../assets/img/odontogram/diente_ausente.png'
import diemte_extraido from '../../assets/img/odontogram/diemte_extraido.png'
import restauracion_AM from '../../assets/img/odontogram/restauracion_AM.png'
import diente_discromico from '../../assets/img/odontogram/diente_discromico.png'
import restauracion_IE from '../../assets/img/odontogram/restauracion_IE.png'
import diente_ectopico from '../../assets/img/odontogram/diente_ectopico.png'
import restauracion_IM from '../../assets/img/odontogram/restauracion_IM.png'
import diente_en_clavija from '../../assets/img/odontogram/diente_en_clavija.png'
import restauracion_IV from '../../assets/img/odontogram/restauracion_IV.png'
import diente_extruido from '../../assets/img/odontogram/diente_extruido_arriba.png'
import restauracion_R from '../../assets/img/odontogram/restauracion_R.png'
import diente_extruido_arriba from '../../assets/img/odontogram/diente_extruido_arriba.png'
import restauracion_temporal from '../../assets/img/odontogram/restauracion_temporal.png'
import diente_intruido from '../../assets/img/odontogram/diente_intruido_abajo - copia.png'
import semi_impactacion from '../../assets/img/odontogram/semi_impactacion.png'
import diente_intruido_arriba from '../../assets/img/odontogram/diente_intruido_arriba - copia.png'
import supernumerario from '../../assets/img/odontogram/supernumerario.png'
import edentulo_total from '../../assets/img/odontogram/edentulo_total.png'
import transposicion from '../../assets/img/odontogram/transposicion_abajo.png'
import fractura from '../../assets/img/odontogram/fractura.png'
import transposicion_arriba from '../../assets/img/odontogram/transposicion_arriba.png'
import geminacion_fusion from '../../assets/img/odontogram/geminacion_fusion.png'
import tratamiento_pulpar from '../../assets/img/odontogram/tratamiento_pulpar.png'
import giroversion from '../../assets/img/odontogram/giroversion_derecha.png'
import tratamiento_pulpar_PC from '../../assets/img/odontogram/tratamiento_pulpar_PC.png'
import giroversion_izquierda from '../../assets/img/odontogram/giroversion_izquierda.png'
import tratamiento_pulpar_PP from '../../assets/img/odontogram/tratamiento_pulpar_PP.png'
import impactacion from '../../assets/img/odontogram/impactacion.png'
import tratamiento_pulpar_TC from '../../assets/img/odontogram/tratamiento_pulpar_TC.png'
import ordontico_fijo_bueno2 from '../../assets/img/odontogram/ordontico_fijo_bueno2.png'
import ordontico_fijo_bueno from '../../assets/img/odontogram/ordontico_fijo_bueno.png'
import ordontico_fijo_bueno3 from '../../assets/img/odontogram/ordontico_fijo_bueno3.png'
import ordontico_fijo_malo2 from '../../assets/img/odontogram/ordontico_fijo_malo2.png'
import ordontico_fijo_malo from '../../assets/img/odontogram/ordontico_fijo_malo.png'
import ordontico_fijo_malo3 from '../../assets/img/odontogram/ordontico_fijo_malo3.png'
import perno_bueno from '../../assets/img/odontogram/perno_bueno.png'
import perno_bueno_mf from '../../assets/img/odontogram/perno_bueno_mf.png'
import perno_bueno_mm from '../../assets/img/odontogram/perno_bueno_mm.png'
import perno_mf from '../../assets/img/odontogram/perno_mf.png'
import perno_mm from '../../assets/img/odontogram/perno_mm.png'
import perno_malo from '../../assets/img/odontogram/perno_malo.png'
import protesis_fija_buena from '../../assets/img/odontogram/protesis_fija_buena.png'
import protesis_fija_buena2 from '../../assets/img/odontogram/protesis_fija_buena2.png'
import protesis_fija_buena3 from '../../assets/img/odontogram/protesis_fija_buena3.png'
import sellante_bueno from '../../assets/img/odontogram/sellante_bueno.png'
import sellante_malo from '../../assets/img/odontogram/sellante_malo.png'
import trat_pulpar_malo from '../../assets/img/odontogram/trat_pulpar_malo.png'
import corona_temporal_cc from '../../assets/img/odontogram/corona_temporal_cc.png'
import corona_temporal_cf from '../../assets/img/odontogram/corona_temporal_cf.png'
import corona_temporal_cj from '../../assets/img/odontogram/corona_temporal_cj.png'
import corona_temporal_cmc from '../../assets/img/odontogram/corona_temporal_cmc.png'
import corona_temporal_cv from '../../assets/img/odontogram/corona_temporal_cv.png'
import tratamiento_pulpar_pc_r from '../../assets/img/odontogram/tratamiento_pulpar_pc_r.png'
import tratamiento_pulpar_pp_r from '../../assets/img/odontogram/tratamiento_pulpar_pp_r.png'
import tratamiento_pulpar_tc_r from '../../assets/img/odontogram/tratamiento_pulpar_tc_r.png'
import restauracion_am_r  from '../../assets/img/odontogram/restauracion_am_r.png'
import restauracion_ie_r  from '../../assets/img/odontogram/restauracion_ie_r.png'
import restauracion_im_r  from '../../assets/img/odontogram/restauracion_im_r.png'
import restauracion_IV_r  from '../../assets/img/odontogram/restauracion_IV_r.png'
import restauracion_r_r  from '../../assets/img/odontogram/restauracion_r_r.png'
/* 
range:true,
superior_block: true,
rangeNextOrPreviousOnly:true,
wholeTooth: true,
betweenTooth:true,
onlyCrownOrRoot:true,
onlySections:true,
removeOnLastItems:true

*/
const states = {
  sellante_bueno: {
    image: sellante_bueno,
    wholeTooth: true,
  },
  sellante_malo: {
    image: sellante_malo,
    wholeTooth: true,
  },
  perno_bueno: {
    image: perno_bueno,
    wholeTooth: true,
    superior_block_option: true,
    disableHide: true,
    options: {
      perno_bueno_mf: {
        image: perno_bueno_mf,
        wholeTooth: true,
      },
      perno_bueno_mm: {
        image: perno_bueno_mm,
        wholeTooth: true,
      },
    }
  },
  perno_malo: {
    image: perno_malo,
    wholeTooth: true,
    superior_block_option: true,
    disableHide: true,
    options: {
      perno_mf: {
        image: perno_mf,
        wholeTooth: true,
      },
      perno_mm: {
        image: perno_mm,
        wholeTooth: true,
      },
    }
  },
  ap_ortodontico_fijo_bueno: {
    image: ordontico_fijo_bueno2,
    start: ordontico_fijo_bueno,
    end: ordontico_fijo_bueno3,
    range: true,
  },
  ap_ortodontico_fijo_malo: {
    image: ordontico_fijo_malo2,
    start:ordontico_fijo_malo,
    end:ordontico_fijo_malo3,
    range: true,
  },
  ap_ortodontico_removible_bueno: {
    image: ap_ortodontico_removible_bueno,
    start: ap_ortodontico_removible_bueno,
    end: ap_ortodontico_removible_bueno,
    range: true,
  },
  ap_ortodontico_removible_malo: {
    image: ap_ortodontico_removible_malo,
    start: ap_ortodontico_removible_malo,
    end: ap_ortodontico_removible_malo,
    range: true,
  },
  caries: {
    onlySections: true,
    image: caries,
  },
  corona_definitiva: {
    image: corona_definitiva,
    wholeTooth: true,
    superior_block_option: true,
    disableHide: true,
    options: {
      corona_definitiva_CC: {
        image: corona_definitiva_CC,
        wholeTooth: true,
      },
      corona_definitiva_CF: {
        image: corona_definitiva_CF,
        wholeTooth: true,
      },
      corona_definitiva_CJ: {
        image: corona_definitiva_CJ,
        wholeTooth: true,
      },
      corona_definitiva_CMC: {
        image: corona_definitiva_CMC,
        wholeTooth: true,
      },
      corona_definitiva_CV: {
        image: corona_definitiva_CV,
        wholeTooth: true,
      },
    }
  },
  corona_temporal: {
    image: corona_temporal,
    wholeTooth: true,
    superior_block_option: true,
    disableHide: true,
    options: {
      corona_temporal_cc: {
        image: corona_temporal_cc,
        wholeTooth: true,
      },
      corona_temporal_cf: {
        image: corona_temporal_cf,
        wholeTooth: true,
      },
      corona_temporal_cj: {
        image: corona_temporal_cj,
        wholeTooth: true,
      },
      corona_temporal_cmc: {
        image: corona_temporal_cmc,
        wholeTooth: true,
      },
      corona_temporal_cv: {
        image: corona_temporal_cv,
        wholeTooth: true,
      },
    }
  },
  desgaste_oclusal: {
    image: desgaste_oclusal,
    superior_block: true,
    wholeTooth: true,
  },
  diastema: {
    image: diastema,
    //betweenTooth: true,
    wholeTooth: true,
    disableOnLastItems: true
  },
  diente_ausente: {
    image: diente_ausente,
    wholeTooth: true,
  },
  diemte_extraido: {
    image: diemte_extraido,
    wholeTooth: true,
  },
  
  diente_discromico: {
    image: diente_discromico,
    superior_block: true,
    wholeTooth: true,
  },
  diente_ectopico: {
    image: diente_ectopico,
    superior_block: true,
    wholeTooth: true,
  },
  diente_en_clavija: {
    image: diente_en_clavija,
    wholeTooth: true,
  },
  diente_extruido: {
    image: diente_extruido,
    wholeTooth: true,
  },
  diente_intruido: {
    image: diente_intruido,
    wholeTooth: true,
  },
  edentulo_total: {
    image: edentulo_total,
    end: edentulo_total,
    start: edentulo_total,
    range: true,
  },
  fractura: {
    image: fractura,
    onlyCrownOrRoot: true,
  },
  geminacion_fusion: {
    image: geminacion_fusion,
    //rangeNextOrPreviousOnly: true
    wholeTooth: true,
    disableOnLastItems: true
  },
  giroversion: {
    image: giroversion,
    wholeTooth: true,
  },
  impactacion: {
    image: impactacion,
    superior_block: true,
    wholeTooth: true,
  },
  implante: {
    image: implante,
    superior_block: true,
    wholeTooth: true,
  },
  macrodoncia: {
    image: macrodoncia,
    superior_block: true,
    wholeTooth: true,
  },
  microdoncia: {
    image: microdoncia,
    superior_block: true,
    wholeTooth: true,
  },
  migracion: {
    image: migracion,
    wholeTooth: true,
  },
  movilidad: {
    image: movilidad,
    superior_block: true,
    wholeTooth: true,
    /* options: {
      restauracion_AM: {
        image: restauracion_AM,
        superior_block: true,
        onlySections: true
      },
      restauracion_IE: {
        image: restauracion_IE,
        superior_block: true,
        onlySections: true
      },
      restauracion_IM: {
        image: restauracion_IM,
        superior_block: true,
        onlySections: true
      },
      restauracion_IV: {
        image: restauracion_IV,
        superior_block: true,
        onlySections: true
      },
      restauracion_R: {
        image: restauracion_R,
        superior_block: true,
        onlySections: true
      },
    } */
  },
  protesis_fija_buena: {
    image: protesis_fija_buena2,
    start: protesis_fija_buena,
    end:protesis_fija_buena3,
    range: true,
  },
  protesis_fija_malo: {
    image: protesis_fija_malo2,
    start: protesis_fija_malo,
    end: protesis_fija_malo3,
    range: true,
  },

  protesis_removible_bueno: {
    image: protesis_removible_bueno,
    start: protesis_removible_bueno,
    end: protesis_removible_bueno,
    range: true,
  },

  protesis_removible_malo: {
    image: protesis_removible_malo,
    start: protesis_removible_malo,
    end: protesis_removible_malo,
    range: true,
  },

  protesis_total_buena: {
    image: protesis_total_buena,
    start: protesis_total_buena,
    end: protesis_total_buena,
    range: true,
  },
  protesis_total_malo: {
    image: protesis_total_malo,
    start: protesis_total_malo,
    end: protesis_total_malo,
    range: true,
  },
  remanente_radicular: {
    image: remanente_radicular,
    wholeTooth: true,
  },
  restauracion: {
    image: restauracion,
    superior_block_option: true,
    superior_block: true,
    onlySections: true,
    options: {
      restauracion_AM: {
        image: restauracion_AM,
        superior_block: true,
        onlySections: true
      },
      restauracion_IE: {
        image: restauracion_IE,
        superior_block: true,
        onlySections: true
      },
      restauracion_IM: {
        image: restauracion_IM,
        superior_block: true,
        onlySections: true
      },
      restauracion_IV: {
        image: restauracion_IV,
        superior_block: true,
        onlySections: true
      },
      restauracion_R: {
        image: restauracion_R,
        superior_block: true,
        onlySections: true
      },
    }
  },
  restauracion_temporal: {
    image: restauracion_temporal,
    superior_block_option: true,
    superior_block: true,
    onlySections: true,
    options: {
      restauracion_am_r: {
        image: restauracion_am_r,
        superior_block: true,
        onlySections: true
      },
      restauracion_ie_r: {
        image: restauracion_ie_r,
        superior_block: true,
        onlySections: true
      },
      restauracion_im_r: {
        image: restauracion_im_r,
        superior_block: true,
        onlySections: true
      },
      restauracion_IV_r: {
        image: restauracion_IV_r,
        superior_block: true,
        onlySections: true
      },
      restauracion_r_r: {
        image: restauracion_r_r,
        superior_block: true,
        onlySections: true
      },
    }
  },
  semi_impactacion: {
    image: semi_impactacion,
    superior_block: true,
    wholeTooth: true,
  },
  supernumerario: {
    image: supernumerario,
    wholeTooth: true,
    disableOnLastItems: true
    //betweenTooth: true,
  },
  transposicion: {
    image: transposicion,
    wholeTooth: true,
    //rangeNextOrPreviousOnly: true,
  },
  trat_pulpar_malo: {
    image: trat_pulpar_malo,
    wholeTooth: true,
    superior_block_option: true,
    disableHide: true,
    options: {
      tratamiento_pulpar_pc_r: {
        image: tratamiento_pulpar_pc_r,
        text: "Tratamiento Pulpar PC"
      },
      tratamiento_pulpar_pp_r: {
        image: tratamiento_pulpar_pp_r,
        text: "Tratamiento Pulpar PP"
      },
      tratamiento_pulpar_tc_r: {
        image: tratamiento_pulpar_tc_r,
        text: "Tratamiento Pulpar TC"
      },
    }
  },
  tratamiento_pulpar: {
    image: tratamiento_pulpar,
    wholeTooth: true,
    superior_block_option: true,
    disableHide: true,
    options: {
      tratamiento_pulpar_PC: {
        image: tratamiento_pulpar_PC,
        text: "Tratamiento Pulpar PC"
      },
      tratamiento_pulpar_PP: {
        image: tratamiento_pulpar_PP,
        text: "Tratamiento Pulpar PP"
      },
      tratamiento_pulpar_TC: {
        image: tratamiento_pulpar_TC,
        text: "Tratamiento Pulpar TC"
      },
    }
  },


  /// delete soon
  diente_extruido_arriba: {
    image: diente_extruido_arriba,
    wholeTooth: true,
  },
  diente_intruido_arriba: {
    image: diente_intruido_arriba,
    wholeTooth: true,
  },
  transposicion_arriba: {
    image: transposicion_arriba,
    wholeTooth: true,
  },
  giroversion_izquierda: {
    image: giroversion_izquierda,
    wholeTooth: true,
  },
  migracion_izquierda: {
    image: migracion_izquierda,
    wholeTooth: true,
  }
  

}
export default class Odontrogram extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedRow: null,
      selectedTooth: null,
      dataArray: [
        {
          "18_": { type: 1, reverse: false }, "17_": { type: 2, reverse: false }, "16_": { type: 2, reverse: false }, "15_": { type: 3, reverse: false }, "14_": { type: 4, reverse: false }, "13_": { type: 5, reverse: false }, "12_": { type: 5, reverse: false }, "11_": { type: 5, reverse: false, marginRight: true }, "21_": { type: 5, reverse: false }, "22_": { type: 5, reverse: false }, "23_": { type: 5, reverse: false }, "24_": { type: 4, reverse: false }, "25_": { type: 3, reverse: false }, "26_": { type: 2, reverse: false }, "27_": { type: 2, reverse: false }, "28_": { type: 1, reverse: false }
        },
        {
          "55_": { type: 2, reverse: false }, "54_": { type: 2, reverse: false }, "53_": { type: 5, reverse: false }, "52_": { type: 5, reverse: false }, "51_": { type: 5, reverse: false, marginRight: true }, "61_": { type: 5, reverse: false }, "62_": { type: 5, reverse: false }, "63_": { type: 5, reverse: false }, "64_": { type: 2, reverse: false }, "65_": { type: 2, reverse: false },
        },
        {
          "85_": { type: 2, reverse: true }, "84_": { type: 2, reverse: true }, "83_": { type: 5, reverse: true }, "82_": { type: 5, reverse: true }, "81_": { type: 5, reverse: true, marginRight: true }, "71_": { type: 5, reverse: true }, "72_": { type: 5, reverse: true }, "73_": { type: 5, reverse: true }, "74_": { type: 2, reverse: true }, "75_": { type: 2, reverse: true }
        },
        {
          "48_": { type: 1, reverse: true }, "47_": { type: 2, reverse: true }, "46_": { type: 6, reverse: true }, "45_": { type: 3, reverse: true }, "44_": { type: 3, reverse: true }, "43_": { type: 5, reverse: true }, "42_": { type: 5, reverse: true }, "41_": { type: 5, reverse: true, marginRight: true }, "31_": { type: 5, reverse: true }, "32_": { type: 5, reverse: true }, "33_": { type: 5, reverse: true }, "34_": { type: 3, reverse: true }, "35_": { type: 3, reverse: true }, "36_": { type: 6, reverse: true }, "37_": { type: 2, reverse: true }, "38_": { type: 1, reverse: true }
        }
      ],
      value: props.value || {}
    }
  }

  renderTooths = (data, which) => {

    ///


    //
    return (
      <div className="wrap-tooths">
        {
          Object.keys(data).map((tooth) => {
            return <div className={
              classnames({
                "square": true,
                marginRight: data[tooth].marginRight
              })
            } >
              <>
                {
                  (this.state.value[tooth] && this.state.value[tooth].state) ?
                    Object.keys(this.state.value[tooth].state).filter((state) => {
                      return (
                        !!this.state.value[tooth].state[state] && 
                        (states[state].superior_block === true || states[state].superior_block_option === true)
                      )
                    }).map((state,index) => {
                      // index === which
                      let oneState = this.state.value[tooth].state[state].option &&
                         Object.keys(this.state.value[tooth].state[state].option) === 1;
                      if( states[state].superior_block_option !== true && index === which ) {
                        return <div className={
                          classnames({
                            //"state": true,
                            //[state]: true,
                            //'has-margin-right': this.state.dataArray[indexRow][name].marginRight
                          })
                        }>
                          {
                            states[state].superior_block_option === true ? 
                            <>
                              {!!this.state.value[tooth].state[state].option &&
                                <img 
                                  className={
                                    classnames({
                                      "img-fluid": true,
                                    })
                                  } 
                                  src={states[state].options[this.state.value[tooth].state[state].option].image} 
                                />
                              }

                            </>
                            :
                            <img 
                              className={
                                classnames({
                                  "img-fluid": true,
                                })
                              } 
                              src={states[state].image} 
                            />
                          }
                        </div>
                      } 
                      if( states[state].superior_block_option === true) {
                        let options = [];
                        if(this.state.value[tooth].state[state].option) {
                          options = Object.keys(this.state.value[tooth].state[state].option);
                        } 
                        if(options.length === 1) {
                          if(index === which) {
                            return <div className={
                              classnames({
                                //"state": true,
                                //[state]: true,
                                //'has-margin-right': this.state.dataArray[indexRow][name].marginRight
                              })
                            }>
                              {
                                states[state].superior_block_option === true ? 
                                <>
                                  {!!this.state.value[tooth].state[state].option &&
                                    <img 
                                      className={
                                        classnames({
                                          "img-fluid": true,
                                        })
                                      } 
                                      src={states[state].options[options[0]].image} 
                                    />
                                  }

                                </>
                                :
                                <img 
                                  className={
                                    classnames({
                                      "img-fluid": true,
                                    })
                                  } 
                                  src={states[state].image} 
                                />
                              }
                            </div>
                          }
                        } else if(options.length > 1){
                          if(index === 0) {
                            return <div className={
                              classnames({
                                //"state": true,
                                //[state]: true,
                                //'has-margin-right': this.state.dataArray[indexRow][name].marginRight
                              })
                            }>
                              {
                                states[state].superior_block_option === true ? 
                                <>
                                  {!!this.state.value[tooth].state[state].option &&
                                    <img 
                                      className={
                                        classnames({
                                          "img-fluid": true,
                                        })
                                      } 
                                      src={states[state].options[options[which]].image} 
                                    />
                                  }

                                </>
                                :
                                <img 
                                  className={
                                    classnames({
                                      "img-fluid": true,
                                    })
                                  } 
                                  src={states[state].image} 
                                />
                              }
                            </div>
                          }
                        }
                      }
                      return null
                    })
                    :
                    null
                }
              </>
            </div>
          })
        }
      </div>
    )
  }

  findIllness = (state, name, part) => {
    //this.state.value[this.state.selectedTooth].part[name][this.state.selectedState] 
    //'caries'
    return (this.state.value[name] && this.state.value[name].part && this.state.value[name].part[part] && this.state.value[name].part[part][state])
    /* return this.state.value[name].part[stateToFind]
    return statesFounded.find((state) => {
      debugger
      return state === stateToFind
    }) */
  }
  findRenderToothWholeIllness = (name, indexRow) => {
    if (this.state.value[name] && this.state.value[name].state) {

      return <>

        {Object.keys(this.state.value[name].state).map((state) => {
          if (
            (
              !!this.state.value[name].state[state] ||
              (
                states[state].onlyCrownOrRoot === true
              )
            ) &&
            states[state].superior_block !== true
          ) {
            return <div className={
              classnames({
                "state": true,
                [state]: true,
                'has-margin-right': this.state.dataArray[indexRow][name].marginRight,
                'range': !!states[state].range
              })
            }>
              {
                states[state].onlyCrownOrRoot === true ?
                <>
                  {
                    this.state.value[name].state[state].crown === true 
                    ?
                    <img 
                      key="img-1"
                    className={
                      classnames({
                        "img-fluid": true,
                        crown:true,
                      })} src={states[state].image} />
                    :
                    null
                  }
                  {
                    this.state.value[name].state[state].root === true 
                    ?
                    <img 
                    key="img-2"
                    className={
                      classnames({
                        "img-fluid": true,
                        root:true,
                      })} src={states[state].image} />
                    :
                    null
                  }
                </>
                :
                <>
                  {
                    states[state].range ?
                    <>
                      {
                        this.state.dataArray[indexRow][name].marginRight && 
                        this.state.value[name].state[state].middle ?
                        <img 
                          className={
                            classnames({
                              "img-fluid": true,
                            })
                          } 
                          alt="1"
                          src={states[state].image}
                        />
                        :
                        null
                      }
                      <img 
                        alt="2"
                        className={
                          classnames({
                            "img-fluid": true,
                          })
                        } 
                        src={
                          this.state.value[name].state[state].start ?
                          states[state].start : this.state.value[name].state[state].end ?
                          states[state].end:states[state].image
                        }
                      />
                      {
                        this.state.dataArray[indexRow][name].marginRight && 
                        this.state.value[name].state[state].start ?
                        <img 
                          className={
                            classnames({
                              "img-fluid": true,
                            })
                          } 
                          alt="1"
                          src={states[state].image}
                        />
                        :
                        null
                      }
                    </>
                    :
                    <img 
                    
                    alt="3"
                    className={
                      classnames({
                        "img-fluid": true,
                      })} src={states[state].image} />
                  }
                </>
              }


              
            </div>
          }
          return null
        })}
      </>
    }
    return null

  }
  findRenderIllness = (name, part) => {
    if (this.state.value[name] && this.state.value[name].part && this.state.value[name].part[part]) {

      return <>
        {Object.keys(this.state.value[name].part[part]).map((state) => {
          if (this.state.value[name].part[part][state] === true) {
            return <div className={
              classnames({
                "state": true,
                [state]: true
              })
            }>
              <img className={
                classnames({
                  "img-fluid": true,
                })} src={states[state].image} />
            </div>
          }
          return null
        })}
      </>
    }
    return

  }
  /* this.props.form.setFieldValue(this.props.field.name, e.target.value)

  checked={this.props.field.value === option.value} */

  verifyOrCreate = (value, nameTooth) => {
    if (
      !value[nameTooth]
    ) {
      value[nameTooth] = {
        part: {},
        state: {}
      }
    }
    if (
      !value[nameTooth].state
    ) {
      value[nameTooth].state = {}
    }
    return value;

  }

  deleteStateFromRange  = (value,nameTooth,keysToothRow) => {

    if(value[nameTooth].state[this.state.selectedState] ) {
      if(value[nameTooth].state[this.state.selectedState].start  || 
        value[nameTooth].state[this.state.selectedState].middle ||
        value[nameTooth].state[this.state.selectedState].end
        ) {
        let init = undefined;
        let end = undefined;
        for (let index = 0; index < keysToothRow.length; index++) {
          const element = keysToothRow[index];
          if(element === nameTooth) {
            init = index
          }
          if(init !== undefined &&
            value[element] &&
            value[element].state && 
            value[element].state[this.state.selectedState] && 
            value[element].state[this.state.selectedState].end) { 
              end = index
              break;
          }
        }
        for (let index = end; index >= 0; index--) {
          const element = keysToothRow[index];
          if(
            value[element].state[this.state.selectedState] 
          ) {
              if ( 
                value[element].state[this.state.selectedState].start
              ) {
                value[element].state[this.state.selectedState] = undefined;
                break;
              }
              value[element].state[this.state.selectedState] = undefined;
          }
        }
      }
    }
    return value;
  }

  selectWholeTooth = (nameTooth, indexRow) => {
    let value = { ...this.state.value };
    let startIndex;
    if (this.state.selectedTooth && this.state.selectedState) {
      value = this.verifyOrCreate(value, nameTooth);
      if (states[this.state.selectedState].range === true) {
        let keysToothRow = Object.keys(this.state.dataArray[indexRow]);
        if (this.state.start === undefined) {
          
          if(value[nameTooth].state[this.state.selectedState] &&
           ( value[nameTooth].state[this.state.selectedState].start === true  ||
            value[nameTooth].state[this.state.selectedState].middle === true ||
            value[nameTooth].state[this.state.selectedState].end ===  true )
          ) {
            value = this.deleteStateFromRange(value, nameTooth,keysToothRow);
          } else {
            value = this.deleteStateFromRange(value, nameTooth,keysToothRow);
            value[nameTooth].state[this.state.selectedState] = {
              start:true
            }
            startIndex = nameTooth;
          }
          
          /* for (let index = 0; index < keysToothRow.length; index++) {
            const element = keysToothRow[index];
            value = this.verifyOrCreate(value, element);
            value[element].state[this.state.selectedState] = false;
          } */
          /* value[nameTooth].state[this.state.selectedState] = !(
            value[nameTooth].state[this.state.selectedState]
          ); */

         /*  if(value[nameTooth].state[this.state.selectedState]){
            let startIndexTemp;
            for (let index = 0; index < keysToothRow.length; index++) {
              const element = keysToothRow[index];
              if(nameTooth === element) {
                
              }
               value = this.verifyOrCreate(value, element);
              if(startIndexTemp)
              value[element].state[this.state.selectedState] = false; 
            }
            value[nameTooth].state[this.state.selectedState]
          } */
        } else {
          let keysToothRow = Object.keys(this.state.dataArray[indexRow]);
          value = this.deleteStateFromRange(value, nameTooth,keysToothRow);
          let start;
          let end;
          for (let index = 0; index < keysToothRow.length; index++) {
            const element = keysToothRow[index];
            if(element === this.state.start) {
              start = index
            }
            if (element === nameTooth) {
              end = index;
            }

            /* value = this.verifyOrCreate(value, element);
            if (value[element].state[this.state.selectedState] === true) {
              start = index
            } */
          }
          /* for (let index = 0; index < keysToothRow.length; index++) {
            const element = keysToothRow[index];
            if (element === nameTooth) {
              end = index;
            }
          } */
          if (end > start) {
            for (let index = start; index <= end; index++) {
              const element = keysToothRow[index];
              value = this.verifyOrCreate(value, element);
              value[element].state[this.state.selectedState] = {
                start:index === start,
                middle: !(index === start || index === end),
                end:index === end
              }
            }
          } else {
            for (let index = end; index <= start; index++) {
              const element = keysToothRow[index];
              value = this.verifyOrCreate(value, element);
              value[element].state[this.state.selectedState] = {
                start:index === end,
                middle: !(index === start || index === end),
                end:index === start
              }
            }
          }

        }
      } else {
        if(states[this.state.selectedState].disableOnLastItems &&
          (
            nameTooth === '28_' ||
            nameTooth === '65_' ||
            nameTooth === '75_' ||
            nameTooth === '38_' 
          )
          ) {
          return true;
        }
        if(states[this.state.selectedState].options) {
          if(states[this.state.selectedState].onlySections) {
            let flag = false;
            for (let partKey in value[nameTooth].part ) {
              if( value[nameTooth].part[partKey][this.state.selectedState] ) {
                flag = true;
              }
            }
            
            if(this.state.selectedState && this.state.selectedSubOption) {
              if(value[nameTooth].state[this.state.selectedState]) {
                value[nameTooth].state[this.state.selectedState] = {
                  option:{
                    ...value[nameTooth].state[this.state.selectedState].option,
                    [this.state.selectedSubOption]: value[nameTooth].state[this.state.selectedState].option[this.state.selectedSubOption]
                  }
                };
              } else {
                value[nameTooth].state[this.state.selectedState] = {
                  option: {
                    [this.state.selectedSubOption]: true
                  }
                };
              }
            } else {
              value[nameTooth].state[this.state.selectedState] = undefined
            }
          } else {
            if(value[nameTooth].state[this.state.selectedState]) {
              if ( 
                this.state.selectedSubOption && value[nameTooth].state[this.state.selectedState].option[this.state.selectedSubOption]
              ) {
                delete value[nameTooth].state[this.state.selectedState].option[this.state.selectedSubOption];
              } else if( !this.state.selectedSubOption) {
                value[nameTooth].state[this.state.selectedState]= undefined;
              } else {
                
                if(this.state.selectedState === 'tratamiento_pulpar') {
                  if(this.state.selectedSubOption) {
                    let text = (value.especificaciones || "") + "Pieza " + nameTooth + " " + states[this.state.selectedState].options[this.state.selectedSubOption].text + '\n';
                    value.especificaciones = text
                  }
                }
                value[nameTooth].state[this.state.selectedState] = {
                  option: {
                    ...value[nameTooth].state[this.state.selectedState].option,
                    [this.state.selectedSubOption]: true
                  }
                };
              }
            } else {
              if(this.state.selectedState === 'tratamiento_pulpar') {
                if(this.state.selectedSubOption) {
                  let text = (value.especificaciones || "") + "Pieza " + nameTooth + " " + states[this.state.selectedState].options[this.state.selectedSubOption].text + '\n';
                  value.especificaciones = text
                }
              }
              if(this.state.selectedSubOption){
                
                value[nameTooth].state[this.state.selectedState] = {
                  option: {
                    [this.state.selectedSubOption]: true
                  }
                };
              } else {
                
                value[nameTooth].state[this.state.selectedState] = {
                  option: {}
                };
              }
              /* value[nameTooth].state[this.state.selectedState] = {
                option: {
                  [this.state.selectedSubOption]: true
                }
              }; */
            }
          }
        } else {
          value[nameTooth].state[this.state.selectedState] = !(
            value[nameTooth].state[this.state.selectedState]
          );
        }
      }
      this.setState({
        value,
        start: startIndex
      })
      if (this.props.onChange) {
        this.props.onChange(value)
      }
      //this.forceUpdate();
    }
  }

  handleRootOrCrown = (nameTooth,crownOrRoot) => () => {
    if(
      this.state.selectedTooth !== nameTooth
    ){
      return
    }
    if (!this.state.selectedState) {
      return
    }
    if (
      states[this.state.selectedState] && states[this.state.selectedState].onlyCrownOrRoot !== true
    ) {
      return true;
    }
    let value = { ...this.state.value };
    if (this.state.selectedTooth && this.state.selectedState) {
      value = this.verifyOrCreate(value, nameTooth);
      
      value[nameTooth].state[this.state.selectedState] = {
        ...value[nameTooth].state[this.state.selectedState],
        [crownOrRoot]: !(value[nameTooth].state[this.state.selectedState] ? value[nameTooth].state[this.state.selectedState][crownOrRoot] : false)
      }
      this.setState({
        value,
      })
      if (this.props.onChange) {
        this.props.onChange(value)
      }
      //this.forceUpdate();
    }

  }

  selectPart = (nameTooth, part) => () => {
    //superior_block_option
    if(
      this.state.selectedTooth !== nameTooth
    ){
      return
    }
    if (!this.state.selectedState) {
      return
    }
    if (
      states[this.state.selectedState] && states[this.state.selectedState].onlySections !== true
    ) {
      return true;
    }
    let value = { ...this.state.value };
    if (
      !value[nameTooth]
    ) {
      value[nameTooth] = {
        part: {

        }
      }
    }

    if (
      !value[nameTooth].part
    ) {
      value[nameTooth].part = {
        [part]: {
        }
      }
    }
    if (
      !value[nameTooth].part[part]
    ) {
      value[nameTooth].part[part] = {
      }
    }
    value[nameTooth].part[part][this.state.selectedState] = !(
      value &&
      value[nameTooth] &&
      value[nameTooth].part[part][this.state.selectedState]
    );
    this.setState({
      value
    })
    if (this.props.onChange) {
      this.props.onChange(value)
    }
    //this.forceUpdate();
  }

  clean = () => {
    this.setState({
      value: {}
    })
    if (this.props.onChange) {
      this.props.onChange({})
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({ value: this.props.value })
    }
  }

  renderSingleTooth = (tooths, tooth, name, indexRow) => {
    let foundStates;
    let renderState = null;
    foundStates = Object.keys(states).filter((state) => {
      return this.state.value[name] && this.state.value[name][state]
    })
    if (foundStates.length > 0) {
      renderState = <img
        src={states[foundStates[0]].image}
      />
    }
    let renderTooth = null;
    if (tooth.type === 1) {
      renderTooth = <div>
        <div className="tooth-display-name">{name.replace('_', '')}</div>
        <div
          className={classnames({
            reverse: tooth.reverse,
            tooth: true,
            marginRight: tooth.marginRight
          })}
        >
          <div onClick={this.handleRootOrCrown(name,'root')} className="root">
            <div className="root-1-type-1" />
            <div className="root-2-type-1" />
            <div className="root-3-type-1" />
            <div className="root-4-type-1" />
            <div className="root-5-type-1" />
            <div className="root-6-type-1" />
          </div>
          <div onClick={this.handleRootOrCrown(name,'crown')} className="crown">
            <div
              className={classnames({
                "outtooth": true,
                // caries: this.findIllness('caries', name, 'outtooth'),
              })}
              //onClick={this.selectPart(name, "outtooth")}
            >
              
              {
                [
                  "parts-1",
                  "parts-2",
                  "parts-3",
                  "parts-4",
                ].map((part) => {
                  return (
                    <div
                      onClick={this.selectPart(name, part)}
                      className={classnames({
                        [part]: true,
                        //caries: this.findIllness('caries', name, 'parts-1-type-1'),
                      })}>
                      {this.findRenderIllness(name, part)}
                    </div>
                  )
                })
              }
            </div>
            <div className="intooth">
              {
                [
                  "parts-1-type-1",
                  "parts-2-type-1",
                  "parts-3-type-1",
                  "parts-4-type-1",
                  "parts-5-type-1",
                  "parts-6-type-1",
                ].map((part) => {
                  return (
                    <div
                      onClick={this.selectPart(name, part)}
                      className={classnames({
                        [part]: true,
                        //caries: this.findIllness('caries', name, 'parts-1-type-1'),
                      })}>
                      {this.findRenderIllness(name, part)}
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    }
    if (tooth.type === 2) {

      renderTooth = <div>
        <div className="tooth-display-name">{name.replace('_', '')}</div>
        <div className={classnames({
          reverse: tooth.reverse,
          tooth: true,
          marginRight: tooth.marginRight
        })}>
          <div onClick={this.handleRootOrCrown(name,'root')} className="root">
            <div className="root-1-type-1" />
            <div className="root-2-type-1" />
            <div className="root-3-type-1" />
            <div className="root-4-type-1" />
            <div className="root-5-type-1" />
            <div className="root-6-type-1" />
          </div>
          <div onClick={this.handleRootOrCrown(name,'crown')} className="crown">
            <div
              className={classnames({
                "outtooth": true,
                //caries: this.findIllness('caries', name, 'outtooth'),
              })}
              //onClick={this.selectPart(name, "outtooth")}
            >
              {
                [
                  "parts-1",
                  "parts-2",
                  "parts-3",
                  "parts-4",
                ].map((part) => {
                  return (
                    <div
                      onClick={this.selectPart(name, part)}
                      className={classnames({
                        [part]: true,
                        //caries: this.findIllness('caries', name, 'parts-1-type-1'),
                      })}>
                      {this.findRenderIllness(name, part)}
                    </div>
                  )
                })
              }
            </div>
            <div className="intooth">
              {
                [
                  "parts-1-type-2",
                  "parts-2-type-2",
                  "parts-3-type-2",
                  "parts-4-type-2",
                ].map((part) => {
                  return (
                    <div
                      onClick={this.selectPart(name, part)}
                      className={classnames({
                        [part]: true,
                        //caries: this.findIllness('caries', name, 'parts-1-type-1'),
                      })}>
                      {this.findRenderIllness(name, part)}
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    }
    if (tooth.type === 3) {

      renderTooth = <div>
        <div className="tooth-display-name">{name.replace('_', '')}</div>
        <div className={classnames({
          reverse: tooth.reverse,
          tooth: true,
          marginRight: tooth.marginRight
        })}>
          <div onClick={this.handleRootOrCrown(name,'root')} className="root">
            <div className="root-1-type-2" />
            <div className="root-2-type-2" />

          </div>
          <div onClick={this.handleRootOrCrown(name,'crown')} className="crown">
            <div className="outtooth">
              {
                [
                  "parts-1",
                  "parts-2",
                  "parts-3",
                  "parts-4",
                ].map((part) => {
                  return (
                    <div
                      className={classnames({
                        [part]: true,
                        //caries: this.findIllness('caries', name, 'parts-1-type-1'),
                      })}
                      onClick={this.selectPart(name, part)}
                    >
                      {this.findRenderIllness(name, part)}
                    </div>
                  )
                })
              }
            </div>
            <div className="intooth">
              {
                [
                  "parts-1-type-3",
                  "parts-2-type-3",
                ].map((part) => {
                  return (
                    <div
                      onClick={this.selectPart(name, part)}
                      className={classnames({
                        [part]: true,
                        //caries: this.findIllness('caries', name, 'parts-1-type-1'),
                      })}>
                      {this.findRenderIllness(name, part)}
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    }
    if (tooth.type === 4) {

      renderTooth = <div>
        <div className="tooth-display-name">{name.replace('_', '')}</div>
        <div className={classnames({
          reverse: tooth.reverse,
          tooth: true,
          marginRight: tooth.marginRight
        })}>
          <div onClick={this.handleRootOrCrown(name,'root')} className="root">
            <div className="root-1-type-3" />
            <div className="root-2-type-3" />
            <div className="root-3-type-3" />
            <div className="root-4-type-3" />
          </div>
          <div onClick={this.handleRootOrCrown(name,'crown')} className="crown">
            <div className="outtooth">
              {
                [
                  "parts-1",
                  "parts-2",
                  "parts-3",
                  "parts-4",
                ].map((part) => {
                  return (
                    <div
                      onClick={this.selectPart(name, part)}
                      className={classnames({
                        [part]: true,
                        //caries: this.findIllness('caries', name, 'parts-1-type-1'),
                      })}>
                      {this.findRenderIllness(name, part)}
                    </div>
                  )
                })
              }
            </div>
            <div className="intooth">

              {
                [
                  "parts-1-type-3",
                  "break-tooth",
                  "parts-2-type-3",
                ].map((part) => {
                  if (part === "break-tooth") {
                    return <div className="break-tooth"></div>
                  }
                  return (
                    <div
                      onClick={this.selectPart(name, part)}
                      className={classnames({
                        [part]: true,
                        //caries: this.findIllness('caries', name, 'parts-1-type-1'),
                      })}>
                      {this.findRenderIllness(name, part)}
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    }
    if (tooth.type === 5) {

      renderTooth = <div>
        <div className="tooth-display-name">{name.replace('_', '')}</div>
        <div className={classnames({
          reverse: tooth.reverse,
          tooth: true,
          marginRight: tooth.marginRight
        })}>
          <div onClick={this.handleRootOrCrown(name,'root')} className="root">
            <div className="root-1-type-2" />
            <div className="root-2-type-2" />
          </div>
          <div onClick={this.handleRootOrCrown(name,'crown')} className="crown">
            <div className="outtooth">
              {
                [
                  "parts-1",
                  "parts-2",
                  "parts-3",
                  "parts-4",
                ].map((part) => {
                  return (
                    <div
                      onClick={this.selectPart(name, part)}
                      className={classnames({
                        [part]: true,
                        //caries: this.findIllness('caries', name, 'parts-1-type-1'),
                      })}>
                      {this.findRenderIllness(name, part)}
                    </div>
                  )
                })
              }
            </div>
            <div
              onClick={this.selectPart(name, "type-2")}
              className={classnames({
                "intooth type-2": true
              })}
            >
              {this.findRenderIllness(name, "type-2")}
            </div>
          </div>
        </div>
      </div>
    }
    if (tooth.type === 6) {

      renderTooth = <div>
        <div className="tooth-display-name">{name.replace('_', '')}</div>
        <div className={classnames({
          reverse: tooth.reverse,
          tooth: true,
          marginRight: tooth.marginRight
        })}>
          <div onClick={this.handleRootOrCrown(name,'root')} className="root">
            <div className="root-1-type-1" />
            <div className="root-2-type-1" />
            <div className="root-3-type-1" />
            <div className="root-4-type-1" />
            <div className="root-5-type-1" />
            <div className="root-6-type-1" />
          </div>
          <div onClick={this.handleRootOrCrown(name,'crown')} className="crown">
            <div
              className={classnames({
                "outtooth": true,
                //caries: this.findIllness('caries', name, "outtooth"),
              })}
              //onClick={this.selectPart(name, "outtooth")}
              >
              
              {
                [
                  "parts-1",
                  "parts-2",
                  "parts-3",
                  "parts-4",
                ].map((part) => {
                  return (
                    <div
                      onClick={this.selectPart(name, part)}
                      className={classnames({
                        [part]: true,
                        //caries: this.findIllness('caries', name, 'parts-1-type-1'),
                      })}>
                      {this.findRenderIllness(name, part)}
                    </div>
                  )
                })
              }
            </div>
            <div className="intooth">

              {
                [
                  "parts-1-type-4",
                  "parts-2-type-4",
                  "parts-3-type-4",
                  "parts-4-type-4",
                  "parts-5-type-4",
                ].map((part) => {
                  return (
                    <div
                      onClick={this.selectPart(name, part)}
                      className={classnames({
                        [part]: true,
                        //caries: this.findIllness('caries', name, 'parts-1-type-1'),
                      })}>
                      {this.findRenderIllness(name, part)}
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    }
    return <div
      className={
        classnames({
          "wrap-tooth":true,
          reverseTooth: tooth.reverse
        })
      }
      onClick={(e) => {
        if(
          this.state.selectedRow === indexRow &&
          this.state.selectedTooth === name
        ){
          if (this.state.selectedState) {
            if (
              states[this.state.selectedState].range === true ||
              states[this.state.selectedState].wholeTooth === true ||
              (states[this.state.selectedState].onlySections === true && states[this.state.selectedState].superior_block_option === true)
            ) {
              this.selectWholeTooth(name, indexRow)
            }
          }
        }
        this.setState({
          selectedRow: indexRow,
          selectedTooth: name
        })
      }}>
      {renderTooth}
      {this.findRenderToothWholeIllness(name, indexRow)}
      {/* <div className="state">
        {renderState}
      </div> */}

    </div>

  }

  handleOption = (key) => () => {
    let subOptionSelected = undefined;
    if (states[key] && states[key].options) {
      let options = Object.keys(states[key].options)
      subOptionSelected = options[0]
    }

    this.setState({
      selectedState: key,
      selectedSubOption: undefined,
      start: undefined
    })
  }

  setSubOption = (subOption) => () => {
    this.setState({
      selectedSubOption: subOption
    })
  }

  render() {
    return <>

      <div className="wrap-odontogram">
        <div className="odontogram">
          <div className="w-in-od">

            {
              this.renderTooths(this.state.dataArray[1], 0)
            }
            {
              this.renderTooths(this.state.dataArray[0], 1)
            }
            {
              this.renderTooths(this.state.dataArray[0], 0)
            }
            {
              this.state.dataArray.map((tooths, indexRow) => {
                return <div className={
                  classnames({
                    "wrap-tooths":true,
                    numbersAtBottom: indexRow === 3 ||  indexRow === 1
                  })}>
                  {
                    Object.keys(tooths).map((tooth) => {
                      return this.renderSingleTooth(tooths, tooths[tooth], tooth, indexRow)
                    })
                  }
                </div>
              })
            }
            {
              this.renderTooths(this.state.dataArray[3], 0)
            }
            {
              this.renderTooths(this.state.dataArray[3], 1)
            }
            {
              this.renderTooths(this.state.dataArray[2], 0)
            }
          </div>
        </div>

        <div className="right-odontogram-options">
          <button type="button" onClick={this.clean}>Limpiar</button>
          <div className="right-side-options">
            <div className={
              classnames({
                "odontogram preview":true,
                ['row-' + this.state.selectedRow]: true
              })
              }>
              Diente
              {
                (this.state.selectedRow !== null && this.state.selectedTooth !== null) ?
                  this.renderSingleTooth(
                    this.state.dataArray[this.state.selectedRow], 
                    this.state.dataArray[this.state.selectedRow][this.state.selectedTooth], 
                    this.state.selectedTooth, 
                    this.state.selectedRow
                  )
                  :
                  null
              }
              {
                this.state.selectedState && states[this.state.selectedState] && states[this.state.selectedState].options ?
                  <div className="wrap-options">
                    <div className={classnames({
                      option: true,
                      active: this.state.selectedSubOption === undefined
                      })} onClick={this.setSubOption()} >
                      {/* <img src={states[this.state.selectedState].options[opt].image} /> */}
                    </div>
                    {Object.keys(states[this.state.selectedState].options).map((opt) => {
                      return <div className={classnames({
                        option: true,
                        active: this.state.selectedSubOption === opt
                        })} onClick={this.setSubOption(opt)} >
                        <img src={states[this.state.selectedState].options[opt].image} />
                      </div>
                    })}
                  </div>
                  :
                  null
              }
              <div>
                {/* preview */}
              </div>
            </div>
            <div>
              <div className="row-img-od">
                <div data-tip="Aparato ortodontico fijo" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'ap_ortodontico_fijo_bueno'
                })} onClick={this.handleOption('ap_ortodontico_fijo_bueno')}>
                  <img src={ap_ortodontico_fijo_bueno} />
                </div>
                <div data-tip="Aparato ortodontico fijo" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'ap_ortodontico_fijo_malo'
                })} onClick={this.handleOption('ap_ortodontico_fijo_malo')}>
                  <img src={ap_ortodontico_fijo_malo} />
                </div>
                <div data-tip="Caries" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'caries'
                })} onClick={this.handleOption('caries')}>
                  <img src={caries} />
                </div>
              </div>
              <div className="row-img-od">
                <div data-tip="Aparato ortodontico removible" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'ap_ortodontico_removible_bueno'
                })} onClick={this.handleOption('ap_ortodontico_removible_bueno')}>
                  <img src={ap_ortodontico_removible_bueno} />
                </div>
                <div data-tip="Aparato ortodontico removible" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'ap_ortodontico_removible_malo'
                })} onClick={this.handleOption('ap_ortodontico_removible_malo')}>
                  <img src={ap_ortodontico_removible_malo} />
                </div>
                <div data-tip="Desgaste oclusal" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'desgaste_oclusal'
                })} onClick={this.handleOption('desgaste_oclusal')}>
                  <img src={desgaste_oclusal} />
                </div>
              </div>
              <div className="row-img-od">

                <div data-tip="Corona definitiva" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'corona_definitiva'
                })} onClick={this.handleOption('corona_definitiva')}>
                  <img src={corona_definitiva} />
                </div>
                <div data-tip="Corono temporal" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'corona_temporal'
                })} onClick={this.handleOption('corona_temporal')}>
                  <img src={corona_temporal} />
                </div>
                <div data-tip="Diente discronico" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'diente_discromico'
                })} onClick={this.handleOption('diente_discromico')}>
                  <img src={diente_discromico} />
                </div>
              </div>
              <div className="row-img-od">
                <div data-tip="Diastema" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'diastema'
                })} onClick={this.handleOption('diastema')}>
                  <img src={diastema} />
                </div>
                <div data-tip="Diente ausente" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'diente_ausente'
                })} onClick={this.handleOption('diente_ausente')}>
                  <img src={diente_ausente} />
                </div>
                <div data-tip="Diente extraido" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'diemte_extraido'
                })} onClick={this.handleOption('diemte_extraido')}>
                  <img src={diemte_extraido} />
                </div>
              </div>
              <div className="row-img-od">
                
                <div data-tip="Diente en clavija" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'diente_en_clavija'
                })} onClick={this.handleOption('diente_en_clavija')}>
                  <img src={diente_en_clavija} />
                </div>
                <div data-tip="Diente extruido" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'diente_extruido'
                })} onClick={this.handleOption('diente_extruido')}>
                  <img src={diente_extruido} />
                </div>
                <div data-tip="Diente intruido" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'diente_intruido'
                })} onClick={this.handleOption('diente_intruido')}>
                  <img src={diente_intruido} />
                </div>
              </div>

              <div className="row-img-od">
                <div data-tip="Edentulo total" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'edentulo_total'
                })} onClick={this.handleOption('edentulo_total')}>
                  <img src={edentulo_total} />
                </div>
                <div data-tip="Fractura" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'fractura'
                })} onClick={this.handleOption('fractura')}>
                  <img src={fractura} />
                </div>
                <div data-tip="Giroversión izquierda" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'giroversion_izquierda'
                })} onClick={this.handleOption('giroversion_izquierda')}>
                  <img src={giroversion_izquierda} />
                </div>
                
              </div>

              <div className="row-img-od">
                <div data-tip="Impactación" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'impactacion'
                })} onClick={this.handleOption('impactacion')}>
                  <img src={impactacion} />
                </div>
                <div data-tip="Implante" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'implante'
                })} onClick={this.handleOption('implante')}>
                  <img src={implante} />
                </div>
                <div data-tip="Giroversión derecha" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'giroversion'
                })} onClick={this.handleOption('giroversion')}>
                  <img src={giroversion} />
                </div>
              </div>
              <div className="row-img-od">
                
                <div data-tip="Macrodoncia" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'macrodoncia'
                })} onClick={this.handleOption('macrodoncia')}>
                  <img src={macrodoncia} />
                </div>
                <div data-tip="Microdoncia" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'microdoncia'
                })} onClick={this.handleOption('microdoncia')}>
                  <img src={microdoncia} />
                </div>
                <div data-tip="Migración derecha" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'migracion'
                })} onClick={this.handleOption('migracion')}>
                  <img src={migracion} />
                </div>
              </div>
              <div className="row-img-od">
                <div data-tip="Migración izquierda" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'migracion_izquierda'
                })} onClick={this.handleOption('migracion_izquierda')}>
                  <img src={migracion_izquierda} />
                </div>
                <div data-tip="Movilidad" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'movilidad'
                })} onClick={this.handleOption('movilidad')}>
                  <img src={movilidad} />
                </div>
                <div data-tip="Prótesis fija" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'protesis_fija_buena'
                })} onClick={this.handleOption('protesis_fija_buena')}>
                  <img src={protesis_fija_buena} />
                </div>
              </div>

              <div className="row-img-od">
                <div data-tip="Prótesis fija" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'protesis_fija_malo'
                })} onClick={this.handleOption('protesis_fija_malo')}>
                  <img src={protesis_fija_malo} />
                </div>
                <div data-tip="Prótesis total" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'protesis_total_buena'
                })} onClick={this.handleOption('protesis_total_buena')}>
                  <img src={protesis_total_buena} />
                </div>
                <div data-tip="Prótesis total" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'protesis_total_malo'
                })} onClick={this.handleOption('protesis_total_malo')}>
                  <img src={protesis_total_malo} />
                </div>
              </div>
              <div className="row-img-od">
                <div data-tip="Remanente radicular" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'remanente_radicular'
                })} onClick={this.handleOption('remanente_radicular')}>
                  <img src={remanente_radicular} />
                </div>
                <div data-tip="Prótesis removible" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'protesis_removible_bueno'
                })} onClick={this.handleOption('protesis_removible_bueno')}>
                  <img src={protesis_removible_bueno} />
                </div>
                <div data-tip="Prótesis removible" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'protesis_removible_malo'
                })} onClick={this.handleOption('protesis_removible_malo')}>
                  <img src={protesis_removible_malo} />
                </div>
              </div>
              <div className="row-img-od">
                <div data-tip="Restauración" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'restauracion'
                })} onClick={this.handleOption('restauracion')}>
                  <img src={restauracion} />
                </div>
                <div data-tip="Restauración temporal" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'restauracion_temporal'
                })} onClick={this.handleOption('restauracion_temporal')}>
                  <img src={restauracion_temporal} />
                </div>
                <div data-tip="Supernumerario" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'supernumerario'
                })} onClick={this.handleOption('supernumerario')}>
                  <img src={supernumerario} />
                </div>
              </div>
              <div className="row-img-od">
              
                <div data-tip="Transposición" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'transposicion'
                })} onClick={this.handleOption('transposicion')}>
                  <img src={transposicion} />
                </div>
                <div data-tip="Tratamiento pulpar" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'tratamiento_pulpar'
                })} onClick={this.handleOption('tratamiento_pulpar')}>
                  <img src={tratamiento_pulpar} />
                </div>
                <div data-tip="Tratamiento pulpar" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'trat_pulpar_malo'
                })} onClick={this.handleOption('trat_pulpar_malo')}>
                  <img src={trat_pulpar_malo} />
                </div>
                {/* <div
                  //data-tip="semi_impactacion" 
                  className={classnames({
                    "img": true,
                    "active": this.state.selectedState === 'semi_impactacion'
                  })}
                //onClick={this.handleOption('semi_impactacion')}
                >
                   <img src={semi_impactacion} /> 
                </div> */}
              </div>
              <div className="row-img-od">
                <div data-tip="Geminación o fusión" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'geminacion_fusion'
                })} onClick={this.handleOption('geminacion_fusion')}>
                  <img src={geminacion_fusion} />
                </div>
                <div data-tip="Perno" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'perno_bueno'
                })} onClick={this.handleOption('perno_bueno')}>
                  <img src={perno_bueno} />
                </div>
                <div data-tip="Perno" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'perno_malo'
                })} onClick={this.handleOption('perno_malo')}>
                  <img src={perno_malo} />
                </div>
              </div>
              <div className="row-img-od">
                <div data-tip="Sellante" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'sellante_bueno'
                })} onClick={this.handleOption('sellante_bueno')}>
                  <img src={sellante_bueno} />
                </div>
                <div data-tip="Sellante" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'sellante_malo'
                })} onClick={this.handleOption('sellante_malo')}>
                  <img src={sellante_malo} />
                </div>
                {/* <div data-tip="perno_malo" className={classnames({
                  "img": true,
                  "active": this.state.selectedState === 'perno_malo'
                })} onClick={this.handleOption('perno_malo')}>
                  <img src={perno_malo} />
                </div> */}
                <div 
                  //data-tip="sellante_bueno" 
                  className={classnames({
                  "img": true,
                  //"active": this.state.selectedState === 'sellante_bueno'
                })} 
                  //onClick={this.handleOption('sellante_bueno')}
                  >
                  {/* <img src={sellante_bueno} /> */}
                </div>
              </div>

              
              
              {/* <div className="row-img-od">
                <div data-tip="corona_definitiva_CJ" className={classnames({
                  "img":true,
                  "active": this.state.selectedState === 'corona_definitiva_CJ'
                 })} onClick={this.handleOption('corona_definitiva_CJ')}>
                  <img src={corona_definitiva_CJ} />
                </div>
                <div data-tip="restauracion_R" className={classnames({
                  "img":true,
                  "active": this.state.selectedState === 'restauracion_R'
                 })} onClick={this.handleOption('restauracion_R')}>
                  <img src={restauracion_R} />
                </div>
                <div data-tip="corona_definitiva_CF" className={classnames({
                  "img":true,
                  "active": this.state.selectedState === 'corona_definitiva_CF'
                 })} onClick={this.handleOption('corona_definitiva_CF')}>
                  <img src={corona_definitiva_CF} />
                </div>
              </div>
              <div className="row-img-od">
                <div data-tip="corona_definitiva_CC" className={classnames({
                  "img":true,
                  "active": this.state.selectedState === 'corona_definitiva_CC'
                 })} onClick={this.handleOption('corona_definitiva_CC')}>
                  <img src={corona_definitiva_CC} />
                </div>
                <div data-tip="corona_definitiva_CMC" className={classnames({
                  "img":true,
                  "active": this.state.selectedState === 'corona_definitiva_CMC'
                 })} onClick={this.handleOption('corona_definitiva_CMC')}>
                  <img src={corona_definitiva_CMC} />
                </div>
                <div data-tip="corona_definitiva_CV" className={classnames({
                  "img":true,
                  "active": this.state.selectedState === 'corona_definitiva_CV'
                 })} onClick={this.handleOption('corona_definitiva_CV')}>
                  <img src={corona_definitiva_CV} />
                </div>
              </div>
              <div className="row-img-od">
                <div data-tip="restauracion_IM" className={classnames({
                  "img":true,
                  "active": this.state.selectedState === 'restauracion_IM'
                 })} onClick={this.handleOption('restauracion_IM')}>
                  <img src={restauracion_IM} />
                </div>
                <div data-tip="restauracion_AM" className={classnames({
                  "img":true,
                  "active": this.state.selectedState === 'restauracion_AM'
                 })} onClick={this.handleOption('restauracion_AM')}>
                  <img src={restauracion_AM} />
                </div>
                <div data-tip="restauracion_IV" className={classnames({
                  "img":true,
                  "active": this.state.selectedState === 'restauracion_IV'
                 })} onClick={this.handleOption('restauracion_IV')}>
                  <img src={restauracion_IV} />
                </div>
              </div>
              <div className="row-img-od">
                <div data-tip="tratamiento_pulpar_PC" className={classnames({
                  "img":true,
                  "active": this.state.selectedState === 'tratamiento_pulpar_PC'
                 })} onClick={this.handleOption('tratamiento_pulpar_PC')}>
                  <img src={tratamiento_pulpar_PC} />
                </div>
                <div data-tip="restauracion_IE" className={classnames({
                  "img":true,
                  "active": this.state.selectedState === 'restauracion_IE'
                 })} onClick={this.handleOption('restauracion_IE')}>
                  <img src={restauracion_IE} />
                </div>
                <div data-tip="tratamiento_pulpar_PP" className={classnames({
                  "img":true,
                  "active": this.state.selectedState === 'tratamiento_pulpar_PP'
                 })} onClick={this.handleOption('tratamiento_pulpar_PP')}>
                  <img src={tratamiento_pulpar_PP} />
                </div>
              </div>
              <div className="row-img-od">
                <div data-tip="diente_ectopico" className={classnames({
                  "img":true,
                  "active": this.state.selectedState === 'diente_ectopico'
                 })} onClick={this.handleOption('diente_ectopico')}>
                  <img src={diente_ectopico} />
                </div>
                <div data-tip="tratamiento_pulpar_TC" className={classnames({
                  "img":true,
                  "active": this.state.selectedState === 'tratamiento_pulpar_TC'
                 })} onClick={this.handleOption('tratamiento_pulpar_TC')}>
                  <img src={tratamiento_pulpar_TC} />
                </div>
                <div className="img"></div>
              </div> */}

            </div>

          </div>

          <div >
            <div className="border-s">
              <div>
                Especificaciones
              </div>
              <textarea 
                value={this.state.value.especificaciones}
                onChange={this.setText}
              />
            </div>
          </div>
        </div>
        <ReactTooltip />
      </div>
    </>
  }

  setText = (event) => {
    let v = {...this.state.value};
    v.especificaciones = event.target.value
    this.setState({
      value:v
    })
    if (this.props.onChange) {
      this.props.onChange(v)
    }
  }
}