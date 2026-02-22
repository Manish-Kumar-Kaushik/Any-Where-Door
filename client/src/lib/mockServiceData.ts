// Mock service provider data for Bhilai, Durg, Chhattisgarh region
// Each subcategory has its own relevant images - no repetition

export interface MockServiceProvider {
  id: string;
  name: string;
  address: string;
  phone_number: string;
  photo_url: string;
  rating: number;
  review_count: number;
  is_open: boolean;
  opening_time: string;
  closing_time: string;
  sub_category: string;
  category: string;
  website?: string;
}

// Subcategory-specific images - relevant to each service type
const subcategoryImages: Record<string, string[]> = {
  // Home Services
  "Plumbing": [
    "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1585671962208-8276f45213d5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581578731548-c64695ccb2ab?w=400&h=300&fit=crop"
  ],
  "Electrician": [
    "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1619641805634-98e5c7156d68?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1608228088998-57828365d486?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558618047-f4f8dd79a179?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=300&fit=crop"
  ],
  "Gardener / Maali": [
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558618047-57828365d486?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1582142306909-195724d33ffc?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558906107-30c40f22a47b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop"
  ],
  "Cleaning": [
    "https://images.unsplash.com/photo-1581578731548-c64695ccb2ab?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1585671962208-8276f45213d5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581578731548-c64695ccb2ab?w=400&h=300&fit=crop"
  ],
  "Pest Control": [
    "https://images.unsplash.com/photo-1558350285-97dc59847a6e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1574663767220-32e3b1f9b8d4?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558350285-97dc59847a6e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1574663767220-32e3b1f9b8d4?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558350285-97dc59847a6e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1574663767220-32e3b1f9b8d4?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop"
  ],
  "Appliance Repair": [
    "https://images.unsplash.com/photo-1585671962208-8276f45213d5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1585671962208-8276f45213d5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
  ],
  "Painting & Décor": [
    "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1574663767220-32e3b1f9b8d4?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1574663767220-32e3b1f9b8d4?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1574663767220-32e3b1f9b8d4?w=400&h=300&fit=crop"
  ],
  // Vehicle Services
  "Emergency Fuel Delivery": [
    "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1566015665328-27d6497a2c4d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1566015665328-27d6497a2c4d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1566015665328-27d6497a2c4d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=300&fit=crop"
  ],
  "Tyre Puncture / Replacement": [
    "https://images.unsplash.com/photo-1578849287263-5c2805ebb77a?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1503376763036-066120622c74?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1619641805634-98e5c7156d68?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578849287263-5c2805ebb77a?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1503376763036-066120622c74?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1619641805634-98e5c7156d68?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578849287263-5c2805ebb77a?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1503376763036-066120622c74?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1619641805634-98e5c7156d68?w=400&h=300&fit=crop"
  ],
  "Battery Jumpstart": [
    "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?w=400&h=300&fit=crop"
  ],
  "Towing Service": [
    "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1619641805634-98e5c7156d68?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578849287263-5c2805ebb77a?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1566015665328-27d6497a2c4d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1619641805634-98e5c7156d68?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578849287263-5c2805ebb77a?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1566015665328-27d6497a2c4d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1619641805634-98e5c7156d68?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578849287263-5c2805ebb77a?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1566015665328-27d6497a2c4d?w=400&h=300&fit=crop"
  ],
  "Car Wash & Detailing": [
    "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1520350192073-b6db7170a82f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1580273916550-e323be2ed5fa?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1520350192073-b6db7170a82f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1580273916550-e323be2ed5fa?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1520350192073-b6db7170a82f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1580273916550-e323be2ed5fa?w=400&h=300&fit=crop"
  ],
  "Regular Car/Bike Service": [
    "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1503376763036-066120622c74?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1503376763036-066120622c74?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1503376763036-066120622c74?w=400&h=300&fit=crop"
  ],
  // Health Services
  "Doctor Consultation": [
    "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=300&fit=crop"
  ],
  "Emergency Ambulance": [
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop"
  ],
  "Pharmacy / Medicine Delivery": [
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=300&fit=crop"
  ],
  "Pathology / Lab Tests": [
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop"
  ],
  "Physiotherapy": [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&h=300&fit=crop"
  ],
  "Dentist": [
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=300&fit=crop"
  ],
  "Nutritionist / Dietician": [
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=300&fit=crop"
  ],
  // Spa & Wellness
  "Massage Therapy": [
    "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1519823551278-64ac927d4fb1?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1519823551278-64ac927d4fb1?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1519823551278-64ac927d4fb1?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop"
  ],
  "Skin Care Treatments": [
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=300&fit=crop"
  ],
  "Hair Spa": [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&h=300&fit=crop"
  ],
  "Aromatherapy": [
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&h=300&fit=crop"
  ],
  "Relaxation Packages": [
    "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop"
  ],
  // Appointments
  "Salon Booking": [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop"
  ],
  "Doctor Appointment": [
    "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=300&fit=crop"
  ],
  "Fitness Trainer Session": [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558611848-73c7e7ba6f9c?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558611848-73c7e7ba6f9c?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558611848-73c7e7ba6f9c?w=400&h=300&fit=crop"
  ],
  "Tutoring / Education": [
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop"
  ],
  "Business Consultation": [
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop"
  ],
  // Finance Services
  "Banking": [
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop"
  ],
  "Insurance Agents": [
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop"
  ],
  "Tax Consultants": [
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
  ],
  "Loan Services": [
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop"
  ],
  "Investment Advisors": [
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop"
  ],
  // Travel & Emergency
  "Roadside Assistance": [
    "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1566015665328-27d6497a2c4d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1566015665328-27d6497a2c4d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1566015665328-27d6497a2c4d?w=400&h=300&fit=crop"
  ],
  "Lost & Found Help": [
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop"
  ],
  "Police / Emergency Helpline": [
    "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop"
  ],
  "Fire Station Locator": [
    "https://images.unsplash.com/photo-1516233672788-58308c7d6f36?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1562783487-623d90387053?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1516233672788-58308c7d6f36?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1562783487-623d90387053?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1516233672788-58308c7d6f36?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1562783487-623d90387053?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&h=300&fit=crop"
  ],
  "Nearby Services Map": [
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop"
  ]
};

