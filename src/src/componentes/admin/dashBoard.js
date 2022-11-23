import "../../assets/css/dashboard.css"
import {Container, Col} from "react-bootstrap"
import { faCashRegister, faUsersGear, faGifts } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const DashBoard = () => {
    return(
        <div className="w-100 h-100 p-4">
            <Container className="d-flex justify-content-evenly align-items-center">
                <Col xs={3} className="recuadro justify-content-center">
                    <Link className="enlace-dash" to={"/lista_ventas"}>
                        <div className="icon-dash text-center">
                            <FontAwesomeIcon icon={faCashRegister} size="6x" />
                        </div>
                        <div className="text-dash">
                            Ventas
                        </div>
                    </Link>
                </Col>

                <Col xs={3} className="recuadro justify-content-center">
                    <Link className="enlace-dash" to={"/lista_productos_admin"}>
                        <div className="icon-dash text-center">
                            <FontAwesomeIcon icon={faGifts} size="6x" />
                        </div>
                        <div className="text-dash">
                            Productos
                        </div>
                    </Link>
                </Col>

                <Col xs={3} className="recuadro justify-content-center">
                    <Link className="enlace-dash" to={"/lista_usuarios"}>
                        <div className="icon-dash text-center">
                            <FontAwesomeIcon icon={faUsersGear} size="6x" />
                        </div>
                        <div className="text-dash">
                            Usuarios
                        </div>
                    </Link>
                </Col>
            </Container>
        </div>
    )
}