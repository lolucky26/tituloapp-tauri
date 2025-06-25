import {StudentType} from '../../types';

interface Props {
    student : StudentType;
}

function StudentsEditChain ({student}: Props): JSX.Element | null {
    return (
    <>
    <p><b>Cadena Original</b></p>
    <p>{student.cadenaOriginal}</p>
    </>
    )
}
export default StudentsEditChain