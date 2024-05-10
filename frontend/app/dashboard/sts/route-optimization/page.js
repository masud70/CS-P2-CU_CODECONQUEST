"use client";
import { Divider, Select, SelectItem } from "@nextui-org/react";
import { Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const center = { lat: 22.482153, lng: 91.802773 };
// const destination = { lat: 22.505678, lng: 91.804193 };

const Directions = ({ setData, origin, destination }) => {
	const map = useMap();
	const rl = useMapsLibrary("routes");
	const [ds, setDs] = useState();
	const [dr, setDr] = useState();
	const [routes, setRoutes] = useState([]);
	const [routeIdx, setRouteIdx] = useState(0);
	const selected = routes[routeIdx];
	const leg = selected?.legs[0];

	useEffect(() => {
		console.log(origin, destination);
		if (!leg) return;
		setData({
			distance: leg.distance.value / 1000.0,
			duration: leg.duration.value / 60,
		});
	}, [leg, origin, destination]);

	useEffect(() => {
		if (!rl || !map) return;
		setDs(new rl.DirectionsService());
		setDr(new rl.DirectionsRenderer({ map }));
	}, [rl, map]);

	useEffect(() => {
		if (!dr || !ds) return;
		ds.route({
			origin: origin,
			destination: destination,
			travelMode: google.maps.TravelMode.DRIVING,
			provideRouteAlternatives: true,
		}).then((resp) => {
			dr.setDirections(resp);
			setRoutes(resp.routes);
		});
	}, [ds, dr]);

	useEffect(() => {
		if (!dr) return;
		dr.setRouteIndex(routeIdx);
	}, [routeIdx, dr]);

	if (!leg) return null;

	return (
		<div className="absolute right-4 top-4 p-4 bg-slate-700 text-white flex flex-col rounded-lg overflow-hidden">
			<div className="w-full text-center text-2xl font-bold border-b-2 border-slate-300">
				Route Summary
			</div>
			<div className="text-xl font-bold">{selected?.summary}</div>
			<div className="flex">
				<div className="font-bold text-md w-2/6">Route:</div>
				<div className="w-4/6">
					<span className="bg-slate-600 p-1 rounded overflow-hidden">
						{leg.start_address.split(",")[0]}
					</span>{" "}
					to{" "}
					<span className="bg-slate-600 p-1 rounded overflow-hidden">
						{leg.end_address.split(",")[0]}
					</span>
				</div>
			</div>
			<div className="flex">
				<div className="font-bold text-md w-2/6">Distance:</div>
				<div className="w-4/6">{leg.distance?.text}</div>
			</div>
			<div className="flex">
				<div className="font-bold text-md w-2/6">Duration:</div>
				<div className="w-4/6">{leg.duration?.text}</div>
			</div>

			<div className="font-bold text-xl">Other routes:</div>
			<ul className="list-decimal ml-10">
				{routes.map((route, idx) => (
					<li className="" key={route.summary}>
						<button onClick={() => setRouteIdx(idx)}>
							{route.summary}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

const page = () => {
	const [data, setData] = useState({});
	const [origins, setOrigins] = useState([]);
	const [destinations, setDestinations] = useState([]);
	const [vehicles, setVehicles] = useState([]);
	const [route, setRoute] = useState({});
	const [src, setSrc] = useState({ lat: 22.482153, lng: 91.802773 });
	const [dest, setDest] = useState({ lat: 22.505678, lng: 91.804193 });
	const auth = useSelector((st) => st.auth);

	const getData = async () => {
		try {
			const sts = await axios({
				method: "GET",
				url: `${process.env.backendUrl}/sts/all-sts/`,
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
			});

			const landfill = await axios({
				method: "GET",
				url: `${process.env.backendUrl}/sts/all-landfills`,
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
			});

			setData({
				sts: sts.data.sts,
				landfills: landfill.data.landfills,
			});

			const stsArray = sts.data.sts.map((item) => ({
				label: item.locationName || item.id.toString(),
				value: item.id,
			}));
			const landfillArray = landfill.data.landfills.map((item) => ({
				label: item.locationName || item.id.toString(),
				value: item.id,
			}));

			setOrigins(stsArray);
			setDestinations(landfillArray);
		} catch (error) {
			console.log(error);
		}
	};

	const getVehicles = async () => {
		try {
			const result = await axios({
				method: "GET",
				url: `${process.env.backendUrl}/sts/available-vehicle/${data.stsId}`,
				headers: {
					Authorization: `Bearer ${auth.token}`,
				},
			});

			const vehicleArray = result.data.vehicles.map((item) => ({
				label: item.regNumber,
				value: item.id,
			}));

			setVehicles(vehicleArray);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		if (!data.stsId) return;
		getVehicles();
	}, [data]);

	useEffect(() => {
		if (vehicles.length <= 0) return;
		const s = data.sts.find((it) => it.id == data.stsId);
		const d = data.landfills.find((it) => it.id == data.landfillId);

		setSrc({ lat: s?.lat, lng: s?.lng });
		setDest({ lat: d?.lat, lng: d?.lng });
	}, [vehicles]);

	useEffect(() => {
		console.log(src, dest);
	}, [src, dest]);

	return (
		<div className="w-full flex flex-col space-y-2 p-2 rounded justify-center items-center overflow-hidden">
			<div className="w-full text-center font-extrabold text-3xl py-2">
				Route Optimization
			</div>
			<Divider />
			<div className="w-4/5 flex flex-col space-y-2">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Select
						placeholder="Source location"
						labelPlacement="outside"
						label="Source location"
						className="py-0 mt-0 font-bold"
						name="stsId"
						onChange={(e) => {
							setData((prevData) => ({
								...prevData,
								[e.target.name]: e.target.value,
							}));
						}}
					>
						A
						{origins.map((origin) => (
							<SelectItem
								className="text-slate-900"
								key={origin.value}
								value={origin.value}
							>
								{origin.label}
							</SelectItem>
						))}
					</Select>
					<Select
						placeholder="Destination location"
						labelPlacement="outside"
						label="Destination location"
						className="py-0 mt-0 font-bold"
						name="landfillId"
						onChange={(e) => {
							setData((prevData) => ({
								...prevData,
								[e.target.name]: e.target.value,
							}));
						}}
					>
						A
						{destinations.map((destination) => (
							<SelectItem
								className="text-slate-900"
								key={destination.value}
								value={destination.value}
							>
								{destination.label}
							</SelectItem>
						))}
					</Select>

					<Select
						placeholder="Select truck"
						labelPlacement="outside"
						label="Select truck"
						className="py-0 mt-0 font-bold"
						name="vehicleId"
						onChange={(e) => {
							setData((prevData) => ({
								...prevData,
								[e.target.name]: e.target.value,
							}));
						}}
					>
						A
						{vehicles.map((vehicle) => (
							<SelectItem
								className="text-slate-900"
								key={vehicle.value}
								value={vehicle.value}
							>
								{vehicle.label}
							</SelectItem>
						))}
					</Select>
				</div>
				<div className="w-full h-[700px] p-2 bg-green-200 relative border-2 border-slate-600 rounded overflow-hidden">
					<Map
						style={{ width: "100%", height: "100%" }}
						defaultCenter={src}
						defaultZoom={15}
					>
						<Directions
							setData={setRoute}
							origin={src}
							destination={dest}
						/>
					</Map>
				</div>
				<div className="w-full p-4">
					<div className="w-full font-bold text-center text-3xl border-b-2 border-slate-600">
						Summary
					</div>
					<div className="flex flex-row">
						<div className="w-[200px] text-lg font-bold">
							Distance :
						</div>
						<div className="text-md font-bold">
							{route.distance} km
						</div>
					</div>
					<div className="flex flex-row">
						<div className="w-[200px] text-lg font-bold">
							Duration :
						</div>
						<div className="text-md font-bold">
							{route.duration} min(s)
						</div>
					</div>
					<div className="flex flex-row">
						<div className="w-[200px] text-lg font-bold">
							Registration No. :
						</div>
						<div className="text-md font-bold">DHA112</div>
					</div>
					<div className="flex flex-row">
						<div className="w-[200px] text-lg font-bold">
							Source Location :
						</div>
						<div className="text-md font-bold">Azimpur</div>
					</div>
					<div className="flex flex-row">
						<div className="w-[200px] text-lg font-bold">
							Destination Location :
						</div>
						<div className="text-md font-bold">Amin Bazar</div>
					</div>
					<div className="flex flex-row">
						<div className="w-[200px] text-lg font-bold">
							Total Cost :
						</div>
						<div className="text-md font-bold">12,300 TK</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
