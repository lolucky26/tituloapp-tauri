interface Props {
    isVisible: boolean;
}

function Loading ({isVisible}: Props): JSX.Element | null {
    return(
        <>
        {isVisible?
        <div className="loading-body">
            <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            </div>
        </div>
        :<></>
        }
        </>
    );

    
}
  
  export default Loading;