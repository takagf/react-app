import "./login.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Login(){
    return (
        <>
        <div className="masthead">
                <div className="masthead-content text-white">
                    <div className="container-fluid px-4 px-lg-0">
                        <h1 className="fst-italic lh-1 mb-4">Seja bem-vindo!</h1>
                        <p className="mb-5">Adicione, edite e exclua seus produtos. O estoque de sua empresa na palma da sua mão!</p>
                        <div className="row input-group-newsletter">
                            <div className="col-auto"><Link to='/home' class="btn btn-primary">Acessar</Link></div>
                        </div>
                    </div>
                </div>
        </div>
        <div class="social-icons">
                <div className="d-flex flex-row flex-lg-column justify-content-center align-items-center h-100 mt-3 mt-lg-0">
                    <a className="btn btn-dark m-3" href="https://www.instagram.com/falcao_gf/  "><FontAwesomeIcon icon={faInstagram}/></a>
                    <a className="btn btn-dark m-3" href="https://github.com/takagf"><FontAwesomeIcon icon={faGithub}/></a>
                </div>
            </div>
        </>  
    )
}

export default Login;