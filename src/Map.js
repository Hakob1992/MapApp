import React, { Component } from "react";
import { Map, TileLayer, Popup, Marker, withLeaflet, GeoJSON } from "react-leaflet";
import worldGeoJSON from 'world-map-geojson';
import ReactLeafletSearch from "react-leaflet-search";



const MyMarker = props => {

  const initMarker = ref => {
    if (ref) {
      ref.leafletElement.openPopup()
    }
  }

  return <Marker ref={initMarker} {...props} />
}

class MapExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPos: null
    };
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(e) {
    this.setState({ currentPos: e.latlng });
  }

  render() {
    return (


      <div className="App">

        <div className="info">
          <h1>Current location:</h1>
          {
            this.state.currentPos &&
            <div>
              <p>{JSON.stringify(this.state.currentPos.lat, null, 2)}</p>
              <p>{JSON.stringify(this.state.currentPos.lng, null, 4)}</p>
            </div>
          }
        </div>
        <Map
          center={this.props.center}
          zoom={this.props.zoom}
          zoomOut={1}
          attributionControl={false}
          onClick={this.handleClick}
          maxZoom={10}
          zoomControl={true}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
          animate={true}
          easeLinearity={0.35}
        >

          {this.state.currentPos && <MyMarker position={this.state.currentPos}>
          </MyMarker>}
          <GeoJSON
            data={worldGeoJSON}
            style={() => ({
              color: 'red',
              weight: 0.5,
              fillColor: "#1a1d62",
              fillOpacity: 1,
            })}
          />
          <ReactLeafletSearch
            position="topleft"
            inputPlaceholder="search"
            search={[]} // Setting this to [lat, lng] gives initial search input to the component and map flies to that coordinates, its like search from props not from user
            zoom={7} // Default value is 10
            showMarker={true}
            showPopup={false}
            openSearchOnLoad={false} // By default there's a search icon which opens the input when clicked. Setting this to true opens the search by default.
            closeResultsOnClick={false} // By default, the search results remain when you click on one, and the map flies to the location of the result. But you might want to save space on your map by closing the results when one is clicked. The results are shown again (without another search) when focus is returned to the search input.
            providerOptions={{ searchBounds: [] }} // The BingMap and OpenStreetMap providers both accept bounding coordinates in [se,nw] format. Note that in the case of OpenStreetMap, this only weights the results and doesn't exclude things out of bounds.
            customProvider={undefined | { search: (searchString) => { } }} // see examples to usage details until docs are ready
          />
        </Map>
      </div>
    )
  }
}

export default MapExample;