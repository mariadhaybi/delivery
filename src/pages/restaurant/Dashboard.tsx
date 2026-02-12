import React, { useState } from 'react';
import { MapPin, Building2, Package, Navigation, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useAuth } from "../../context/authContext";

// --- 1. Fix w Ta3dil el Icons (Orange & Blue) ---
const orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface OrderFormData {
  company_name: string;
  branch_name: string;
  contact_person: string;
  phone_number: string;
  email: string;
  pickup_address: string;
  pickup_area: string;
  pickup_notes: string;
  pickup_time: string;
  delivery_address: string;
  delivery_area: string;
  landmark: string;
  delivery_notes: string;
  pickup_lat: number;
  pickup_lng: number;
  delivery_lat: number;
  delivery_lng: number;
  package_type: string;
  package_size: string;
  order_reference_id: string;
  special_instructions: string;
  payment_method: string;
  order_value: string;
}

// --- 2. El Map ma3 2 Markers ---
const DeliveryMap = ({ 
  pickupLat, 
  pickupLng, 
  deliveryLat, 
  deliveryLng, 
  setLocation 
}: { 
  pickupLat: number; 
  pickupLng: number; 
  deliveryLat: number; 
  deliveryLng: number; 
  setLocation: (lat: number, lng: number) => void; 
}) => {
  
  const LocationMarker = () => {
    useMapEvents({
      click(e) { setLocation(e.latlng.lat, e.latlng.lng); },
    });
    // Marker el Delivery (Blue) li byet7arrak
    return <Marker position={[deliveryLat, deliveryLng]} icon={blueIcon} />;
  };

  return (
    <MapContainer center={[pickupLat, pickupLng]} zoom={13} className="w-full h-48 rounded-lg border" scrollWheelZoom>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {/* Marker el Pickup (Orange) - Sebet la2anno el restaurant */}
      <Marker position={[pickupLat, pickupLng]} icon={orangeIcon} />

      {/* Marker el Delivery (Blue) - Huwwe li mna2iye */}
      <LocationMarker />
    </MapContainer>
  );
};

const CompanyOrderForm = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState<OrderFormData>({
    company_name: '', branch_name: '', contact_person: '', phone_number: '', email: '',
    pickup_address: '', pickup_area: '', pickup_notes: '', pickup_time: '',
    delivery_address: '', delivery_area: '', landmark: '', delivery_notes: '',
    pickup_lat: 33.8938, pickup_lng: 35.5018,
    delivery_lat: 33.8889, delivery_lng: 35.5213,
    package_type: '', package_size: '', order_reference_id: '',
    special_instructions: '', payment_method: 'Cash on Delivery', order_value: '',
  });

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return Math.round((R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))) * 100) / 100;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setDeliveryLocation = (lat: number, lng: number) => {
    setFormData((prev) => ({ ...prev, delivery_lat: lat, delivery_lng: lng }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const distance = calculateDistance(formData.pickup_lat, formData.pickup_lng, formData.delivery_lat, formData.delivery_lng);
      const payload = { ...formData, distance, delivery_fee: 10 };
      await axios.post('http://127.0.0.1:8000/api/orders', payload, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      alert('Order Created Successfully!');
    } catch (error: any) {
      alert('Failed to create order');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        <div className="p-6 text-center border-b border-gray-50">
          <div className="bg-orange-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Package className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">New Delivery Request</h1>
          <p className="text-gray-500 text-sm">Fill out the form below to submit a delivery request</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          
          {/* Section 1: Company Info */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-orange-600">
              <Building2 size={20} />
              <h2 className="font-semibold">Company Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Company / Restaurant Name *" name="company_name" onChange={handleChange} required />
              <Input label="Branch Name (Optional)" name="branch_name" onChange={handleChange} />
              <Input label="Contact Person Name *" name="contact_person" onChange={handleChange} required />
              <Input label="Phone Number *" name="phone_number" onChange={handleChange} required />
              <div className="md:col-span-2">
                <Input label="Email Address *" type="email" name="email" onChange={handleChange} required />
              </div>
            </div>
          </section>

          <hr />

          {/* Section 2: Pickup Info */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-orange-600">
              <MapPin size={20} />
              <h2 className="font-semibold">Pickup Address</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Pickup Address *" name="pickup_address" onChange={handleChange} required />
              <Input label="Area / City *" name="pickup_area" onChange={handleChange} required />
              <div className="md:col-span-2">
                <Input label="Pickup Notes (Optional)" name="pickup_notes" onChange={handleChange} />
              </div>
              <Input label="Pickup Time *" type="datetime-local" name="pickup_time" onChange={handleChange} required />
            </div>
          </section>

          <hr />

          {/* Section 3: Delivery Location (2 Markers on Map) */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-orange-600">
              <Navigation size={20} /> 
              <h2 className="font-semibold">Delivery Location</h2>
            </div>
            <div className="mb-4">
              <DeliveryMap 
                pickupLat={formData.pickup_lat} 
                pickupLng={formData.pickup_lng}
                deliveryLat={formData.delivery_lat} 
                deliveryLng={formData.delivery_lng} 
                setLocation={setDeliveryLocation} 
              />
              <p className="text-xs text-gray-500 mt-2">Click on the map to select delivery location</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Full Delivery Address *" name="delivery_address" onChange={handleChange} required />
              <Input label="City / Area *" name="delivery_area" onChange={handleChange} required />
              <Input label="Landmark (Optional)" name="landmark" onChange={handleChange} placeholder="e.g. Near ABC Bank" />
              <Input label="Delivery Notes" name="delivery_notes" onChange={handleChange} placeholder="Building, Floor, etc." />
            </div>
          </section>

          <hr />

          {/* Section 4: Order Details */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-orange-600">
              <Package size={20} />
              <h2 className="font-semibold">Order Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Order Reference ID (Optional)" name="order_reference_id" onChange={handleChange} placeholder="e.g. #ORD-123" />
              <Select label="Package Type" name="package_type" onChange={handleChange} options={['Food', 'Electronics', 'Documents', 'Other']} />
              <Select label="Package Size" name="package_size" onChange={handleChange} options={['Small', 'Medium', 'Large']} />
              <Select label="Payment Type" name="payment_method" onChange={handleChange} options={['Cash on Delivery', 'Prepaid', 'Card on Delivery']} />
              <Input label="Order Value (Optional)" name="order_value" onChange={handleChange} placeholder="LBP or USD" />
              <div className="md:col-span-2">
                <Input label="Special Instructions (Optional)" name="special_instructions" onChange={handleChange} placeholder="e.g. Handle with care" />
              </div>
            </div>
          </section>

          {/* Footer Section */}
          <div className="pt-6 border-t">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100 mb-6">
              <CheckCircle className="text-green-500 shrink-0" size={20} />
              <p className="text-sm text-gray-700">
                Please review all details before submitting. Once the request is sent, a nearby driver will be notified to accept your order.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button type="submit" className="flex-[2] bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-orange-200">
                Submit Delivery Request
              </button>
              <button type="button" className="flex-1 bg-white border-2 border-gray-200 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50 transition">
                Save as Draft
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Components
const Input = ({ label, ...props }: any) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <input {...props} className="border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white" />
  </div>
);

const Select = ({ label, options, ...props }: any) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <select {...props} className="border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white">
      <option value="">Select an option</option>
      {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default CompanyOrderForm;