import React, { Component } from 'react';
import MBTADropdown from './mbtaDropdown'

class MBTA extends Component {
constructor(props) {
    super(props);

    this.state = {
      routes: {},
      stops : {},
      selectedStation: "",
      stationPrediction: []
    };

    this.fetchData = this.fetchData.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
    this.stopsChangeHandler = this.stopsChangeHandler.bind(this)

  }

  fetchData(url,fetchType){
      fetch(url)
      .then(response => {
        if (response.ok) {return response;}
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if(fetchType.includes("prediction")) {
          this.setState({
            selectedStation : fetchType.replace(/prediction,/,""),
            stationPrediction : data
          });
        }else {
          this.setState({[fetchType]: data});
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    };



    clickHandler(event){
      this.fetchData(
        `https://api-v3.mbta.com/predictions?filter[stop]=${event.target.id}&filter[direction_id]=Eastbound&filter[route]=Green-C&sort=departure_time&page[limit]=90&api_key=64a5296bc7e84128b2605d9d355a1d94`,
        `prediction,${event.target.id}`
      )
    }

    stopsChangeHandler(event){
      this.fetchData(
        `https://api-v3.mbta.com/predictions?filter[stop]=${event.target.value}&filter[direction_id]=Eastbound&filter[route]=Green-C&sort=departure_time&page[limit]=90&api_key=64a5296bc7e84128b2605d9d355a1d94`,
        `prediction,${event.target.value}`
      )
    }

    componentDidMount(){
      this.fetchData("https://api-v3.mbta.com/routes?filter[type]=0,1","routes");
      this.fetchData("https://api-v3.mbta.com/stops?filter[route]=Green-C","stops");
      this.fetchData(
        `https://api-v3.mbta.com/predictions?filter[stop]=place-stpul&filter[direction_id]=Eastbound&filter[route]=Green-C&sort=departure_time&page[limit]=90&api_key=64a5296bc7e84128b2605d9d355a1d94`,
        `prediction,place-stpul`
      )//change argument to default station set in settings
    }

  render(){
    //Get Stops and Populate Dropdown Menu
    let routesHTML
    if(this.state.routes && Object.keys(this.state.routes).length != 0){
      routesHTML = (<MBTADropdown

          data={this.state.routes.data}
          default={"Green-C"}
          displayedAttribute = {"long_name"}
          />)
    }

    let stopsHTML;
    if(this.state.stops && Object.keys(this.state.stops).length != 0){
      stopsHTML = (<MBTADropdown
        data={this.state.stops.data}
        default={"place-stpul"}
        displayedAttribute = {"name"}
        changeHandler = {this.stopsChangeHandler}
        />)
    }

    //Predictions
    let prediction1, prediction2;
    if(this.state.selectedStation.length){

      for(let i = 0; i<this.state.stationPrediction.data.length; i++){
        let train = this.state.stationPrediction.data[i];

        let now = new Date();
        if(train.attributes.departure_time){//train.attributes.departure_time &&

          let timeTilArrival = (Date.parse(train.attributes.arrival_time) - now)/60000

          if(timeTilArrival > 0){

            if(timeTilArrival < 1){
              timeTilArrival *= 60
              timeTilArrival = timeTilArrival.toFixed(0)
              timeTilArrival = `${timeTilArrival} seconds`
            }else{
              timeTilArrival = timeTilArrival.toFixed(0)
              timeTilArrival = `${timeTilArrival} minutes`
            }

            if(!prediction1 ){
              prediction1 = (<div className = "prediction cell small-12 large-6">{timeTilArrival}</div>);
            }else if (!prediction2) {
              prediction2 = (<div className = "prediction cell small-12 large-6">{timeTilArrival}</div>);
            }
          }

        }
      }
    }


    return(
      <div className="grid-x grid-margin-x">
        <div className="weather small-6">
          <div id="weatherIcon">
            <canvas id="icon1" ></canvas><br />
          </div>
          <p className="newsDescription weatherInfo">
            <span className="weather" id="temp" className="current"></span><br />
            <span className="weather" id="location" className="current"></span>
          </p>
        </div>
        <div className="mbta small-6">
          {routesHTML}
          {stopsHTML}

          <div className="predictions grid-x grid-margin-x grid-margin-y">
            {prediction1}
            {prediction2}
          </div>
        </div>
      </div>

    )
  }
}

export default MBTA

//
// "https://api-v3.mbta.com/predictions?filter[direction_id]=Eastbound&filter[route]=Green-C&sort=departure_time&page[limit]=5&api_key=64a5296bc7e84128b2605d9d355a1d94"
