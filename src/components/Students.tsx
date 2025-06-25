import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import MenuBar from './MenuBar.jsx';
import Loading from './Loading.jsx';
import StudentsSearch from './Students/Search.jsx';
import { Link } from 'react-router-dom';
import StudentsEdit from './Students/Edit.jsx';
import PopupMessage from './PopupMessage.jsx';
import { saveAs } from 'file-saver';
import { FormikHelpers} from 'formik';
import {StudentType, PopupMessageType, SelectStudentForm, DeleteStudentForm,
    DisableStudentForm, EditStudentForm,ResponsibleType,SchoolType,DegreeType} from '../types';
import {getAllStudents,insertStudent,getStudent,editStudent,getResponsibles,
    getSchool,getDegrees,enableStudent,disableStudent,deleteStudent,
    checkTitleStatus,editStudentStatus, sendTitle} from '../api';

import { getXML } from '../utils/xmlTools.js';

function Students (){
    let [viewState, setViewState] = useState<string>("SEARCH");
    let [isLoading, setIsLoading] = useState<boolean>(false);
    let [popupMessage, setPopupMessage] = useState<PopupMessageType>({
        isVisible: false,
        title: '',
        body: ''
    });
    let [student, setStudent] = useState<StudentType>({
        id: '',
        isActive: 0,
        fechaCreado:'',
        fechaEditado:'',
        folio: '',
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        curp: '',
        email: '',
        carrera: '',
        fechaInicio: '',
        fechaTermino: '',
        autorizacion: '',
        fechaExpedicion: '',
        modalidadTitulacion: '',
        fechaExamenProfesional: '',
        fechaExcencionExamenProfesional: '',
        cumplioServicioSocial: '',
        fundamentoLegalServicioSocial: '',
        entidadFederativa: '',
        escuelaProcedencia: '',
        tipoEstudioAntecedente: '',
        entidadFederativaAntecedente: '',
        fechaInicioAntecedente: '',
        fechaTerminoAntecedente: '',
        numeroCedulaAntecedente: '',
        estatusTitulo: '',
        recibo: '',
        cadenaOriginal: '',
        cadenaFirmada: '',
        xml: '',
        xmlBase64: '',
        estatusTracking: '',
        xmlArchivoFirmado: '',
    });
    let [students, setStudents] = useState<StudentType[]>([{
        id: '',
        isActive: 0,
        fechaCreado:'',
        fechaEditado:'',
        folio: '',
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        curp: '',
        email: '',
        carrera: '',
        fechaInicio: '',
        fechaTermino: '',
        autorizacion: '',
        fechaExpedicion: '',
        modalidadTitulacion: '',
        fechaExamenProfesional: '',
        fechaExcencionExamenProfesional: '',
        cumplioServicioSocial: '',
        fundamentoLegalServicioSocial: '',
        entidadFederativa: '',
        escuelaProcedencia: '',
        tipoEstudioAntecedente: '',
        entidadFederativaAntecedente: '',
        fechaInicioAntecedente: '',
        fechaTerminoAntecedente: '',
        numeroCedulaAntecedente: '',
        estatusTitulo: '',
        recibo: '',
        cadenaOriginal: '',
        cadenaFirmada: '',
        xml: '',
        xmlBase64: '',
        estatusTracking: '',
        xmlArchivoFirmado: '',
    }]);
    let [school, setSchool] = useState<SchoolType>({
                nombre: '',
                estado: '',
                claveInstitucion: '',
                tipoRegistro: '',
                cuenta: '',
                password: '',
                numeroConsecutivoXML: '',
                serieXML: ''
            });
    let [responsibles, setResponsibles] = useState<ResponsibleType[]>([{
            id: '',
            nombre: '',
            primerApellido: '',
            segundoApellido: '',
            curp: '',
            cargo: '',
            titulo: '',
            certificado: '',
            certificadoOriginal: '',
            clavePrivada: '',
            password: '',
            numeroCertificado: '',
            observaciones: '',
        }]);
    let [degrees, setDegrees] = useState<DegreeType[]>([{
            id: '',
            clave: '',
            rvoe: '',
            nombre: '',
        }]);

    useEffect(() => {
        getResponsibles().then(currResponsibles => setResponsibles(currResponsibles));
        getSchool().then(currSchool => setSchool(currSchool));
        getDegrees().then(currDegrees => setDegrees(currDegrees));
    }, []);

    useEffect(() => {
        getAllStudents().then(currStudents => setStudents(currStudents));
    }, [student]);

    const isFormVisible = (form: string) => {
        if(viewState===form)return true;
        return false;
    }

    const getViewState = () => {
        switch(viewState){
            case "NEW_EDIT":
                return "Nuevo/Editar";
            case "SEARCH":
                return "";
            default:
                return "";
        }
    }

    const showPopupMessage = (title: string, body: string) => {
        if (!popupMessage.isVisible){
            setPopupMessage({
                isVisible: true,
                title: title,
                body: body
            });
        }
    }

    const hidePopupMessage = (): void => {
        if (popupMessage.isVisible){
            setPopupMessage({
                isVisible: false,
                title: '',
                body: ''
            });
        }
    }

    const submitFormSelectStudent = async (values:SelectStudentForm, _formikBag:FormikHelpers<SelectStudentForm>) => {
        setIsLoading(true);
        getStudent(Number(values.id)).then(currStudent => setStudent(currStudent)).then(()=>setViewState("NEW_EDIT")).finally(()=>setIsLoading(false));
    }

    const submitFormEditStudent = async (values:EditStudentForm, _formikBag:FormikHelpers<EditStudentForm>) => {
        setIsLoading(true);
        editStudent(values).then((result: string) => {
            if (result === ""){
                showPopupMessage("Aviso","Registro actualizado con éxito.");
            }else{
                showPopupMessage("Error", result);
            }
            getStudent(Number(values.id)).then(currStudent => setStudent(currStudent));
        }).finally(()=>setIsLoading(false));
    }

    const submitFormDisableStudent = async (values:DisableStudentForm, _formikBag:FormikHelpers<DisableStudentForm>)  => {
        if(values.enabled){
            setIsLoading(true);
            disableStudent(Number(values.id)).then((result: string) => {
                if (result === ""){
                    showPopupMessage("Aviso","Registro deshabilitado.");
                }else{
                    showPopupMessage("Error", result);
                }
            }).then(() =>getAllStudents().then(currStudents => setStudents(currStudents))).finally(()=>setIsLoading(false));
        }else{
            setIsLoading(true);
            enableStudent(Number(values.id)).then((result: string) => {
                if (result === ""){
                    showPopupMessage("Aviso","Registro habilitado.");
                }else{
                    showPopupMessage("Error", result);
                }
            }).then(() =>getAllStudents().then(currStudents => setStudents(currStudents))).finally(()=>setIsLoading(false));
        }
    }

    const submitFormDeleteStudent = async (values:DeleteStudentForm, _formikBag:FormikHelpers<DeleteStudentForm>)  => {
        setIsLoading(true);
        deleteStudent(Number(values.id)).then((result: string) => {
            if (result === ""){
                showPopupMessage("Aviso","Registro eliminado permanentemente.");
            }else{
                showPopupMessage("Error", result);
            }
        }).then(() =>getAllStudents().then(currStudents => setStudents(currStudents))).finally(()=>setIsLoading(false));
    }

    const newStudentButtonClicked =  () => {
        setIsLoading(true);
        insertStudent().then(id => {
            if (typeof id === "number"){
                getStudent(id).then( currStudent =>{
                    currStudent.folio = id+"";
                    setStudent(currStudent);
                }).then(()=>setViewState("NEW_EDIT"));
            } else{
                showPopupMessage("Error", "No se puede crear registro.");
            }
        }).finally(()=>setIsLoading(false));
    }

    const downloadXMLButtonClicked = async () => {
        setIsLoading(true);
        try{
            const xmlData = await getXML(student, school, responsibles);
            var blob = new Blob([xmlData],{type: "text/plain;charset=utf-8" })
            saveAs(blob, `${student.folio}.xml`)
        }finally{
            setIsLoading(false);
        }
        
    }

    const sendXMLButtonClicked = async () => {
        setIsLoading(true);
        try{
            const xmlData = await getXML(student, school, responsibles);
            console.log(xmlData);
            const estatusTracking = await sendTitle(school.cuenta,school.password,student.recibo,Number(school.claveInstitucion),student.cadenaFirmada,student.recibo);
            console.log(estatusTracking);
            await editStudentStatus(Number(student.id),estatusTracking).then(
                    ()=>getStudent(Number(student.id)).then(currStudent => setStudent(currStudent)));
        }finally{
            setIsLoading(false);
        }
    }

    const checkStatusXMLButtonClicked = async () => {
        setIsLoading(true);
        try{
            const res = await checkTitleStatus(student.recibo,Number(school.claveInstitucion),`${student.folio}.xml`);
            console.log(res);
            if (res?.length > 20000){
                const estatusTracking = "XML validado por la SEP"
                const xmlArchivoFirmado = res
                await editStudentStatus(Number(student.id),estatusTracking,xmlArchivoFirmado).then(
                    ()=>getStudent(Number(student.id)).then(currStudent => setStudent(currStudent)));
            } else {
                const estatusTracking = res
                await editStudentStatus(Number(student.id),estatusTracking).then(
                    ()=>getStudent(Number(student.id)).then(currStudent => setStudent(currStudent)));
            }
        }finally{
            setIsLoading(false);
        }
    }

    const downloadValidatedXMLButtonClicked = () => {
        setIsLoading(true);
        try{
            let url = `data:application/zip;base64,${student.xmlArchivoFirmado}`;
            saveAs(url, `${student.folio}.zip`);
        } finally{
            setIsLoading(false);
        }
    }


    return (
        <Container fluid>
            <Loading isVisible={isLoading}/>
            <Row>
            <Col>
                <MenuBar/>
                <Breadcrumb>
                    <Breadcrumb.Item active  as={Link} to={"../students"} onClick={() => setViewState("SEARCH")}>Alumnos</Breadcrumb.Item>
                    <Breadcrumb.Item active>{getViewState()}</Breadcrumb.Item>
                </Breadcrumb>
                <StudentsEdit
                student={student}
                school={school}
                responsibles={responsibles}
                degrees={degrees}
                visible = {isFormVisible("NEW_EDIT")}
                submitFormEditStudent={submitFormEditStudent}
                downloadXMLButtonClicked={downloadXMLButtonClicked}
                sendXMLButtonClicked={sendXMLButtonClicked}
                checkStatusXMLButtonClicked={checkStatusXMLButtonClicked}
                downloadValidatedXMLButtonClicked={downloadValidatedXMLButtonClicked}
                />
                <StudentsSearch
                students={students}
                visible = {isFormVisible("SEARCH")}
                submitFormSelectStudent={submitFormSelectStudent}
                newStudentButtonClicked={newStudentButtonClicked}
                submitFormDeleteStudent={submitFormDeleteStudent}
                submitFormDisableStudent={submitFormDisableStudent}
                />
                <PopupMessage onHandleClose= {hidePopupMessage} popupMessage = {popupMessage} />
            </Col>
            </Row>
            {/*
            <Row>
            <Col id="footer">
                <Alert variant='dark'>
                    Ingreso como: {user.name}
                </Alert>
            </Col>
            </Row>
            */}
        </Container>
    )

  }
  
  export default Students;