//TAURI CALLS ("API")

import {studentTypeJSON, toStudentType, toSchoolType, responsibleTypeJSON, toResponsibleType, EditStudentForm} from './types';
import { invoke } from "@tauri-apps/api/core";

export const initializeDatabase = async () => {
    try {
        const message =await invoke<string>('init_database');
        return message;
    } catch (err) {
        return 'Error creando base de datos: '+err;
    }
};

export const getAllStudents = async () => {
    const message = await invoke<string>('get_all_students');
    const studentsList = JSON.parse(JSON.stringify(message));
    const studentsListFormatted = studentsList.map((student:studentTypeJSON) => toStudentType(student));
    return studentsListFormatted;
};

export const insertStudent = async () => {
    try {
        const id = await invoke<string>('insert_student');
        return id;
    } catch (err) {
        return err+"";
    }
};

export const getStudent = async (id:number) => {
    const message = await invoke<string>('get_student',{id});
    const student = toStudentType(JSON.parse(JSON.stringify(message)));
    return student;
};

export const editStudent = async (values:EditStudentForm) => {
    try {
        await invoke<string>('edit_student',{
            id:values.id,
            folio:values.folio,
            nombre:values.nombre,
            primerApellido:values.primerApellido,
            segundoApellido:values.segundoApellido,
            curp:values.curp,
            email:values.email,
            carrera:values.carrera,
            fechaInicio:values.fechaInicio,
            fechaTermino:values.fechaTermino,
            autorizacion:values.autorizacion,
            fechaExpedicion:values.fechaExpedicion,
            modalidadTitulacion:values.modalidadTitulacion,
            fechaExamenProfesional:values.fechaExamenProfesional,
            fechaExcencionExamenProfesional:values.fechaExcencionExamenProfesional,
            cumplioServicioSocial:values.cumplioServicioSocial,
            fundamentoLegalServicioSocial:values.fundamentoLegalServicioSocial,
            entidadFederativa:values.entidadFederativa,
            escuelaProcedencia:values.escuelaProcedencia,
            tipoEstudioAntecedente:values.tipoEstudioAntecedente,
            entidadFederativaAntecedente:values.entidadFederativaAntecedente,
            fechaInicioAntecedente:values.fechaInicioAntecedente,
            fechaTerminoAntecedente:values.fechaTerminoAntecedente,
            numeroCedulaAntecedente:values.numeroCedulaAntecedente,
            recibo:values.recibo,
            cadenaOriginal:values.cadenaOriginal,
            cadenaFirmada:values.cadenaFirmada,
            xmlBase64:values.xmlBase64
        });
        return "";
    } catch (err) {
        return err+"";
    }
};

export const getSchool = async () => {
    const message = await invoke<string>('get_all_schools');
    const schoolsList = toSchoolType(JSON.parse(JSON.stringify(message))[0]);
    return schoolsList;
};

export const getResponsibles = async () => {
    const message = await invoke<string>('get_all_responsibles');
    const responsiblesList = JSON.parse(JSON.stringify(message));
    const responsiblesListFormatted = responsiblesList.map((responsible:responsibleTypeJSON) => toResponsibleType(responsible));
    return responsiblesListFormatted;
};

export const getDegrees = async () => {
    const message = await invoke<string>('get_all_degrees');
    //const schoolsList = toDegreesType(JSON.parse(JSON.stringify(message)));
    const degreesList = JSON.parse(JSON.stringify(message));
    return degreesList;
};

export const editSchool = async (nombre: string, estado: string, cuenta: string, password: string, claveInstitucion: string) => {
    try {
        await invoke('edit_school', {
            id: 1,
            nombre: nombre,
            estado: estado,
            cuenta: cuenta,
            password: password,
            claveInstitucion: claveInstitucion
        });
        return "";
    } catch (err) {
        return err+"";
    }
};

export const insertResponsible = async (
    nombre: string,
    primerApellido: string,
    segundoApellido: string,
    curp: string,
    cargo: string,
    titulo: string,
    certificado: string,
    certificadoOriginal: string,
    clavePrivada: string,
    password: string) => {
    try {
        await invoke<string>('insert_responsible',{
            nombre: nombre,
            primerApellido: primerApellido,
            segundoApellido: segundoApellido,
            curp: curp,
            cargo: cargo,
            titulo: titulo,
            certificado: certificado,
            certificadoOriginal: certificadoOriginal,
            clavePrivada: clavePrivada,
            password: password,
        });
        return "";
    } catch (err) {
        return err+"";
    }
};

export const insertDegree = async (nombre: string, rvoe: string, clave: string) => {
    try {
        await invoke<string>('insert_degree',{
            nombre: nombre,
            rvoe: rvoe,
            clave: clave
        });
        return "";
    } catch (err) {
        return err+"";
    }
};

export const deleteDegree = async (id: number) => {
    try {
        await invoke<string>('delete_degree',{
            id: id
        });
        return "";
    } catch (err) {
        return err+"";
    }
};

export const deleteResponsible = async (id: number) => {
    try {
        await invoke<string>('delete_responsible',{
            id: id
        });
        return "";
    } catch (err) {
        return err+"";
    }
};


export const disableStudent = async (id: number) => {
    try {
        await invoke<string>('disable_student',{
            id: id
        });
        return "";
    } catch (err) {
        return err+"";
    }
};

export const enableStudent = async (id: number) => {
    try {
        await invoke<string>('enable_student',{
            id: id
        });
        return "";
    } catch (err) {
        return err+"";
    }
};

export const deleteStudent = async (id: number) => {
    try {
        await invoke<string>('delete_student',{
            id: id
        });
        return "";
    } catch (err) {
        return err+"";
    }
};

export const editStudentStatus = async (id: number, estatusTracking:string, xmlArchivoFirmado?:string) => {
    try {
        const payload: any = {
            id: id,
            estatusTracking: estatusTracking,
        }
        if (xmlArchivoFirmado !== undefined) {
            payload.xmlArchivoFirmado = xmlArchivoFirmado;
        }
        await invoke<string>('edit_student_status',payload);
        return "";
    } catch (err) {
        return err+"";
    }
};

export const signOriginalChain = async (privateKey: string, passphrase: string, originalChain: string) => {
    
    const message = await invoke<string>('sign_original_chain',{
        privateKey:privateKey,
        passphrase:passphrase,
        originalChain:originalChain
    });
    return message;
};

export const getXMLfromJSON = async (jsonString: string) => {
    
    const message = await invoke<string>('get_xml_from_json',{
        jsonString: jsonString
    });
    return message;
};

export const checkTitleStatus = async (recibo: string, claveDgp: number, archivoNombre: string) => {
    try {
        const message = await invoke<string>('descarga',{
            recibo: recibo,
            claveDgp: claveDgp,
            archivoNombre: archivoNombre
        });
        return message;
    } catch (err) {
        return err+"";
    }
};

export const sendTitle = async (cuenta: string, password: string, recibo: string, claveDgp: number, cadena: string, archivoNombre: string) => {
    try {
        const message = await invoke<string>('acceso_cadena',{
            cuenta:cuenta,
            password:password,
            recibo: recibo,
            claveDgp: claveDgp,
            cadena: cadena,
            archivoNombre: archivoNombre
        });
        return message;
    } catch (err) {
        return err+"";
    }
};
