import React, { Component } from 'react';

class MBTA extends Component {
constructor(props) {
    super(props);

    this.state = {
      stops : {},
      selectedStation: "",
      stationPrediction: []
    };

    this.fetchData = this.fetchData.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
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
        if(fetchType==="stops"){
          this.setState({stops: data});
        }else if (fetchType.includes("prediction")) {
          this.setState({
            selectedStation : fetchType.replace(/prediction,/,""),
            stationPrediction : data
          });
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

    componentDidMount(){
      this.fetchData("https://api-v3.mbta.com/stops?filter[route]=Green-C","stops")
    }

  render(){
    let stopsHTML;


    if(this.state.stops && Object.keys(this.state.stops).length != 0){
      let stopsInfo = this.state.stops.data;

      stopsHTML = stopsInfo.map(s => {

        if(s.attributes){
          let sInfo = s.attributes.name
          let stop = s.id

          let prediction;
          let prediction2;

          if(this.state.selectedStation === stop){
            if(this.state.selectedStation.length){
              console.log(this.state.selectedStation.length, this.state.stationPrediction.data)

              for(let i = 0; i<this.state.stationPrediction.data.length; i++){
                let train = this.state.stationPrediction.data[i];
                // console.log(train.attributes.status);

                // console.log("a",train.attributes.arrival_time,Date.parse(train.attributes.arrival_time));
                let now = new Date();
                console.log(train.attributes.status)
                console.log(train.attributes.arrival_time);
                console.log((Date.parse(train.attributes.arrival_time) - now)/60000);

                if(train.attributes.departure_time){//train.attributes.departure_time &&
                  console.log("^In");
                  let timeTilArrival = (Date.parse(train.attributes.arrival_time) - now)/60000

                  if(timeTilArrival > 0){
                    timeTilArrival = timeTilArrival.toFixed(2)
                    if(timeTilArrival < 1){
                      timeTilArrival *= 60
                      timeTilArrival = `${timeTilArrival} seconds`
                    }else{
                      timeTilArrival = `${timeTilArrival} minutes`
                    }
                    if(!prediction ){
                      prediction = (<div><li>{train.attributes.arrival_time}</li><li>{timeTilArrival}</li></div>);
                    }else if (!prediction2) {
                      prediction2 = (<div><li>{train.attributes.arrival_time}</li><li>{timeTilArrival}</li></div>);
                    }
                  }

                }
              }
            }
          }
          return(
            <ul key={stop}>
            <li onClick={this.clickHandler} id={stop}>{sInfo}</li>
            {prediction}
            {prediction2}
            </ul>
          )
        }

      })
    }
    return(
      <div>{stopsHTML}</div>
    )
  }
}

export default MBTA

//
// "https://api-v3.mbta.com/predictions?filter[direction_id]=Eastbound&filter[route]=Green-C&sort=departure_time&page[limit]=5&api_key=64a5296bc7e84128b2605d9d355a1d94"
