import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import StudentsSearchStudentItem from '../Students/SearchStudentItem.tsx';
import { useState, ReactElement} from 'react';
import { StudentSearchType, SelectStudentForm, DeleteStudentForm, DisableStudentForm} from '../../types';
import {FormikHelpers} from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { faSortDesc } from '@fortawesome/free-solid-svg-icons';
import { faSortAsc } from '@fortawesome/free-solid-svg-icons';

interface Props {
    students: StudentSearchType[];
    visible: boolean;
    submitFormSelectStudent:(values:SelectStudentForm, formikBag:FormikHelpers<SelectStudentForm>) => void;
    newStudentButtonClicked:()=> void;
    submitFormDeleteStudent:(values:DeleteStudentForm, formikBag:FormikHelpers<DeleteStudentForm>) => void;
    submitFormDisableStudent:(values:DisableStudentForm, formikBag:FormikHelpers<DisableStudentForm>) => void;
}

function StudentsSearch ({students,visible,submitFormSelectStudent,newStudentButtonClicked,submitFormDeleteStudent,submitFormDisableStudent}: Props): JSX.Element | null {
    

    
    //let newButton = <></>
    //let sortBy = "FOLIO"
    let [sortBy, setSortBy] = useState<string>("FOLIO +");
    let [searchString, setSearchString] = useState<string>("");
    let [folioString, setFolioString] = useState<ReactElement>(<FontAwesomeIcon icon={faSort}/>);
    let [carreraString, setCarreraString] = useState<ReactElement>(<FontAwesomeIcon icon={faSort}/>);
    let [nombreString, setNombreString] = useState<ReactElement>(<FontAwesomeIcon icon={faSort}/>);
    let [creadoString, setCreadoString] = useState<ReactElement>(<FontAwesomeIcon icon={faSort}/>);
    let [editadoString, setEditadoString] = useState<ReactElement>(<FontAwesomeIcon icon={faSort}/>);
    let [validadoString, setValidadoString] = useState<ReactElement>(<FontAwesomeIcon icon={faSort}/>);

    let [showHidden, setShowHidden] = useState<boolean>(false);
    /*
    if(Symbol.iterator in Object(props.school)){

        newButton = <Button variant="secondary">Nuevo</Button>
    }*/

    const onClickSortByFolio = () =>{
        if (sortBy === "FOLIO +"){
            setSortBy("FOLIO -");
            setFolioString(<FontAwesomeIcon icon={faSortAsc}/>);
        }else{
            setSortBy("FOLIO +");
            setFolioString(<FontAwesomeIcon icon={faSortDesc}/>);
            setCarreraString(<FontAwesomeIcon icon={faSort}/>);
            setNombreString(<FontAwesomeIcon icon={faSort}/>);
            setCreadoString(<FontAwesomeIcon icon={faSort}/>);
            setEditadoString(<FontAwesomeIcon icon={faSort}/>);
            setValidadoString(<FontAwesomeIcon icon={faSort}/>);
        }
    }
    const onClickSortByCarrera = () =>{
        if (sortBy === "CARRERA +"){
            setSortBy("CARRERA -");
            setCarreraString(<FontAwesomeIcon icon={faSortAsc}/>);
        }else{
            setSortBy("CARRERA +");
            setCarreraString(<FontAwesomeIcon icon={faSortDesc}/>);
            setFolioString(<FontAwesomeIcon icon={faSort}/>);
            setNombreString(<FontAwesomeIcon icon={faSort}/>);
            setCreadoString(<FontAwesomeIcon icon={faSort}/>);
            setEditadoString(<FontAwesomeIcon icon={faSort}/>);
            setValidadoString(<FontAwesomeIcon icon={faSort}/>);
        }
    }
    const onClickSortByNombre = () =>{
        if (sortBy === "NOMBRE +"){
            setSortBy("NOMBRE -");
            setNombreString(<FontAwesomeIcon icon={faSortAsc}/>);
        }else{
            setSortBy("NOMBRE +");
            setNombreString(<FontAwesomeIcon icon={faSortDesc}/>);
            setFolioString(<FontAwesomeIcon icon={faSort}/>);
            setCarreraString(<FontAwesomeIcon icon={faSort}/>);
            setCreadoString(<FontAwesomeIcon icon={faSort}/>);
            setEditadoString(<FontAwesomeIcon icon={faSort}/>);
            setValidadoString(<FontAwesomeIcon icon={faSort}/>);
        }
    }

    const onClickSortByCreado = () =>{
        if (sortBy === "CREADO +"){
            setSortBy("CREADO -");
            setCreadoString(<FontAwesomeIcon icon={faSortAsc}/>);
        }else{
            setSortBy("CREADO +");
            setCreadoString(<FontAwesomeIcon icon={faSortDesc}/>);
            setFolioString(<FontAwesomeIcon icon={faSort}/>);
            setNombreString(<FontAwesomeIcon icon={faSort}/>);
            setCarreraString(<FontAwesomeIcon icon={faSort}/>);
            setEditadoString(<FontAwesomeIcon icon={faSort}/>);
            setValidadoString(<FontAwesomeIcon icon={faSort}/>);
        }
    }

    const onClickSortByEditado = () =>{
        if (sortBy === "EDITADO +"){
            setSortBy("EDITADO -");
            setEditadoString(<FontAwesomeIcon icon={faSortAsc}/>);
        }else{
            setSortBy("EDITADO +");
            setEditadoString(<FontAwesomeIcon icon={faSortDesc}/>);
            setFolioString(<FontAwesomeIcon icon={faSort}/>);
            setNombreString(<FontAwesomeIcon icon={faSort}/>);
            setCarreraString(<FontAwesomeIcon icon={faSort}/>);
            setCreadoString(<FontAwesomeIcon icon={faSort}/>);
            setValidadoString(<FontAwesomeIcon icon={faSort}/>);
        }
    }

    const onChangeBuscarButton = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
        setNombreString(<FontAwesomeIcon icon={faSort}/>);
        setFolioString(<FontAwesomeIcon icon={faSort}/>);
        setCarreraString(<FontAwesomeIcon icon={faSort}/>);
        setCreadoString(<FontAwesomeIcon icon={faSort}/>);
        setEditadoString(<FontAwesomeIcon icon={faSort}/>);
        //setSearchString(e.nativeEvent.path[0].value)
        setSearchString(e.target.value)
        
    }

    const onClickSortByValidado = () =>{
        if (sortBy === "VALIDADO +"){
            setSortBy("VALIDADO -");
            setValidadoString(<FontAwesomeIcon icon={faSortAsc}/>);
        }else{
            setSortBy("VALIDADO +");
            setValidadoString(<FontAwesomeIcon icon={faSortDesc}/>);
            setFolioString(<FontAwesomeIcon icon={faSort}/>);
            setNombreString(<FontAwesomeIcon icon={faSort}/>);
            setCarreraString(<FontAwesomeIcon icon={faSort}/>);
            setCreadoString(<FontAwesomeIcon icon={faSort}/>);
            setEditadoString(<FontAwesomeIcon icon={faSort}/>);
        }
    }

    const showDisabledRecordsButtonClicked = () =>{
        if(showHidden){
            setShowHidden(false);
        }else{
            setShowHidden(true);
        }
    }

    if (visible){
        return (
        <Container>
            <Row>
                <Col>
                <Button variant="secondary" onClick={newStudentButtonClicked}>Nuevo</Button>
                </Col>
                <Col>
                {showHidden?
                <Button variant="warning" size="sm" onClick={showDisabledRecordsButtonClicked}>Ocultar deshabilitados</Button>
                :
                <Button variant="outline-warning" size="sm" onClick={showDisabledRecordsButtonClicked}>Mostrar deshabilitados</Button>
                }
                </Col>
                <Col>
                <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1" >Buscar</InputGroup.Text>
                <Form.Control
                placeholder="Nombre"
                aria-label="Nombre"
                aria-describedby="basic-addon1"
                onChange={onChangeBuscarButton}
                />
                </InputGroup>
                </Col>
            </Row>
            <Row>
                <Table >
                    <thead>
                        <tr>
                        <th>
                        <Button variant="light" onClick={onClickSortByFolio}><b>
                            {folioString}{'  '}
                            Folio
                            </b></Button>{' '}
                        </th>
                        <th>
                        <Button variant="light" onClick={onClickSortByNombre}><b>
                            {nombreString}{'  '}
                            Nombre
                            </b></Button>{' '}
                        </th>
                        <th>
                        <Button variant="light" onClick={onClickSortByCarrera}><b>
                            {carreraString}{'  '}
                            Carrera
                            </b></Button>{' '}
                        </th>
                        <th>
                        <Button variant="light" onClick={onClickSortByValidado}><b>
                            {validadoString}{'  '}
                            Validado
                            </b></Button>{' '}
                        </th>
                        <th>
                        <Button variant="light" onClick={onClickSortByCreado}><b>
                            {creadoString}{'  '}
                            Creado
                            </b></Button>{' '}
                        </th>
                        <th>
                        <Button variant="light" onClick={onClickSortByEditado}><b>
                            {editadoString}{'  '}
                            Editado
                            </b></Button>{' '}
                        </th>
                        <th></th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <StudentsSearchStudentItem
                        students={students}
                        submitFormSelectStudent={submitFormSelectStudent}
                        submitFormDeleteStudent={submitFormDeleteStudent}
                        submitFormDisableStudent={submitFormDisableStudent}
                        sortBy={sortBy}
                        searchString={searchString}
                        showHidden={showHidden}
                        />
                    </tbody>
                </Table>
            </Row>
        </Container>)
    }else{
        return (<></>)
    }
}
export default StudentsSearch