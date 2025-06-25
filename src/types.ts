// DATA TYPES

export interface PopupMessageType {
    title: string;
    body: string;
    isVisible: boolean;
};

export interface SchoolType {
    nombre: string;
    estado: string;
    claveInstitucion: string;
    tipoRegistro: string;
    cuenta: string;
    password: string;
    numeroConsecutivoXML: string;
    serieXML: string;
};

export interface DegreeType {
    id: string;
    clave: string;
    rvoe: string;
    nombre: string;
};

export interface ResponsibleType {
    id: string;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    curp: string;
    cargo: string;
    titulo: string;
    certificado: string;
    certificadoOriginal: string;
    clavePrivada: string;
    password: string;
    numeroCertificado: string;
    observaciones: string;
};

export interface StudentType {
    id: string;
    isActive: number;
    fechaCreado: string;
    fechaEditado: string;
    folio: string;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    curp: string;
    email: string;
    carrera: string;
    fechaInicio: string;
    fechaTermino: string;
    autorizacion: string;
    fechaExpedicion: string;
    modalidadTitulacion: string;
    fechaExamenProfesional: string;
    fechaExcencionExamenProfesional: string;
    cumplioServicioSocial: string;
    fundamentoLegalServicioSocial: string;
    entidadFederativa: string;
    escuelaProcedencia: string;
    tipoEstudioAntecedente: string;
    entidadFederativaAntecedente: string;
    fechaInicioAntecedente: string;
    fechaTerminoAntecedente: string;
    numeroCedulaAntecedente: string;
    estatusTitulo: string;
    recibo: string;
    cadenaOriginal: string;
    cadenaFirmada: string;
    xml: string;
    xmlBase64: string;
    estatusTracking: string;
    xmlArchivoFirmado: string;
};

/// FORM VALUES

export interface IDFormValues{
    id: string
};

export interface SchoolForm{
    nombre: string,
    estado: string,
    claveInstitucion: string,
    cuenta: string,
    password: string,
};

export interface DeleteResponsibleForm{
    responsibleID: string
};

export interface ResponsibleForm{
    id: string,
    nombre: string,
    primerApellido: string,
    segundoApellido: string,
    curp: string,
    cargo: string,
    titulo: string,
    certificado: string,
    certificadoOriginal: string,
    clavePrivada: string,
    certificadoName: string,
    clavePrivadaName: string,
    password: string
};

export interface EditDegreeForm{
    nombre_carrera: string,
    rvoe_carrera: string,
    clave_carrera: string,
    nombre: string,
    rvoe: string,
    clave: string,
};

export interface DeleteDegreeForm{
    degreeID: string
};

export interface EditStudentForm{
        id: number,
        folio: string,
        nombre: string,
        primerApellido: string,
        segundoApellido: string,
        curp: string,
        email: string,
        carrera: string,
        fechaInicio: string,
        fechaTermino: string,
        autorizacion: string,
        fechaExpedicion: string,
        modalidadTitulacion: string,
        fechaExamenProfesional: string,
        fechaExcencionExamenProfesional: string,
        cumplioServicioSocial: string,
        fundamentoLegalServicioSocial: string,
        entidadFederativa: string,
        escuelaProcedencia: string,
        tipoEstudioAntecedente: string,
        entidadFederativaAntecedente: string,
        fechaInicioAntecedente: string,
        fechaTerminoAntecedente: string,
        numeroCedulaAntecedente: string,
        recibo: string,
        cadenaOriginal: string,
        cadenaFirmada: string,
        xmlBase64: string,
};

export interface SelectStudentForm{
    id: string
};

export interface DeleteStudentForm{
    id: string,
};

export interface DisableStudentForm{
    id: string,
    enabled: boolean
};

//JSON TYPES READ IN THE DATABASE
export interface schoolTypeJSON{
    id: string;
    nombre: string;
    estado: string;
    clave_institucion: string;
    tipo_registro: string;
    cuenta: string;
    password: string;
    numero_consecutivo_xml: string;
    serie_xml: string;
};

