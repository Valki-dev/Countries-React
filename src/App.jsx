import { useEffect, useState } from 'react'
import './App.css'
import './components/CountriesList'
import CountriesList from './components/CountriesList';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [countryToShow, setCountryToShow] = useState({});
  const [countryWeather, setCountryWeather] = useState({});

  useEffect(() => {
    if(filter != "") {
      fetch(`https://restcountries.com/v3.1/name/${filter}`)
      .then(response => response.json())
      .then(result => {
        if(result?.status != 404) {
          setCountries([...result]);
        } else {
          setCountries([]);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
    }
  }, [filter]);

  useEffect(() => {
    if(countryToShow) {
      fetch(`http://api.weatherstack.com/current?access_key=276c6403285b5b852238655c4ca675c8&query=${countryToShow?.name?.common}`)
    .then(response => response.json())
    .then(result => {
      if(result?.status != 404) {
        setCountryWeather(result);
      } 
    })
    }
    
  }, [countryToShow]);

  const handleSetFilter = (event) => {
    let filterWord = event.target.value;
    setFilter(filterWord);
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-12 mt-3 d-flex justify-content-center align-items-center mb-4">
            <label htmlFor="countrie" className='me-2'>Buscar país: </label>
            <input type="text" className='form-control' name='countrie' placeholder='España...' onChange={handleSetFilter}/>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-12">
            <div className="row">
              <CountriesList countries={countries} countryToShow={countryToShow} setCountryToShow={setCountryToShow} countryWeather={countryWeather}></CountriesList>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
