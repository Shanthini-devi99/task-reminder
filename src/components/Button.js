import PropTypes from 'prop-types';
const Button = ({ color, text, onClick }) => {
    return(
    <div>
        <button style={{ backgroundColor: color }} className="btn" onClick={onClick}>{text}</button>
        {/* <button className='btn' onClick={() => console.log("hola hola")}>abc</button> */}
    </div>
    )

};
Button.defaultProps = {
    color: 'steelblue',

}
Button.propTypes = {
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}
export default Button;
