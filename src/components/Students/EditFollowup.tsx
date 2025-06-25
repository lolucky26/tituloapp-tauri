import Button from 'react-bootstrap/Button';
import {StudentType} from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';



interface Props {
    student : StudentType;
    downloadXMLButtonClicked: ()=> void;
    sendXMLButtonClicked: ()=> void;
    checkStatusXMLButtonClicked: ()=> void;
    downloadValidatedXMLButtonClicked: ()=> void;
    buttonsDisabled: boolean;
}

function StudentsEditFollowup ({student,downloadXMLButtonClicked,sendXMLButtonClicked,checkStatusXMLButtonClicked,downloadValidatedXMLButtonClicked,buttonsDisabled}: Props): JSX.Element | null {

        const isValidated  = () =>{
                if (student.estatusTracking == "XML validado por la SEP"){
                        return true
                }else {
                        return false
                }
        }

        return (<><h3>Seguimiento</h3>
        <Button variant="outline-primary" disabled={buttonsDisabled || isValidated()} onClick={downloadXMLButtonClicked}><FontAwesomeIcon icon={faDownload}/> Descargar XML</Button>{' '}
        <Button variant="outline-primary" disabled={buttonsDisabled || isValidated()} onClick={sendXMLButtonClicked}><FontAwesomeIcon icon={faPaperPlane}/> Enviar XML</Button>{' '}
        <Button variant="outline-primary" disabled={buttonsDisabled || isValidated()} onClick={checkStatusXMLButtonClicked}><FontAwesomeIcon icon={faCheckSquare}/> Ver Estatus XML-SEP</Button>{' '}
        
        <p><b>Estatus:</b></p>
        <p>{student.estatusTracking}</p>
        {(isValidated() ? <Button variant="outline-success" onClick={downloadValidatedXMLButtonClicked}><FontAwesomeIcon icon={faCheckSquare}/> Descargar título Validado</Button>:<></>)}
        </>
        )

}
export default StudentsEditFollowup

/*
submitFormEditStudent={props.submitFormEditStudent}
downloadXMLButtonClicked={props.downloadXMLButtonClicked}
checkStatusXMLButtonClicked={props.checkStatusXMLButtonClicked}
sendXMLButtonClicked={props.sendXMLButtonClicked}
*/