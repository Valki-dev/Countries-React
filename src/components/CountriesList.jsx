import { useState } from "react";
import "./CountriesList.css"

const CountriesList = ({ countries, countryToShow, setCountryToShow, countryWeather }) => {
    const [activateModal, setActivateModal] = useState(false);
    let countriesCopy = [...countries];
    let message = "";
    let languagesOneCountry = null;

    if (countriesCopy.length <= 0) {
        message = "No se ha encontrado ningún país con ese nombre";
        countriesCopy = [];
    } else if (countriesCopy.length > 10) {
        message = "Demasiados resultados, especifica más la búsqueda";
        countriesCopy = [];
    } else if (countriesCopy.length == 1) {
        languagesOneCountry = Object.values(countriesCopy[0].languages);
        setCountryToShow(countriesCopy[0]);
    }

    const showDetails = (country) => {
        setCountryToShow(country);
        setActivateModal(true);
    }

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
                                <h5>Lenguas habladas:</h5>
                                <ul>
                                    {
                                        languages.map((language, index) => {
                                            return (
                                                <li key={index}>{language}</li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="d-flex justify-content-center">
                                    <img className="flag mb-3" src={countryToShow.flags.png} alt="Bandera no disponible" />
                                </div>
                                <hr />
                                <h5>Tiempo en {countryToShow.capital}:</h5>
                                <p><b>Temperatura:</b> {countryWeather?.current?.temperature}º C</p>
                                <img src={countryWeather?.current?.weather_icons} alt="Imagen no disponible" />
                                <p className="mt-3"><b>Viento:</b></p>
                                <ul>
                                    <li>Velocidad: {countryWeather?.current?.wind_speed} mph</li>
                                    <li>Dirección: {countryWeather?.current?.wind_dir}</li>
                                </ul>
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
                            <div className="card" id="oneCountryCard">
                                <div className="card-body">
                                    <h2 className="text-center">{countriesCopy[0].name.common}</h2>
                                    <hr />
                                    <p><b>Capital:</b> {countriesCopy[0].capital}</p>
                                    <p><b>Población:</b> {countriesCopy[0].population}</p>
                                    <hr />
                                    <h4>Lenguas habladas:</h4>
                                    <ul>
                                        {
                                            languagesOneCountry.map((language, index) => {
                                                return (
                                                    <li key={index}>{language}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <div className="d-flex justify-content-center mt-2 mb-3">
                                        <img className="flag mb-3" src={countriesCopy[0].flags.png} alt="Bandera no disponible" />
                                    </div>
                                    <hr />
                                    <h4>Tiempo en {countriesCopy[0].capital}:</h4>
                                    <p><b>Temperatura:</b> {countryWeather?.current?.temperature}º C</p>
                                    <img src={countryWeather?.current?.weather_icons} alt="Imagen no disponible" />
                                    <p className="mt-3"><b>Viento:</b></p>
                                    <ul>
                                        <li>Velocidad: {countryWeather?.current?.wind_speed} mph</li>
                                        <li>Dirección: {countryWeather?.current?.wind_dir}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    (countriesCopy.length > 1) && (countriesCopy.length < 10) && (
                        countriesCopy.map((country, index) => {
                            return (
                                <>
                                    <div className="col-12 col-lg-12 d-flex justify-content-center" key={index}>
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
            </>
        )
    }

}

export default CountriesList;