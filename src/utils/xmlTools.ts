//import { json2xml } from 'xml-js';
import { ResponsibleType, SchoolType, StudentType } from '../types';
import { getXMLfromJSON, signOriginalChain} from '../api';

export const getXMLinJSON = (student: StudentType, school:SchoolType, responsibles: ResponsibleType[], signatures:string[]) =>{
    const xmlVersion ="1.0"
    //const xmlVersion =""
    const folioControl=student.folio
    const cveInstitucion=school.claveInstitucion
    const nombreInstitucion=school.nombre
    const cveCarrera=student.carrera.split(" -- ")[0]
    const numeroRvoe=student.carrera.split(" -- ")[1]
    const nombreCarrera=student.carrera.split(" -- ")[2]
    const fechaInicio=student.fechaInicio
    const fechaTerminacion=student.fechaTermino
    const idAutorizacionReconocimiento=student.autorizacion.split(" -- ")[0]
    const autorizacionReconocimiento=student.autorizacion.split(" -- ")[1]
    const curp=student.curp
    const nombre=student.nombre
    const primerApellido=student.primerApellido
    const segundoApellido=student.segundoApellido
    const correoElectronico=student.email
    const fechaExpedicion=student.fechaExpedicion
    const idModalidadTitulacion=student.modalidadTitulacion.split(" -- ")[0]
    const modalidadTitulacion=student.modalidadTitulacion.split(" -- ")[1]
    const fechaExamenProfesional=student.fechaExamenProfesional
    const fechaExencionExamenProfesional=student.fechaExcencionExamenProfesional
    const cumplioServicioSocial=student.cumplioServicioSocial.split(" -- ")[0]
    const idFundamentoLegalServicioSocial=student.fundamentoLegalServicioSocial.split(" -- ")[0]
    const fundamentoLegalServicioSocial=student.fundamentoLegalServicioSocial.split(" -- ")[1]
    const idEntidadFederativa=student.entidadFederativa.split(" -- ")[0]
    const entidadFederativa=student.entidadFederativa.split(" -- ")[1]
    const institucionProcedencia=student.escuelaProcedencia
    const idTipoEstudioAntecedente=student.tipoEstudioAntecedente.split(" -- ")[0]
    const tipoEstudioAntecedente=student.tipoEstudioAntecedente.split(" -- ")[1]
    const idEntidadFederativaAntecedente=student.entidadFederativaAntecedente.split(" -- ")[0]
    const entidadFederativaAntecedente=student.entidadFederativaAntecedente.split(" -- ")[1]
    const fechaInicioAntecedente=student.fechaInicioAntecedente
    const fechaTerminacionAntecedente=student.fechaTerminoAntecedente
    const noCedula=student.numeroCedulaAntecedente

    let responsiblesXML: { [key: string]: any }[] = [];
    responsibles.forEach((responsible, i) => {
        const curp = responsible.curp
        const nombre = responsible.nombre
        const primerApellido = responsible.primerApellido
        const segundoApellido = responsible.segundoApellido
        const idCargo = responsible.cargo.split(" -- ")[0]
        const cargo = responsible.cargo.split(" -- ")[1]
        const abrTitulo = responsible.titulo
        const certificadoResponsable = responsible.certificadoOriginal
        const noCertificadoResponsable = responsible.numeroCertificado
        const sello = signatures[i];
        responsiblesXML.push({
            'FirmaResponsable':{
                "$":{
                    "nombre":nombre,
                    "primerApellido":primerApellido,
                    "segundoApellido":segundoApellido,
                    "curp":curp,
                    "idCargo":idCargo,
                    "cargo":cargo,
                    "abrTitulo":abrTitulo,
                    "sello":sello,
                    "certificadoResponsable":certificadoResponsable,
                    "noCertificadoResponsable":noCertificadoResponsable,
                }
            }
        })
    });

     const jsObj={
        "TituloElectronico":{
            "$":{
                "xmlns":"https://www.siged.sep.gob.mx/titulos/",
                "xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance",
                "version":xmlVersion,
                "folioControl":folioControl,
                "xsi:schemaLocation":"https://www.siged.sep.gob.mx/titulos/ schema.xsd",
            },
            "FirmaResponsables":[responsiblesXML],
            "Institucion":{
                "$":{
                    "cveInstitucion":cveInstitucion,
                    "nombreInstitucion":nombreInstitucion,
                }
            },
            "Carrera":{
                "$":{
                    "numeroRvoe":numeroRvoe,
                    "cveCarrera":cveCarrera,
                    "nombreCarrera":nombreCarrera,
                    "fechaInicio":fechaInicio,
                    "fechaTerminacion":fechaTerminacion,
                    "idAutorizacionReconocimiento":idAutorizacionReconocimiento,
                    "autorizacionReconocimiento":autorizacionReconocimiento,
                }
            },
            "Profesionista":{
                "$":{
                    "curp":curp,
                    "nombre":nombre,
                    "primerApellido":primerApellido,
                    "segundoApellido":segundoApellido,
                    "correoElectronico":correoElectronico,
                }
            },
            "Expedicion":{
                "$":{
                    "fechaExpedicion":fechaExpedicion,
                    "idModalidadTitulacion":idModalidadTitulacion,
                    "modalidadTitulacion":modalidadTitulacion,
                    "fechaExamenProfesional":fechaExamenProfesional,
                    "fechaExencionExamenProfesional":fechaExencionExamenProfesional,
                    "cumplioServicioSocial":cumplioServicioSocial,
                    "idFundamentoLegalServicioSocial":idFundamentoLegalServicioSocial,
                    "fundamentoLegalServicioSocial":fundamentoLegalServicioSocial,
                    "idEntidadFederativa":idEntidadFederativa,
                    "entidadFederativa":entidadFederativa,
                }
            },
            "Antecedente":{
                "$":{
                    "institucionProcedencia":institucionProcedencia,
                    "idTipoEstudioAntecedente":idTipoEstudioAntecedente,
                    "tipoEstudioAntecedente":tipoEstudioAntecedente,
                    "idEntidadFederativa":idEntidadFederativaAntecedente,
                    "entidadFederativa":entidadFederativaAntecedente,
                    "fechaInicio":fechaInicioAntecedente,
                    "fechaTerminacion":fechaTerminacionAntecedente,
                    "noCedula":noCedula,
                }
            },
        }
    }
    return JSON.stringify(jsObj);
    //const xml= '<?xml version="1.0" encoding="utf-8"?>' + convert.json2xml(JSON.stringify(jsObj));
    //return format(xml)

}

export const getXML = async (student: StudentType, school:SchoolType, responsibles: ResponsibleType[]) =>{
    let signaturesList = [];
        for (const responsible of responsibles) {
            const resSign = await signOriginalChain(responsible.clavePrivada, responsible.password, student.cadenaOriginal);
            signaturesList.push(resSign);
        }
        const jsonXML = getXMLinJSON(student,school,responsibles,signaturesList);
        const xml = await getXMLfromJSON(jsonXML);
    return xml
}