import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik, FormikHelpers} from 'formik';
import * as yup from 'yup';
import {StudentType, EditStudentForm, SchoolType, ResponsibleType, DegreeType} from '../../types';
import { useEffect} from 'react';

const dataSchema = {
    folio: yup.string().required(),
};

interface Props {
    submitFormEditStudent: (values:EditStudentForm, formikBag:FormikHelpers<EditStudentForm>) => void;
    student: StudentType;
    school: SchoolType
    responsibles: ResponsibleType[];
    degrees: DegreeType[];
    onFormEdit: () => void;
    onFormSave: () => void;
}

function StudentsEditForm ({submitFormEditStudent,student,school,responsibles,degrees,onFormEdit,onFormSave}: Props): JSX.Element | null {

    const isValidated  = () =>{
                if (student.estatusTracking == "XML validado por la SEP"){
                        return true;
                }else {
                        return false;
                }
        }
        
    useEffect(() => {
            onFormSave();
    }, []);

    const basePrefilledValues = {
        id:0,
        folio:"",
        nombre:"",
        primerApellido:"",
        segundoApellido:"",
        curp:"",
        email:"",
        carrera:"",
        fechaInicio:"",
        fechaTermino:"",
        autorizacion:"",
        fechaExpedicion:"",
        modalidadTitulacion:"",
        fechaExamenProfesional:"",
        fechaExcencionExamenProfesional:"",
        cumplioServicioSocial:"",
        fundamentoLegalServicioSocial:"",
        entidadFederativa:"",
        escuelaProcedencia:"",
        tipoEstudioAntecedente:"",
        entidadFederativaAntecedente:"",
        fechaInicioAntecedente:"",
        fechaTerminoAntecedente:"",
        numeroCedulaAntecedente:"",
        recibo:"",
        cadenaOriginal:"",
        cadenaFirmada:"",
        xmlBase64:"",
    }

    const studentValues = {
        id:Number(student?.id),
        folio:student?.folio,
        nombre:student?.nombre,
        primerApellido:student?.primerApellido,
        segundoApellido:student?.segundoApellido,
        curp:student?.curp,
        email:student?.email,
        carrera:student?.carrera,
        fechaInicio:student?.fechaInicio,
        fechaTermino:student?.fechaTermino,
        autorizacion:student?.autorizacion,
        fechaExpedicion:student?.fechaExpedicion,
        modalidadTitulacion:student?.modalidadTitulacion,
        fechaExamenProfesional:student?.fechaExamenProfesional,
        fechaExcencionExamenProfesional:student?.fechaExcencionExamenProfesional,
        cumplioServicioSocial:student?.cumplioServicioSocial,
        fundamentoLegalServicioSocial:student?.fundamentoLegalServicioSocial,
        entidadFederativa:student?.entidadFederativa,
        escuelaProcedencia:student?.escuelaProcedencia,
        tipoEstudioAntecedente:student?.tipoEstudioAntecedente,
        entidadFederativaAntecedente:student?.entidadFederativaAntecedente,
        fechaInicioAntecedente:student?.fechaInicioAntecedente,
        fechaTerminoAntecedente:student?.fechaTerminoAntecedente,
        numeroCedulaAntecedente:student?.numeroCedulaAntecedente,
        recibo:student?.recibo,
        cadenaOriginal:student?.cadenaOriginal,
        cadenaFirmada:student?.cadenaFirmada,
        xmlBase64:student?.xmlBase64,
    }

    const autorizaciones = [
        "1 -- RVOE FEDERAL",
        "2 -- RVOE ESTATAL",
        "3 -- AUTORIZACIÓN FEDERAL",
        "4 -- AUTORIZACIÓN ESTATAL",
        "5 -- ACTA DE SESIÓN",
        "6 -- ACUERDO DE INCORPORACIÓN",
        "7 -- ACUERDO SECRETARIAL SEP",
        "8 -- DECRETO DE CREACIÓN",
        "9 -- OTRO",
    ]
    const modalidadesTitulacion = [
        "1 -- POR TESIS",
        "2 -- POR PROMEDIO",
        "3 -- POR ESTUDIOS DE POSGRADOS",
        "4 -- POR EXPERIENCIA LABORAL",
        "5 -- POR CENEVAL",
        "6 -- OTRO",
    ]
    const cumplioServicioSocial = [
        "1 -- CUMPLIO",
        "0 -- NO CUMPLIO",
    ]
    const fundamentosLegalesServicioSocial = [
        "1 -- ART. 52 LRART. 5 CONST",
        "2 -- ART. 55 LRART. 5 CONST",
        "3 -- ART. 91 RLRART. 5 CONST",
        "4 -- ART. 10 REGLAMENTO PARA LA PRESTACIÓN DEL SERVICIO SOCIAL DE LOS ESTUDIANTES DE LAS INSTITUCIONES DE EDUCACIÓN SUPERIOR EN LA REPÚBLICA MEXICANA",
        "5 -- NO APLICA",
    ]
    const entidadesFederativas = [
        "01 -- AGUASCALIENTES",
        "02 -- BAJA CALIFORNIA",
        "03 -- BAJA CALIFORNIA SUR",
        "04 -- CAMPECHE",
        "05 -- COAHUILA DE ZARAGOZA",
        "06 -- COLIMA",
        "07 -- CHIAPAS",
        "08 -- CHIHUAHUA",
        "09 -- CIUDAD DE MÉXICO",
        "10 -- DURANGO",
        "11 -- GUANAJUATO",
        "12 -- GUERRERO",
        "13 -- HIDALGO",
        "14 -- JALISCO",
        "15 -- MÉXICO",
        "16 -- MICHOACÁN DE OCAMPO",
        "17 -- MORELOS",
        "18 -- NAYARIT",
        "19 -- NUEVO LEÓN",
        "20 -- OAXACA",
        "21 -- PUEBLA",
        "22 -- QUERÉTARO",
        "23 -- QUINTANA ROO",
        "24 -- SAN LUIS POTOSÍ",
        "25 -- SINALOA",
        "26 -- SONORA",
        "27 -- TABASCO",
        "28 -- TAMAULIPAS",
        "29 -- TLAXCALA",
        "30 -- VERACRUZ DE IGNACIO DE LA LLAVE",
        "31 -- YUCATÁN",
        "32 -- ZACATECAS",
        "33 -- EXTRANJERO",
    ]
    const tiposEstudiosAntecedentes = [
        "1 -- MAESTRÍA",
        "2 -- LICENCIATURA",
        "3 -- TÉCNICO SUPERIOR UNIVERSITARIO",
        "4 -- BACHILLERATO",
        "5 -- EQUIVALENTE A BACHILLERATO",
        "6 -- SECUNDARIA",
    ]

    const getOriginalChain = (values:EditStudentForm) =>{

        const xmlVersion ="1.0"
        const folioControl=values.folio
        const cveInstitucion=school.claveInstitucion
        const nombreInstitucion=school.nombre
        const cveCarrera=values.carrera.split(" -- ")[0]
        const numeroRvoe=values.carrera.split(" -- ")[1]
        const nombreCarrera=values.carrera.split(" -- ")[2]
        const fechaInicio=values.fechaInicio
        const fechaTerminacion=values.fechaTermino
        const idAutorizacionReconocimiento=values.autorizacion.split(" -- ")[0]
        const autorizacionReconocimiento=values.autorizacion.split(" -- ")[1]
        const curp=values.curp
        const nombre=values.nombre
        const primerApellido=values.primerApellido
        const segundoApellido=values.segundoApellido
        const correoElectronico=values.email
        const fechaExpedicion=values.fechaExpedicion
        const idModalidadTitulacion=values.modalidadTitulacion.split(" -- ")[0]
        const modalidadTitulacion=values.modalidadTitulacion.split(" -- ")[1]
        const fechaExamenProfesional=values.fechaExamenProfesional
        const fechaExencionExamenProfesional=values.fechaExcencionExamenProfesional
        const cumplioServicioSocial=values.cumplioServicioSocial.split(" -- ")[0]
        const idFundamentoLegalServicioSocial=values.fundamentoLegalServicioSocial.split(" -- ")[0]
        const fundamentoLegalServicioSocial=values.fundamentoLegalServicioSocial.split(" -- ")[1]
        const idEntidadFederativa=values.entidadFederativa.split(" -- ")[0]
        const entidadFederativa=values.entidadFederativa.split(" -- ")[1]
        const institucionProcedencia=values.escuelaProcedencia
        const idTipoEstudioAntecedente=values.tipoEstudioAntecedente.split(" -- ")[0]
        const tipoEstudioAntecedente=values.tipoEstudioAntecedente.split(" -- ")[1]
        const idEntidadFederativaAntecedente=values.entidadFederativaAntecedente.split(" -- ")[0]
        const entidadFederativaAntecedente=values.entidadFederativaAntecedente.split(" -- ")[1]
        const fechaInicioAntecedente=values.fechaInicioAntecedente
        const fechaTerminacionAntecedente=values.fechaTerminoAntecedente
        const noCedula=values.numeroCedulaAntecedente

        let responsiblesStr = ""
        responsibles.map((responsible)=>{
            const curp = responsible.curp
            const idCargo = responsible.cargo.split(" -- ")[0]
            const cargo = responsible.cargo.split(" -- ")[1]
            const abrTitulo = responsible.titulo
            responsiblesStr  += `${curp}|${idCargo}|${cargo}|${abrTitulo}|`
        })
        
        const chain = `||${xmlVersion}|${folioControl}|${responsiblesStr}${cveInstitucion}|${nombreInstitucion}|${cveCarrera}|${nombreCarrera}|${fechaInicio}|${fechaTerminacion}|${idAutorizacionReconocimiento}|${autorizacionReconocimiento}|${numeroRvoe}|${curp}|${nombre}|${primerApellido}|${segundoApellido}|${correoElectronico}|${fechaExpedicion}|${idModalidadTitulacion}|${modalidadTitulacion}|${fechaExamenProfesional}|${fechaExencionExamenProfesional}|${cumplioServicioSocial}|${idFundamentoLegalServicioSocial}|${fundamentoLegalServicioSocial}|${idEntidadFederativa}|${entidadFederativa}|${institucionProcedencia}|${idTipoEstudioAntecedente}|${tipoEstudioAntecedente}|${idEntidadFederativaAntecedente}|${entidadFederativaAntecedente}|${fechaInicioAntecedente}|${fechaTerminacionAntecedente}|${noCedula}||`

        return chain

    }

    

    const submitFormEditStudentWrapped = async (values:EditStudentForm, formikBag:FormikHelpers<EditStudentForm>) => {
        values.cadenaOriginal = getOriginalChain(values);
        //values.xmlBase64 = getXMLBase64(values)
        onFormSave();
        submitFormEditStudent (values, formikBag);
    }
    /*
    if(student !== undefined){
        student.datosTitulo._id = student._id
    }
    */
    return (
        <Formik
            validationSchema={yup.object(dataSchema)}
            onSubmit={submitFormEditStudentWrapped}
            initialValues={{...basePrefilledValues, ...studentValues}}
            >
            {(formProps) => {
                useEffect(() => {
                    onFormEdit();
                    }, [formProps.values]);
            return(
            <Form onSubmit={formProps.handleSubmit}>
            <h3>Datos Generales</h3>
            <Form.Group as={Row} className="mb-3" controlId="folio" >
                <Form.Label column sm="2">
                Folio
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} required type="text" name="folio" placeholder="" value ={formProps.values.folio} onChange={(e)=>{
                        e.target.value = e.target.value.toUpperCase()
                        formProps.handleChange(e)}}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="nombre" >
                <Form.Label column sm="2">
                Nombre(s)
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} type="text" name="nombre" placeholder="" value ={formProps.values.nombre} onChange={
                    (e)=>{
                        e.target.value = e.target.value.toUpperCase()
                        formProps.handleChange(e)}}/>
                </Col>
                
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="primerApellido" >
                <Form.Label column sm="2">
                Primer Apellido
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} type="text" name="primerApellido" placeholder="" value ={formProps.values.primerApellido} onChange={(e)=>{
                        e.target.value = e.target.value.toUpperCase()
                        formProps.handleChange(e)}}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="segundoApellido" >
                <Form.Label column sm="2">
                Segundo Apellido
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} type="text" name="segundoApellido" placeholder="" value ={formProps.values.segundoApellido} onChange={(e)=>{
                        e.target.value = e.target.value.toUpperCase()
                        formProps.handleChange(e)}}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="curp" >
                <Form.Label column sm="2">
                CURP
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} type="text" name="curp" placeholder="" value ={formProps.values.curp} onChange={(e)=>{
                        e.target.value = e.target.value.toUpperCase()
                        formProps.handleChange(e)}}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="email" >
                <Form.Label column sm="2">
                Correo Electrónico
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} type="email" name="email" placeholder="" value ={formProps.values.email} onChange={formProps.handleChange}/>
                </Col>
            </Form.Group>
            <h3>Datos de la Carrera</h3>
            <Form.Group as={Row} className="mb-3" controlId="carrera" >
                <Form.Label column sm="2">
                Carrera
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} as="select"  name="carrera" value ={formProps.values.carrera} onChange={formProps.handleChange}>
                <option key = "carreraNoSelection" value = "">Seleccione...</option>
                {degrees.map((degree)=>{
                    return(
                        <option key = {degree.clave + " -- " + degree.rvoe + " -- " + degree.nombre}
                        value = {degree.clave + " -- " + degree.rvoe + " -- " + degree.nombre}
                        >
                        {degree.clave + " -- " + degree.rvoe + " -- " + degree.nombre}
                        </option>
                    )
                })}
                </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="fechaInicio" >
                <Form.Label column sm="2">
                Fecha de Inicio
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} type="date" name="fechaInicio" placeholder="" value ={formProps.values.fechaInicio} onChange={formProps.handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="fechaTermino" >
                <Form.Label column sm="2">
                Fecha de Término
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} type="date" name="fechaTermino" placeholder="" value ={formProps.values.fechaTermino} onChange={formProps.handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="autorizacion" >
                <Form.Label column sm="2">
                Autorización o Reconocimiento
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} as="select" name="autorizacion" value ={formProps.values.autorizacion} onChange={formProps.handleChange}>
                <option key = "autorizacionNoSelection" value = "">Seleccione...</option>
                {autorizaciones.map((autorizacion)=>{
                    return(
                        <option key = {autorizacion} value = {autorizacion}>{autorizacion}</option>
                    )
                })}
                </Form.Control>
                </Col>
            </Form.Group>
            <h3>Expedición</h3>
            <Form.Group as={Row} className="mb-3" controlId="fechaExpedicion" >
                <Form.Label column sm="2">
                Fecha de Expedición
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} type="date" name="fechaExpedicion" placeholder="" value ={formProps.values.fechaExpedicion} onChange={formProps.handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="modalidadTitulacion" >
                <Form.Label column sm="2">
                Modalidad de Titulación
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} as="select" name="modalidadTitulacion" value ={formProps.values.modalidadTitulacion} onChange={formProps.handleChange}>
                <option key = "modalidadTitulacionNoSelection" value = "">Seleccione...</option>
                {modalidadesTitulacion.map((modalidad)=>{
                    return(
                        <option key = {modalidad} value = {modalidad}>{modalidad}</option>
                    )
                })}
                </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="fechaExamenProfesional" >
                <Form.Label column sm="2">
                Fecha de Examen Profesional
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} type="date" name="fechaExamenProfesional" placeholder="" value ={formProps.values.fechaExamenProfesional} onChange={formProps.handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="fechaExcencionExamenProfesional" >
                <Form.Label column sm="2">
                Fecha de Exención de Examen Profesional
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} type="date" name="fechaExcencionExamenProfesional" placeholder="" value ={formProps.values.fechaExcencionExamenProfesional} onChange={formProps.handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="cumplioServicioSocial" >
                <Form.Label column sm="2">
                Cumplió el Servicio Social
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} as="select" name="cumplioServicioSocial" value ={formProps.values.cumplioServicioSocial} onChange={formProps.handleChange}>
                <option key = "cumplioServicioSocialNoSelection" value = "">Seleccione...</option>
                {cumplioServicioSocial.map((item)=>{
                    return(
                        <option key = {item} value = {item}>{item}</option>
                    )
                })}
                </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="fundamentoLegalServicioSocial" >
                <Form.Label column sm="2">
                Fundamento Legal del Servicio Social
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} as="select" name="fundamentoLegalServicioSocial" value ={formProps.values.fundamentoLegalServicioSocial} onChange={formProps.handleChange}>
                <option key = "fundamentoLegalServicioSocialNoSelection" value = "">Seleccione...</option>
                {fundamentosLegalesServicioSocial.map((item)=>{
                    return(
                        <option key = {item} value = {item}>{item}</option>
                    )
                })}
                </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="entidadFederativa" >
                <Form.Label column sm="2">
                Entidad Federativa
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} as="select" name="entidadFederativa" value ={formProps.values.entidadFederativa} onChange={formProps.handleChange}>
                <option key = "entidadFederativaNoSelection" value = "">Seleccione...</option>
                {entidadesFederativas.map((item)=>{
                    return(
                        <option key = {item} value = {item}>{item}</option>
                    )
                })}
                </Form.Control>
                </Col>
            </Form.Group>
            <h3>Antecedente</h3>
            <Form.Group as={Row} className="mb-3" controlId="escuelaProcedencia" >
                <Form.Label column sm="2">
                Escuela de Procedencia
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} type="text" name="escuelaProcedencia" placeholder="" value ={formProps.values.escuelaProcedencia} onChange={(e)=>{
                        e.target.value = e.target.value.toUpperCase()
                        formProps.handleChange(e)}}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="tipoEstudioAntecedente" >
                <Form.Label column sm="2">
                Tipo de Estudio Antecedente
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} as="select" name="tipoEstudioAntecedente" value ={formProps.values.tipoEstudioAntecedente} onChange={formProps.handleChange}>
                <option key = "tipoEstudioAntecedenteNoSelection" value = "">Seleccione...</option>
                {tiposEstudiosAntecedentes.map((item)=>{
                    return(
                        <option key = {item} value = {item}>{item}</option>
                    )
                })}
                </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="entidadFederativaAntecedente" >
                <Form.Label column sm="2">
                Entidad Federativa
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} as="select" name="entidadFederativaAntecedente" value ={formProps.values.entidadFederativaAntecedente} onChange={formProps.handleChange}>
                <option key = "entidadFederativaAntecedenteNoSelection" value = "">Seleccione...</option>
                {entidadesFederativas.map((item)=>{
                    return(
                        <option key = {item} value = {item}>{item}</option>
                    )
                })}
                </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="fechaInicioAntecedente" >
                <Form.Label column sm="2">
                Fecha de Inicio
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} type="date" name="fechaInicioAntecedente" placeholder="" value ={formProps.values.fechaInicioAntecedente} onChange={formProps.handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="fechaTerminoAntecedente" >
                <Form.Label column sm="2">
                Fecha de Término
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} type="date" name="fechaTerminoAntecedente" placeholder="" value ={formProps.values.fechaTerminoAntecedente} onChange={formProps.handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="numeroCedulaAntecedente" >
                <Form.Label column sm="2">
                Número de Cédula
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} type="text" name="numeroCedulaAntecedente" placeholder="" value ={formProps.values.numeroCedulaAntecedente} onChange={(e)=>{
                        e.target.value = e.target.value.toUpperCase()
                        formProps.handleChange(e)}}/>
                </Col>
            </Form.Group>
            <h3>Comprobante de Pago</h3>
            <b>Número de comprobante de pago en la caja de Tesorería del Estado de la Secretaria de Educación</b>
            <Form.Group as={Row} className="mb-3" controlId="recibo" >
                <Form.Label column sm="2">
                Recibo
                </Form.Label>
                <Col sm="10">
                <Form.Control disabled = {isValidated()} type="text" name="recibo" placeholder="" value ={formProps.values.recibo} onChange={(e)=>{
                        e.target.value = e.target.value.toUpperCase()
                        formProps.handleChange(e)}}/>
                </Col>
            </Form.Group>
            <Button disabled = {isValidated()} variant="primary" type="submit" name="submit">
            Guardar
            </Button>
            </Form>
            )}}
        </Formik>
    )
}
export default StudentsEditForm