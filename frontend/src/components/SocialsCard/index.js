import './socials.css'

export default function SocialsCard(){
    return (
        <div className='socials-card'>
            {/* <div className='socials-title'>Let's Connect!</div> */}
            <div className='icon-div'>
                <a href='https://github.com/alex-rafael-13' target="_blank">
                    <i className="fa-brands fa-github" id='icon'></i>
                </a>
                <a href='https://www.linkedin.com/in/alexis-rafael-319092275/' target="_blank">
                    <i className="fa-brands fa-linkedin" id='icon'></i>
                </a>
            </div>
        </div>
    )
}