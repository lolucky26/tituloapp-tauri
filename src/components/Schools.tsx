import { useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Alert from 'react-bootstrap/Alert';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import MenuBar from './MenuBar.tsx';
import Loading from './Loading.tsx';
import SchoolsResponsible from './Schools/Responsible.tsx';
import SchoolsDegree from './Schools/Degree.tsx';
import SchoolsForm from './Schools/Form.tsx';
import PopupMessage from './PopupMessage.tsx';
import {FormikHelpers} from 'formik';
import {SchoolType, PopupMessageType, SchoolForm} from '../types';
import {getSchool, editSchool} from '../api.ts';
//import axios from 'axios';

function Schools (){
    let [popupMessage, setPopupMessage] = useState<PopupMessageType>({
        isVisible: false,
        title: '',
        body: ''
    });

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

    let [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getSchool().then(currSchool => setSchool(currSchool));
    }, []);
       
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

    const submitFormSchool = async (values: SchoolForm, _formikBag: FormikHelpers<SchoolForm>) => {
        setIsLoading(true);
        editSchool(values.nombre, values.estado, values.cuenta, values.password, values.claveInstitucion).then((result: string) => {
            if (result === ""){
                showPopupMessage("Aviso","Datos actualizados con éxito.");
            }else{
                showPopupMessage("Error", result);
            }
            getSchool().then(currSchool => setSchool(currSchool));
        }).finally(()=>setIsLoading(false));
    }

    
    
    
    
    return (
        <Container fluid>
            <Loading isVisible={isLoading}/>
            <Row>
            <Col>
                <MenuBar />
                <Breadcrumb>
                    <Breadcrumb.Item active>Escuela</Breadcrumb.Item>
                    <Breadcrumb.Item active>{school?.nombre}</Breadcrumb.Item>
                </Breadcrumb>
                <Col>
                <SchoolsForm
                submitFormSchool = {submitFormSchool}
                school = {school}
                />
                </Col>
                <hr></hr>
                <Col>
                <SchoolsDegree showPopupMessage = {showPopupMessage}/>
                </Col>
                <hr></hr>
                <Col>
                <SchoolsResponsible showPopupMessage = {showPopupMessage}/>
                </Col>
                <PopupMessage onHandleClose= {hidePopupMessage} popupMessage = {popupMessage} />
                
            </Col>
            </Row>
            {/* 
            <Row>
            <Col id="footer">
                <Alert variant='dark'>
                    Ingreso como: Pakito
                </Alert>
            </Col>
            </Row>
            */}
        </Container>
    )

  }
  
  export default Schools;