import './Loader.css';

const Loader=({className})=>{

    return(
        <div className={`loader-container ${className && ''}`}>
        <p></p>
        </div>
    );
}
export default Loader;