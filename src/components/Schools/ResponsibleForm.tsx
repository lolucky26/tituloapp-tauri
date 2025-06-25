
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import {ResponsibleForm} from '../../types';
import {FormikHelpers} from 'formik';

const cargos = [
    "1 -- DIRECTOR",
    "2 -- SUBDIRECTOR",
    "3 -- RECTOR",
    "4 -- VICERRECTOR",
    "5 -- RESPONSABLE DE EXPEDICIÓN",
    "6 -- SECRETARIO GENERAL",
    "7 -- AUTORIDAD LOCAL",
    "8 -- AUTORIDAD FEDERAL",
    "9 -- DIRECTOR GENERAL",
];

const responsibleSignatureSchema = {
    nombre: yup.string().required(),
    curp: yup.string().required(),
    cargo: yup.string().required(),
    titulo: yup.string(),
    certificadoName: yup.string().required(),
    clavePrivadaName: yup.string().required(),
    password: yup.string().required(),
};

interface Props {
    submitFormResponsible: (values:ResponsibleForm, formikBag:FormikHelpers<ResponsibleForm>) => void;
}

function SchoolsResponsibleForm ({submitFormResponsible}: Props): JSX.Element | null {
    let [cert, setCert] = useState<string>('');
    let [originalCert, setOriginalCert] = useState<string>('');
    let [key, setKey] = useState<string>('');

    const basePrefilledValues = {
        id: "",
        nombre: "",
        primerApellido:"",
        segundoApellido:"",
        curp: "",
        cargo: "",
        titulo: "",
        certificado: "",
        certificadoOriginal:"",
        clavePrivada: "",
        certificadoName: "",
        clavePrivadaName: "",
        password: "",
    };

    const certificadoValues = {
        certificado:cert,
        certificadoOriginal:originalCert,
        clavePrivada:key,
    }

    const submitFormResponsibleWrapped = (values:ResponsibleForm, formikBag:FormikHelpers<ResponsibleForm>) => {
        submitFormResponsible ({...values,...certificadoValues}, formikBag);
        formikBag.resetForm()

    };
    
    const validateFile = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const der = (reader.result as string).split(',')[1]
            if(file.name.endsWith(".cer")){
                const prefix ="-----BEGIN CERTIFICATE-----\n";
                const postfix="-----END CERTIFICATE-----";
                const buffer = der.match(/.{0,64}/g)?.join('\n') || '';
                const pem = prefix + buffer + postfix;
                setCert(pem)
                setOriginalCert(der)
            }else{
                const prefix ="-----BEGIN ENCRYPTED PRIVATE KEY-----\n"
                const postfix="-----END ENCRYPTED PRIVATE KEY-----"
                const buffer = der.match(/.{0,64}/g)?.join('\n') || '';
                const pem = prefix + buffer + postfix
                setKey(pem);
            }
        };
        try{
            reader.readAsDataURL(file)
        }
        catch(e){
            
        }
    }
    return (
        <>
        <h3>Firmas de Responsables</h3>
        <Formik
            validationSchema={yup.object(responsibleSignatureSchema)}
            onSubmit={submitFormResponsibleWrapped}
            initialValues={basePrefilledValues}
            >
            {(formProps) => (
            <Form onSubmit={formProps.handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="responsableNombre" >
                <Form.Label column sm="2">
                Nombre
                </Form.Label>
                <Col sm="10">
                <Form.Control required type="text" name="nombre" placeholder="" value ={formProps.values.nombre} onChange={(e)=>{
                        e.target.value = e.target.value.toUpperCase()
                        formProps.handleChange(e)}}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="primerApellido" >
                <Form.Label column sm="2">
                Primer Apellido
                </Form.Label>
                <Col sm="10">
                <Form.Control required type="text" name="primerApellido" placeholder="" value ={formProps.values.primerApellido} onChange={(e)=>{
                        e.target.value = e.target.value.toUpperCase()
                        formProps.handleChange(e)}}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="segundoApellido" >
                <Form.Label column sm="2">
                Segundo Apellido
                </Form.Label>
                <Col sm="10">
                <Form.Control required type="text" name="segundoApellido" placeholder="" value ={formProps.values.segundoApellido} onChange={(e)=>{
                        e.target.value = e.target.value.toUpperCase()
                        formProps.handleChange(e)}}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="curp" >
                <Form.Label column sm="2">
                CURP
                </Form.Label>
                <Col sm="10">
                <Form.Control required type="text" name="curp" placeholder="" value ={formProps.values.curp} onChange={(e)=>{
                        e.target.value = e.target.value.toUpperCase()
                        formProps.handleChange(e)}}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="cargo" >
                <Form.Label column sm="2">
                Autorización o Reconocimiento
                </Form.Label>
                <Col sm="10">
                <Form.Control as="select" name="cargo" value ={formProps.values.cargo} onChange={formProps.handleChange}>
                <option key = "cargoNoSelection" value = "">Seleccione...</option>
                {cargos.map((item)=>{
                    return(
                        <option key = {item} value = {item}>{item}</option>
                    )
                })}
                </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="titulo" >
                <Form.Label column sm="2">
                Título
                </Form.Label>
                <Col sm="10">
                <Form.Control type="text" name="titulo" placeholder="" value ={formProps.values.titulo} onChange={(e)=>{
                        e.target.value = e.target.value.toUpperCase()
                        formProps.handleChange(e)}}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="certificadoName" >
                <Form.Label column sm="2">
                Certificado
                </Form.Label>
                <Col sm="10">
                <Form.Control
                required
                type="file"
                name="certificadoName"
                placeholder=""
                accept = ".cer"
                value ={formProps.values.certificadoName}
                onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    if(target.files && target.files[0]){
                        validateFile(target.files[0])
                        formProps.handleChange(e)
                    }
                }}
                />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="clavePrivadaName" >
                <Form.Label column sm="2">
                Clave Privada
                </Form.Label>
                <Col sm="10">
                <Form.Control
                required
                type="file"
                name="clavePrivadaName"
                placeholder=""
                accept = ".key"
                value ={formProps.values.clavePrivadaName}
                onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    if(target.files && target.files[0]){
                        validateFile(target.files[0])
                        formProps.handleChange(e)
                    }
                }}
                />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="cert-password" >
                <Form.Label column sm="2">
                Contraseña de Clave Privada
                </Form.Label>
                <Col sm="10">
                <Form.Control required type="password" name="password" placeholder="" value ={formProps.values.password} onChange={formProps.handleChange}/>
                </Col>
            </Form.Group>
            <Button variant="primary" type="submit" name="submit">
            Agregar
            </Button>
            </Form>
            )}
        </Formik>
        </>
    )
}
export default SchoolsResponsibleForm