import React, { useState } from 'react';
import { connect, useDispatch } from "react-redux";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Space, Tag } from 'antd';
import { addSearchResult } from '../../actions'


const AutocompleteInput = (props) => {
    
    const dispatch = useDispatch()
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({ lat: 3.140560, lng: 101.690075 });

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
        dispatch(addSearchResult({ id: latLng.lat + latLng.lng, data: value }))
    };

    return (
        <div>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input {...getInputProps({ placeholder: 'Enter address' })} />
                        <div>
                            {loading ? <div>Loading...</div> : null}
                            {suggestions.map((suggestion) => {
                                const style = {
                                    backgroundColor: suggestion.active ? '#41b6e6' : '#f9f9f9'
                                };
                                return (
                                    <div {...getSuggestionItemProps(suggestion, { style })}>
                                        {suggestion.description}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
            {window.google === undefined ? <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_KEY}>
                <GoogleMap
                    center={coordinates}
                    zoom={10}
                    mapContainerStyle={{ height: '550px', width: '100%' }}
                >
                    {coordinates.lat && coordinates.lng && (
                        <Marker position={coordinates} />
                    )}
                </GoogleMap>
            </LoadScript> : <GoogleMap
                center={coordinates}
                zoom={10}
                mapContainerStyle={{ height: '550px', width: '100%' }}
            >
                {coordinates.lat && coordinates.lng && (
                    <Marker position={coordinates} />
                )}
            </GoogleMap>
            }
            <div style={{ paddingTop: "50px" }}>
                <h3>Recent Searches</h3>
                <Space size={[0, 8]} wrap>
                    {props?.searchHistory?.map(el => {
                        return (
                            <Tag>{el.data}</Tag>
                        )
                    })}
                </Space>
            </div>
        </div>
    );

};

const mapStateToProps = (state) => {
    const historyItems = Object.values(state.searchHistory);
    return { searchHistory: historyItems }
}
export default connect(mapStateToProps, { addSearchResult })(AutocompleteInput);