export interface responsibleTypeJSON{
    id: string;
    nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    curp: string;
    cargo: string;
    titulo: string;
    certificado: string;
    certificado_original: string;
    clave_privada: string;
    password: string;
    numero_certificado: string;
    observaciones: string;
};

export interface studentTypeJSON{
    id: string;
    is_active: number;
    fecha_creado: string;
    fecha_editado: string;
    folio: string;
    nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    curp: string;
    email: string;
    carrera: string;
    fecha_inicio: string;
    fecha_termino: string;
    autorizacion: string;
    fecha_expedicion: string;
    modalidad_titulacion: string;
    fecha_examen_profesional: string;
    fecha_excencion_examen_profesional: string;
    cumplio_servicio_social: string;
    fundamento_legal_servicio_social: string;
    entidad_federativa: string;
    escuela_procedencia: string;
    tipo_estudio_antecedente: string;
    entidad_federativa_antecedente: string;
    fecha_inicio_antecedente: string;
    fecha_termino_antecedente: string;
    numero_cedula_antecedente: string;
    estatus_titulo: string;
    recibo: string;
    cadena_original: string;
    cadena_firmada: string;
    xml: string;
    xml_base_64: string;
    estatus_tracking: string;
    xml_archivo_firmado: string;
};

//CHANGE TYPE FUNCTIONS
export function toSchoolType(json:schoolTypeJSON): SchoolType{
    return{
        nombre: json.nombre,
        estado: json.estado,
        claveInstitucion: json.clave_institucion,
        tipoRegistro: json.tipo_registro,
        cuenta: json.cuenta,
        password: json.password,
        numeroConsecutivoXML: json.numero_consecutivo_xml,
        serieXML: json.serie_xml,
    }
};

export function toResponsibleType(json:responsibleTypeJSON): ResponsibleType{
    return{
        id: json.id,
        nombre: json.nombre,
        primerApellido: json.primer_apellido,
        segundoApellido: json.segundo_apellido,
        curp: json.curp,
        cargo: json.cargo,
        titulo: json.titulo,
        certificado: json.certificado,
        certificadoOriginal: json.certificado_original,
        clavePrivada: json.clave_privada,
        password: json.password,
        numeroCertificado: json.numero_certificado,
        observaciones: json.observaciones,
    }
};

export function toStudentType(json:studentTypeJSON): StudentType{
    return{
        id: String(json.id),
        isActive: json.is_active,
        fechaCreado:json.fecha_creado,
        fechaEditado:json.fecha_editado,
        folio: json.folio,
        nombre: json.nombre,
        primerApellido: json.primer_apellido,
        segundoApellido: json.segundo_apellido,
        curp: json.curp,
        email: json.email,
        carrera: json.carrera,
        fechaInicio: json.fecha_inicio,
        fechaTermino: json.fecha_termino,
        autorizacion: json.autorizacion,
        fechaExpedicion: json.fecha_expedicion,
        modalidadTitulacion: json.modalidad_titulacion,
        fechaExamenProfesional: json.fecha_examen_profesional,
        fechaExcencionExamenProfesional: json.fecha_excencion_examen_profesional,
        cumplioServicioSocial: json.cumplio_servicio_social,
        fundamentoLegalServicioSocial: json.fundamento_legal_servicio_social,
        entidadFederativa: json.entidad_federativa,
        escuelaProcedencia: json.escuela_procedencia,
        tipoEstudioAntecedente: json.tipo_estudio_antecedente,
        entidadFederativaAntecedente: json.entidad_federativa_antecedente,
        fechaInicioAntecedente: json.fecha_inicio_antecedente,
        fechaTerminoAntecedente: json.fecha_termino_antecedente,
        numeroCedulaAntecedente: json.numero_cedula_antecedente,
        estatusTitulo: json.estatus_titulo,
        recibo: json.recibo,
        cadenaOriginal: json.cadena_original,
        cadenaFirmada: json.cadena_firmada,
        xml: json.xml,
        xmlBase64: json.xml_base_64,
        estatusTracking: json.estatus_tracking,
        xmlArchivoFirmado: json.xml_archivo_firmado,
    }
};