// Get subcategory-specific image - no repetition
const getSubcategoryImage = (subCategory: string, index: number): string => {
  const images = subcategoryImages[subCategory];
  if (!images) {
    // Fallback - use Plumbing images
    return subcategoryImages["Plumbing"][index % 12];
  }
  return images[index % 12];
};

// Generate mock data for Bhilai, Durg, Chhattisgarh
export const generateMockProviders = (subCategory: string, category: string): MockServiceProvider[] => {
  const locations = [
    { area: "Supela, Bhilai", city: "Bhilai" },
    { area: "Durg, Chhattisgarh", city: "Durg" },
    { area: "Bhilai Steel Plant Area", city: "Bhilai" },
    { area: "Kumhari, Durg", city: "Durg" },
    { area: "Risali, Bhilai", city: "Bhilai" },
    { area: "Civic Centre, Durg", city: "Durg" },
    { area: "Nehru Nagar, Bhilai", city: "Bhilai" },
    { area: "Guru Ganga Nagar, Durg", city: "Durg" },
    { area: "Shanti Nagar, Bhilai", city: "Bhilai" },
    { area: "Mandi, Durg", city: "Durg" },
    { area: "Sanjay Nagar, Bhilai", city: "Bhilai" },
    { area: "Kachhe, Durg", city: "Durg" }
  ];
  
  const nameTemplates = [
    `Premium ${subCategory} Services`,
    `${subCategory} Center Bhilai`,
    `Durg ${subCategory} Experts`,
    `Chhattisgarh ${subCategory} Solutions`,
    `Reliable ${subCategory} Provider`,
    `Professional ${subCategory} Care`,
    `Elite ${subCategory} Services`,
    `Best ${subCategory} in Town`,
    `${subCategory} Masters Bhilai`,
    `Expert ${subCategory} Durg`,
    `Quality ${subCategory} Services`,
    `Top Rated ${subCategory}`
  ];
  
  const phoneTemplates = [
    "+91 98271 23456",
    "+91 94060 12345",
    "+91 93013 45678",
    "+91 99071 23456",
    "+91 98271 78901",
    "+91 94060 45678",
    "+91 93013 23456",
    "+91 99071 56789",
    "+91 98271 34567",
    "+91 94060 89012",
    "+91 93013 67890",
    "+91 99071 12345"
  ];
  
  const providerCount = 12;
  const providers: MockServiceProvider[] = [];
  
  for (let i = 0; i < providerCount; i++) {
    const location = locations[i];
    const isOpen = Math.random() > 0.2;
    
    providers.push({
      id: `${i + 1}`,
      name: nameTemplates[i],
      address: `${location.area}, ${location.city}, Chhattisgarh`,
      phone_number: phoneTemplates[i],
      photo_url: getSubcategoryImage(subCategory, i),
      rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
      review_count: Math.floor(50 + Math.random() * 450),
      is_open: isOpen,
      opening_time: "09:00",
      closing_time: "20:00",
      sub_category: subCategory,
      category: category
    });
  }
  
  return providers.sort((a, b) => b.rating - a.rating);
};
