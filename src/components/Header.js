import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title}) => {
    const onClick = (e) => {
        console.log("hy there");
    }

    return (
        <header className = 'header'>
            <h1>{title}</h1>
            <Button color='green' text = 'Add'
             onClick = {onClick}/>
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker yo',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header