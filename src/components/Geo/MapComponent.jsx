import { useEffect, useRef } from "react";
import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSelector } from "react-redux";
import AreaSelect from "./AreaSelect";

const MapComponent = () => {
    const position = [47.06, 15.44]; // Graz coordinates
    const featureGroupRef = useRef();
    const mapRef = useRef();
    const geoJSONData = useSelector((state) => state.geo.geoJSON);
    useEffect(() => {
        if (!mapRef.current || !featureGroupRef.current) return;
        const currentFeatureGroup = featureGroupRef.current;
        currentFeatureGroup.clearLayers();
        if (!geoJSONData.features.length) return;
        const geoJSONLayer = L.geoJSON(geoJSONData).addTo(currentFeatureGroup);
        const bounds = geoJSONLayer.getBounds();
        mapRef.current.fitBounds(bounds);
    }, [geoJSONData]);

    return (
        <MapContainer
            ref={mapRef}
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <AreaSelect />
            <FeatureGroup ref={featureGroupRef} />
        </MapContainer>
    );
};

export default MapComponent;
