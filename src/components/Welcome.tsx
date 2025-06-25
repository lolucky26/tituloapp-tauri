import {useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import MenuBar from './MenuBar.tsx';
import Loading from './Loading.tsx';
import Badge from 'react-bootstrap/Badge';
import {initializeDatabase,getAllStudents,getSchool} from '../api.ts';
import {StudentType,SchoolType} from '../types';
function Welcome (){
    const [dbExists, setDbExists] = useState<String>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
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
    const createDatabase = async () => {
        setIsLoading(true);
        await initializeDatabase().then((message)=>{
            setDbExists(message);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        createDatabase();
        getAllStudents().then(currStudents => setStudents(currStudents));
        getSchool().then(currSchool => setSchool(currSchool));
    }, [])

    return (
      <Container fluid>
            <Loading isVisible={isLoading}/>
            <Row>
            <Col>
                <MenuBar />
            </Col>
            </Row>
            <Row>
            <Col>

                <center>
                    <div className="logo-container">
                    <img src="logo.svg" alt="Logo" />
                    </div>  
                <h3>Institución <Badge pill bg="primary">{school.nombre}</Badge></h3>
                <h4>Registros de estudiantes <Badge pill bg="primary">{students.length}</Badge></h4>
                <h4>Títulos generados <Badge pill bg="primary">{students.filter(obj => obj.xmlArchivoFirmado && obj.xmlArchivoFirmado.length > 1).length}</Badge></h4>
                </center>

            </Col>
            </Row>
            <Row>
                <Col id="footer">
                    <Alert variant='dark'>
                        {dbExists}
                    </Alert>
                </Col>
                </Row>
        </Container>
    );
  }
  
  export default Welcome;