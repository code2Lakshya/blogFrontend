import './Wrapper.css';

const Wrapper = ({ className, children }) => {

    return (
        <div className={`wrapper ${className ? className : ''}`}>
            {children}
        </div>
    );
}
export default Wrapper;