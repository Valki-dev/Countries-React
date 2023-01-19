import { useState } from "react";
import "./CountriesList.css"

const CountriesList = ({ countries, countryToShow, setCountryToShow }) => {
    const [activateModal, setActivateModal] = useState(false);
    let countriesCopy = [...countries];
    let message = "";

    if (countriesCopy.length <= 0) {
        message = "No se ha encontrado ningún país con ese nombre";
        countriesCopy = [];
    } else if (countriesCopy.length > 10) {
        message = "Demasiados resultados, especifica más la búsqueda";
        countriesCopy = [];
    }

    const showDetails = (country) => {
        setCountryToShow(country);
        setActivateModal(true);
        console.log(country);
    }
    console.log(activateModal);

    if (activateModal) {
        let languages = Object.values(countryToShow.languages);
        return (
            <div className="col-12 col-lg-12 d-flex justify-content-center">
                <div className="details p-4" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title text-center">{countryToShow.name.common}</h3>
                                <hr />
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setActivateModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <hr />
                                <p><b>Capital:</b> {countryToShow.capital}</p>
                                <p><b>Población:</b> {countryToShow.population}</p>
                                <hr />
                                <h5>Lenguas habladas</h5>
                                <ul>
                                {
                                   languages.map(language => {
                                    return(
                                        <li>{language}</li>
                                    )
                                   })
                                }
                                </ul>
                                <div className="d-flex justify-content-center">
                                    <img className="flag mb-3" src={countryToShow.flags.png} alt="Bandera no disponible" />
                                </div>
                                <hr />
                                <h5>Weather in {countryToShow.capital}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <>
                {
                    countriesCopy.length <= 0 && (
                        <div className="col-12 col-lg-12 d-flex justify-content-center">
                            <h4>{message}</h4>
                        </div>
                    )
                }

                {
                    countriesCopy.length > 10 && (
                        <h4>{message}</h4>
                    )
                }

                {
                    countriesCopy.length == 1 && (
                        <div className="col-12 col-lg-12 d-flex justify-content-center">
                            <div className="card">
                                <div className="card-body">
                                    <b>{countriesCopy[0].name.common}</b>
                                    <hr />

                                </div>
                            </div>
                        </div>

                    )
                }

                {
                    countriesCopy.length > 1 && (
                        countriesCopy.map((country) => {
                            return (
                                <>
                                    <div className="col-12 col-lg-12 d-flex justify-content-center">
                                        <div className="card mt-3">
                                            <div className="card-body d-flex justify-content-between">

                                                <p className="countryName">{country.name.common}</p>
                                                <button className="btn btn-primary btnDetails" onClick={() => showDetails(country)}>Detalles</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    )

                }

                {/* {
                    !activateModal && (
                        <div className="modal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Modal title</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <p>Modal body text goes here.</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                } */}
            </>
        )
    }



}

export default CountriesList;