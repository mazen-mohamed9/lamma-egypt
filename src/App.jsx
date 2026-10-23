import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Truck, 
  Store, 
  Sparkles, 
  MapPin, 
  Clock, 
  Navigation, 
  Heart, 
  ShieldCheck, 
  Recycle, 
  Layers, 
  Info, 
  DollarSign, 
  Check, 
  Award,
  Globe,
  Map as MapIcon,
  ShoppingBag,
  Search,
  PlusCircle,
  Scale,
  ExternalLink,
  Navigation2,
  Wifi,
  Box,
  Boxes,
  CheckCircle2,
  BarChart3,
  Moon,
  Sun,
  Filter,
  Zap,
  Shield,
  TrendingUp
} from 'lucide-react';

const OCT_2026_FUEL_PER_LITER = 20.75; 
const TRICYCLE_L_PER_KM = 0.04; 
const FUEL_COST_PER_KM = TRICYCLE_L_PER_KM * OCT_2026_FUEL_PER_LITER; 
const VEHICLE_WEAR_PER_KM = 0.50; 

const SHOP_BUY_PRICE_PER_KG = 2.50; 
const DEALER_RESALE_PRICE_PER_KG = 8.00; 

const TRANSLATIONS = {
  ar: {
    appName: "لَمّة",
    appTagline: "منصة تجميع الكرتون الذكي • الهدف 11",
    tabZabaleen: "مسار الجامع",
    tabShopkeeper: "إضافة نقطة",
    tabComparison: "مقارنة الأداء",
    tabWhy: "التقرير والأثر",
    
    onlineMode: "متصل بالشبكة",

    routeTitle: "تخطيط مسارات الشوارع التجارية بمصر",
    routeSubtitle: "تجميع طلبات المحلات الصغرى في مشوار موحد لحساب صافي الربح بالساعة بدقة.",
    minCapacity: "أقصى حمولة مركبة:",
    filterTimeLabel: "تصفية المسار حسب وقت الاستلام:",
    allTimeWindows: "جميع الأوقات (عرض الكل)",
    kg: "كجم",
    egp: "ج.م",
    mapHeader: "خريطة OpenStreetMap والتوجيه التفاعلي",
    totalCardboard: "إجمالي كرتون المشوار",
    expectedReturn: "صافي ربح الجامع للمشوار",
    hourlyRate: "معدل الربح بالساعة",
    fuelSaved: "تكلفة الوقود المحسوبة",
    routeStops: "محطات المشوار المخطط",
    shops: "محلات",
    qualifiedCapacity: "مستوفي سعة المركبة",
    collected: "تم الاستلام بنجاح",

    shopFormTitle: "إضافة نقطة استلام جديدة بالشارع التجاري",
    shopFormSubtitle: "ابحث عن أي شارع في مصر أو حدد الموقع على الخريطة وحدد وقت الاستلام والتجميع",
    shopNameLabel: "اسم المحل أو النشاط التجاري",
    shopNamePlaceholder: "مثال: سوبرماركت التقوى - عباس العقاد",
    areaLabel: "اسم الشارع، الحي، أو المدينة (مصر)",
    searchPlaceBtn: "بحث وتحديد",
    clickMapNotice: "💡 اضغط في أي مكان على الخريطة لتحديد موقع المتجر بدقة!",
    weightLabel: "الوزن التقديري بالكيلوجرام (الكرتون)",
    pickupTimeLabel: "وقت تسليم واستلام الكرتون",
    submitRequest: "تأكيد وإضافة نقطة الاستلام",
    
    beforeAfterTitle: "لوحة مقارنة الأداء الميداني (قبل vs. بعد)",
    beforeAfterSubtitle: "نتائج تطبيق خوارزمية لَمّة لـ 41 كجم كرتون عبر 5 محطات تجارية",
    baselineHeader: "المسار العشوائي التقليدي (غير محسّن)",
    optimizedHeader: "مسار لَمّة المجمّع (محسّن بالكامل)",
    metricDist: "إجمالي مسافة المشوار",
    metricTime: "إجمالي زمن العمل",
    metricFuel: "تكلفة البنزين (20.75 ج.م/لتر)",
    metricNet: "صافي ربح الجامع للمشوار",
    metricHourly: "صافي الربح الفعلي بالساعة",
    netGainBanner: "🎯 النتيجة: مضاعفة إنتاجية الجامع بالساعة بنسبة +97.8% وتوفير 45.3% من وقت العمل!",

    whyBadge: "SDG 11 • المدن والمجتمعات المستدامة",
    whyMainTitle: "مشروع «لَمّة»: الحل الاقتصادي والتقني لتجميع الكرتون بمصر",
    whyMainSubtitle: "دمج القطاع غير الرسمي (الزبالين) بدون فرض أي رسوم عليهم، ومضاعفة دخلهم بالساعة عبر تجميع الطلبات الصغرى (3-10 كجم) في مسارات مربحة.",
    unitEconTitle: "اقتصاديات الجولة المحدثة",
    unitEconDesc: "شراء الكرتون بـ 2.50 ج.م/كجم وبيعه للتجار بـ 8.00 ج.م/كجم يحقق هامش مجدي عند تجميع 40+ كجم.",
    dignityTitle: "تمكين القطاع غير الرسمي",
    dignityDesc: "احترام شبكات العلاقات القائمة وتوفير أداة تنظيمية رقمية تجعل العمل أسرع وأكثر كرامة.",
    environmentTitle: "الأثر البيئي الحضري",
    environmentDesc: "تقليل تكدس الكرتون القابل للاشتعال أمام المحلات بالمرور المخطط والمنتظم.",
    
    advantagesTitle: "مميزات منصة لَمّة (Platform Core Advantages)",
    adv1Title: "تجميع ذكي للشوارع التجارية",
    adv1Desc: "جمع الطلبات الصغيرة (3-10 كجم) المتناثرة في مسار واحد عالي الكثافة باستخدام خوارزمية CVRPTW.",
    adv2Title: "دخل مضمون بدون عمولات",
    adv2Desc: "رسوم تشغيل بنسبة 0% لجامعي المخلفات (الزبالين)، لضمان حماية كامل دخلهم اليومي.",
    adv3Title: "ملاحة مباشرة وخريطة تفاعلية",
    adv3Desc: "توجيه لحظي عبر OpenStreetMap مع ربط مباشر بخرائط جوجل لكل محطة استلام.",

    timeWin1: "اليوم 12:00 ظهراً - 3:00 عصراً",
    timeWin2: "اليوم 3:00 عصراً - 6:00 مساءً",
    timeWin3: "اليوم 6:00 مساءً - 9:00 مساءً",
    timeWin4: "غداً صباحاً 9:00 صباحاً - 12:00 ظهراً",
    timeWin5: "غداً مساءً 4:00 عصراً - 8:00 مساءً",
    
    payoutEst: "القيمة المدفوعة للمحل (2.50 ج.م/كجم):",
    customCoordsSet: "تم تحديد إحداثيات الموقع بنجاح!",
    launchFullRoute: "🚀 فتح المسار الموحد في خرائط جوجل",
    openInGmaps: "خرائط جوجل",
    clickMapPrompt: "💡 اضغط على الخريطة لتحديد موقع المتجر بدقة",
    alleySpot: "نقطة جديدة"
  },
  en: {
    appName: "Lamma",
    appTagline: "Smart Cardboard Platform • SDG 11",
    tabZabaleen: "Collector Route",
    tabShopkeeper: "Add Pickup",
    tabComparison: "Before / After",
    tabWhy: "Report & Impact",
    
    onlineMode: "Online Network",

    routeTitle: "Egypt Commercial Corridors Routing",
    routeSubtitle: "Aggregating micro-shop requests into profit-optimized rounds using CVRPTW.",
    minCapacity: "Max Vehicle Payload:",
    filterTimeLabel: "Filter Route by Time Window:",
    allTimeWindows: "All Time Windows (View All)",
    kg: "kg",
    egp: "EGP",
    mapHeader: "OpenStreetMap Interactive Routing Map",
    totalCardboard: "Total Round Cardboard",
    expectedReturn: "Collector Net Profit",
    hourlyRate: "Hourly Earnings Rate",
    fuelSaved: "Calculated Fuel Cost",
    routeStops: "Planned Route Stops",
    shops: "shops",
    qualifiedCapacity: "Within Payload Capacity",
    collected: "Collected Successfully",

    shopFormTitle: "Add Corridor Pickup Point",
    shopFormSubtitle: "Search any street in Egypt or pin spot on map and specify pickup time window",
    shopNameLabel: "Shop / Retail Name",
    shopNamePlaceholder: "e.g. Al-Taqwa Supermarket - Abbas El-Akkad",
    areaLabel: "Street, District, or City Name (Egypt)",
    searchPlaceBtn: "Search & Pin",
    clickMapNotice: "💡 Click anywhere on the map to pinpoint your exact shop spot!",
    weightLabel: "Estimated Cardboard Weight (kg)",
    pickupTimeLabel: "Cardboard Collection Time Window",
    submitRequest: "Confirm & Add Pickup Point",
    
    beforeAfterTitle: "Field Operational Comparison (Before vs. After)",
    beforeAfterSubtitle: "Simulated execution of 41 kg cardboard collection across 5 retail stops",
    baselineHeader: "Unoptimized Baseline (B1)",
    optimizedHeader: "Lamma CVRPTW Route",
    metricDist: "Total Route Distance",
    metricTime: "Total Working Duration",
    metricFuel: "Fuel Cost (EGP 20.75/L)",
    metricNet: "Collector Net Profit",
    metricHourly: "Net Hourly Rate",
    netGainBanner: "🎯 Result: +97.8% Net Hourly Earnings Increase & 45.3% Time Saved!",

    whyBadge: "SDG 11 • Sustainable Cities & Communities",
    whyMainTitle: "Lamma Platform: Economic & Technical Solution for Egypt",
    whyMainSubtitle: "Integrating the informal Zabbaleen sector with 0% platform fees, doubling hourly income by aggregating micro-requests (3-10 kg) into high-density routes.",
    unitEconTitle: "Updated Unit Economics",
    unitEconDesc: "Buying at EGP 2.50/kg and reselling at EGP 8.00/kg yields strong margins when aggregating 40+ kg rounds.",
    dignityTitle: "Informal Sector Integration",
    dignityDesc: "Respect existing territory networks and provide a digital tool for faster, dignified work.",
    environmentTitle: "Urban Environmental Impact",
    environmentDesc: "Eliminate flammable cardboard accumulation on commercial storefronts.",
    
    advantagesTitle: "Lamma Platform Core Advantages",
    adv1Title: "Commercial Corridor Micro-Aggregation",
    adv1Desc: "Batches small dispersed shop requests (3-10 kg) into high-density single rounds using CVRPTW algorithms.",
    adv2Title: "0% Commission for Collectors",
    adv2Desc: "Zero platform fees for informal collectors (Zabbaleen), ensuring 100% retention of daily earnings.",
    adv3Title: "Interactive Mapping & Direct GPS",
    adv3Desc: "Real-time routing via OpenStreetMap with direct Google Maps navigation launchers for each stop.",

    timeWin1: "Today 12:00 PM - 3:00 PM",
    timeWin2: "Today 3:00 PM - 6:00 PM",
    timeWin3: "Today 6:00 PM - 9:00 PM",
    timeWin4: "Tomorrow Morning 9:00 AM - 12:00 PM",
    timeWin5: "Tomorrow Evening 4:00 PM - 8:00 PM",
    
    payoutEst: "Cash Paid to Shop (EGP 2.50/kg):",
    customCoordsSet: "Coordinates pinned successfully!",
    launchFullRoute: "🚀 Launch Full Google Maps Route",
    openInGmaps: "Google Maps",
    clickMapPrompt: "💡 Click map to pinpoint shop location",
    alleySpot: "New Spot"
  }
};

const INITIAL_STORES = {
  ar: [
    { id: 'store-1', name: 'سوبرماركت المدينة', street: 'شارع عباس العقاد، مدينة نصر، القاهرة', lat: 30.0562, lng: 31.3412, weight: 12, timeWindow: 'اليوم 12:00 ظهراً - 3:00 عصراً', status: 'pending', code: 'LMA-NC1' },
    { id: 'store-2', name: 'محل الفاكهاني', street: 'شارع عباس العقاد، مدينة نصر، القاهرة', lat: 30.0581, lng: 31.3458, weight: 15, timeWindow: 'اليوم 3:00 عصراً - 6:00 مساءً', status: 'pending', code: 'LMA-NC2' },
    { id: 'store-3', name: 'مكتبة عباس', street: 'شارع عباس العقاد، مدينة نصر، القاهرة', lat: 30.0545, lng: 31.3385, weight: 8, timeWindow: 'اليوم 6:00 مساءً - 9:00 مساءً', status: 'pending', code: 'LMA-NC3' },
    { id: 'store-4', name: 'خردوات النصر', street: 'تقاطع مصطفى النحاس، مدينة نصر', lat: 30.0595, lng: 31.3480, weight: 6, timeWindow: 'غداً صباحاً 9:00 صباحاً - 12:00 ظهراً', status: 'pending', code: 'LMA-NC4' }
  ],
  en: [
    { id: 'store-1', name: 'El-Medina Supermarket', street: 'Abbas El-Akkad St, Nasr City, Cairo', lat: 30.0562, lng: 31.3412, weight: 12, timeWindow: 'Today 12:00 PM - 3:00 PM', status: 'pending', code: 'LMA-NC1' },
    { id: 'store-2', name: 'El-Fakahany Fruit Shop', street: 'Abbas El-Akkad St, Nasr City, Cairo', lat: 30.0581, lng: 31.3458, weight: 15, timeWindow: 'Today 3:00 PM - 6:00 PM', status: 'pending', code: 'LMA-NC2' },
    { id: 'store-3', name: 'Abbas Library', street: 'Abbas El-Akkad St, Nasr City, Cairo', lat: 30.0545, lng: 31.3385, weight: 8, timeWindow: 'Today 6:00 PM - 9:00 PM', status: 'pending', code: 'LMA-NC3' },
    { id: 'store-4', name: 'El-Nasr Hardware', street: 'Mustafa El-Nahas Intersection, Nasr City', lat: 30.0595, lng: 31.3480, weight: 6, timeWindow: 'Tomorrow Morning 9:00 AM - 12:00 PM', status: 'pending', code: 'LMA-NC4' }
  ]
};

const LeafletMapVisualizer = ({ stores, selectedStoreId, onStoreSelect, onMapClick, pendingCustomPin, isDark, t }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersGroupRef = useRef(null);
  const routePolylineRef = useRef(null);
  const [isLeafletReady, setIsLeafletReady] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (window.L) {
      setIsLeafletReady(true);
      return;
    }
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
    if (!document.getElementById('leaflet-js')) {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => setIsLeafletReady(true);
      script.onerror = () => setMapError(true);
      document.head.appendChild(script);
    } else {
      document.getElementById('leaflet-js').addEventListener('load', () => setIsLeafletReady(true));
    }
  }, []);

  useEffect(() => {
    if (!isLeafletReady || !mapContainerRef.current || mapInstanceRef.current || mapError) return;
    try {
      const L = window.L;
      if (!L) return;
      const map = L.map(mapContainerRef.current, {
        center: [30.0562, 31.3412],
        zoom: 14,
        zoomControl: true,
        attributionControl: false
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
      map.on('click', (e) => {
        if (onMapClick) onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
      });
      markersGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
      setTimeout(() => map.invalidateSize(), 250);
    } catch (err) {
      setMapError(true);
    }
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isLeafletReady, mapError, onMapClick]);

  useEffect(() => {
    if (!mapInstanceRef.current || !isLeafletReady || mapError) return;
    try {
      const L = window.L;
      const map = mapInstanceRef.current;
      const markersGroup = markersGroupRef.current;
      if (!markersGroup) return;
      markersGroup.clearLayers();
      if (routePolylineRef.current) {
        map.removeLayer(routePolylineRef.current);
        routePolylineRef.current = null;
      }
      const activeStores = stores.filter(s => s.status !== 'collected');
      const routeCoordinates = [];
      activeStores.forEach((store, idx) => {
        const isSelected = store.id === selectedStoreId;
        routeCoordinates.push([store.lat, store.lng]);
        const markerHtml = `
          <div style="background:${isSelected ? '#f59e0b' : '#10b981'};color:white;padding:4px 8px;border-radius:12px;font-weight:900;font-size:11px;box-shadow:0 4px 10px rgba(0,0,0,0.4);border:2px solid ${isDark ? '#090d16' : '#ffffff'};text-align:center;white-space:nowrap;cursor:pointer;">
            #${idx + 1} 📦 ${store.weight} ${t.kg}
          </div>
        `;
        const customIcon = L.divIcon({ className: 'custom-osm-marker', html: markerHtml, iconSize: [72, 28], iconAnchor: [36, 14] });
        const marker = L.marker([store.lat, store.lng], { icon: customIcon }).addTo(markersGroup);
        marker.on('click', () => { if (onStoreSelect) onStoreSelect(store); });
      });
      if (pendingCustomPin) {
        const customPinHtml = `
          <div style="background:#f43f5e;color:white;padding:4px 10px;border-radius:12px;font-weight:900;font-size:11px;box-shadow:0 0 0 4px rgba(244,63,94,0.3);border:2px solid ${isDark ? '#090d16' : '#ffffff'};text-align:center;white-space:nowrap;">
            📍 ${t.alleySpot}
          </div>
        `;
        const tempIcon = L.divIcon({ className: 'temp-custom-pin', html: customPinHtml, iconSize: [80, 28], iconAnchor: [40, 14] });
        L.marker([pendingCustomPin.lat, pendingCustomPin.lng], { icon: tempIcon }).addTo(markersGroup);
        map.flyTo([pendingCustomPin.lat, pendingCustomPin.lng], 15, { animate: true });
      }
      if (routeCoordinates.length > 1) {
        routePolylineRef.current = L.polyline(routeCoordinates, {
          color: '#10b981',
          weight: 5,
          dashArray: '6, 8',
          opacity: 0.95
        }).addTo(map);
        map.fitBounds(L.latLngBounds(routeCoordinates), { padding: [40, 40] });
      }
    } catch (err) {
      console.warn("Marker update error:", err);
    }
  }, [stores, selectedStoreId, pendingCustomPin, isLeafletReady, mapError, t, onStoreSelect, isDark]);

  if (mapError) {
    return (
      <div className={`w-full h-full min-h-[360px] rounded-3xl ${isDark ? 'bg-slate-900 border-emerald-500/30 text-slate-200' : 'bg-slate-900 border-emerald-500/50 text-white'} border-2 flex items-center justify-center text-xs font-bold p-4 text-center shadow-inner`}>
        <span>{t.mapHeader}</span>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full min-h-[360px] rounded-3xl overflow-hidden border-2 transition-all shadow-inner ${isDark ? 'border-emerald-500/30 shadow-emerald-950/40 bg-slate-900' : 'border-emerald-500/50 shadow-emerald-950/20 bg-slate-900'}`}>
      <div className={`absolute top-3 right-3 z-[1000] ${isDark ? 'bg-slate-950/95 text-emerald-300 border-emerald-500/30' : 'bg-slate-950/90 text-white border-emerald-500/40'} px-3.5 py-1.5 rounded-2xl text-xs font-black flex items-center gap-2 shadow-2xl backdrop-blur-md`}>
        <MapIcon className="w-4 h-4 text-emerald-400" />
        <span>OpenStreetMap • {t.mapHeader}</span>
      </div>
      <div className={`absolute bottom-3 left-3 z-[1000] ${isDark ? 'bg-slate-950/95 text-slate-300 border-slate-800' : 'bg-slate-950/90 text-slate-300 border-slate-800'} px-3 py-1 rounded-xl text-[10px] font-bold border pointer-events-none`}>
        {t.clickMapPrompt}
      </div>
      <div ref={mapContainerRef} className="w-full h-full min-h-[360px] bg-slate-950 cursor-crosshair" />
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState('ar');
  const [activeTab, setActiveTab] = useState('zabaleen');
  const [stores, setStores] = useState(INITIAL_STORES.ar);
  const [maxPayloadCapacity, setMaxPayloadCapacity] = useState(60);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('all');
  const [selectedStore, setSelectedStore] = useState(INITIAL_STORES.ar[0]);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [successBanner, setSuccessBanner] = useState('');
  
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ar;

  useEffect(() => {
    const currentStores = INITIAL_STORES[lang] || INITIAL_STORES.ar;
    setStores(currentStores);
    setSelectedStore(currentStores[0]);
    setSelectedTimeFilter('all');
  }, [lang]);

  const [newStoreName, setNewStoreName] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newWeight, setNewWeight] = useState(15);
  const [newTimeWindow, setNewTimeWindow] = useState(t.timeWin1);
  const [customCoordinates, setCustomCoordinates] = useState(null);

  useEffect(() => {
    setNewTimeWindow(t.timeWin1);
  }, [lang, t]);

  const filteredStoresByTime = useMemo(() => {
    if (selectedTimeFilter === 'all') return stores;
    return stores.filter(s => s.timeWindow === selectedTimeFilter);
  }, [stores, selectedTimeFilter]);

  const eligibleStores = useMemo(() => {
    let currentWeight = 0;
    const valid = [];
    for (const store of filteredStoresByTime) {
      if (store.status === 'collected') continue;
      if (currentWeight + store.weight <= maxPayloadCapacity) {
        valid.push(store);
        currentWeight += store.weight;
      }
    }
    return valid;
  }, [filteredStoresByTime, maxPayloadCapacity]);

  const totalEligibleWeight = useMemo(() => eligibleStores.reduce((acc, curr) => acc + curr.weight, 0), [eligibleStores]);
  
  const estimatedDistanceKm = useMemo(() => eligibleStores.length * 0.8 + 2.2, [eligibleStores]);
  const estimatedFuelCost = useMemo(() => estimatedDistanceKm * FUEL_COST_PER_KM, [estimatedDistanceKm]);
  const estimatedWearCost = useMemo(() => estimatedDistanceKm * VEHICLE_WEAR_PER_KM, [estimatedDistanceKm]);
  const grossDealerResale = useMemo(() => totalEligibleWeight * DEALER_RESALE_PRICE_PER_KG, [totalEligibleWeight]);
  const cashPaidToShops = useMemo(() => totalEligibleWeight * SHOP_BUY_PRICE_PER_KG, [totalEligibleWeight]);
  
  const collectorNetProfit = useMemo(() => {
    return grossDealerResale - cashPaidToShops - estimatedFuelCost - estimatedWearCost;
  }, [grossDealerResale, cashPaidToShops, estimatedFuelCost, estimatedWearCost]);

  const estimatedWorkingHours = useMemo(() => (estimatedDistanceKm / 15) + (eligibleStores.length * 0.1), [estimatedDistanceKm, eligibleStores]);
  const collectorHourlyNet = useMemo(() => collectorNetProfit / Math.max(0.5, estimatedWorkingHours), [collectorNetProfit, estimatedWorkingHours]);

  const openGoogleMapsSingle = (store) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${store.lat},${store.lng}`, '_blank');
  };

  const openGoogleMapsFullRoute = () => {
    if (eligibleStores.length === 0) return;
    const origin = `${eligibleStores[0].lat},${eligibleStores[0].lng}`;
    const destination = `${eligibleStores[eligibleStores.length - 1].lat},${eligibleStores[eligibleStores.length - 1].lng}`;
    const waypoints = eligibleStores.slice(1, -1).map(s => `${s.lat},${s.lng}`).join('|');
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}`, '_blank');
  };

  const handleCollectStore = (id) => {
    setStores(prev => prev.map(s => s.id === id ? { ...s, status: 'collected' } : s));
  };

  const handleGeocodeSearch = async () => {
    if (!newStreet.trim()) return;
    setIsGeocoding(true);
    try {
      const searchQuery = encodeURIComponent(`${newStreet}, Cairo, Egypt`);
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}&countrycodes=eg&viewbox=31.1,30.2,31.6,29.9&bounded=1`);
      const data = await res.json();
      if (data && data.length > 0) {
        setCustomCoordinates({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
      } else {
        setCustomCoordinates({ lat: 30.0562, lng: 31.3412 });
      }
    } catch (err) {
      setCustomCoordinates({ lat: 30.0562, lng: 31.3412 });
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleAddStoreRequest = (e) => {
    e.preventDefault();
    if (!newStoreName.trim()) return;
    const newEntry = {
      id: `store-${Date.now()}`,
      name: newStoreName,
      street: newStreet || (lang === 'ar' ? 'محل بالشارع التجاري' : 'Commercial Corridor Shop'),
      lat: customCoordinates?.lat || 30.0562,
      lng: customCoordinates?.lng || 31.3412,
      weight: Number(newWeight),
      timeWindow: newTimeWindow,
      status: 'pending',
      code: `LMA-${Math.floor(100 + Math.random() * 900)}`
    };
    setStores([newEntry, ...stores]);
    setNewStoreName('');
    setNewStreet('');
    setCustomCoordinates(null);
    setSuccessBanner(lang === 'ar' ? 'تم إضافة نقطة الاستلام بنجاح وتحديد وقتها!' : 'Pickup point and time added successfully!');
    setTimeout(() => setSuccessBanner(''), 4000);
    setActiveTab('zabaleen');
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#090d16] text-slate-100 selection:bg-emerald-500 selection:text-black' : 'bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white'} font-sans antialiased`}>
      
      {successBanner && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl font-black text-sm flex items-center gap-2 border-2 border-white/20 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-amber-300" />
          <span>{successBanner}</span>
        </div>
      )}

      <div className={`text-xs py-2 px-4 border-b transition-colors ${isDark ? 'bg-[#0f172a] border-slate-800 text-slate-300' : 'bg-slate-900 text-white border-slate-800'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <span className="px-2.5 py-1 rounded-xl font-bold flex items-center gap-1.5 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.onlineMode}</span>
          </span>
          <button onClick={() => setIsDark(!isDark)} className={`px-2.5 py-1 rounded-xl font-bold flex items-center gap-1.5 transition-all border ${isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20' : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'}`}>
            {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
            <span>{isDark ? "Light" : "Dark"}</span>
          </button>
        </div>
      </div>

      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors ${isDark ? 'bg-[#090d16]/90 border-slate-800/80 shadow-2xl shadow-black/50' : 'bg-white/95 border-emerald-100 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-sky-500 flex items-center justify-center shadow-lg shadow-emerald-600/30">
              <Recycle className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div>
              <span className={`font-black text-xl tracking-tight ${isDark ? 'text-white' : 'text-emerald-800'}`}>{t.appName}</span>
              <span className="block text-[10px] text-emerald-500 font-extrabold -mt-1">{t.appTagline}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <nav className={`flex items-center gap-1.5 p-1.5 rounded-2xl border ${isDark ? 'bg-[#111827] border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
              <button onClick={() => setActiveTab('zabaleen')} className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'zabaleen' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/40' : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}`}>
                <Truck className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">{t.tabZabaleen}</span>
              </button>
              <button onClick={() => setActiveTab('shopkeeper')} className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'shopkeeper' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/40' : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}`}>
                <PlusCircle className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="whitespace-nowrap">{t.tabShopkeeper}</span>
              </button>
              <button onClick={() => setActiveTab('comparison')} className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'comparison' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/40' : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}`}>
                <BarChart3 className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">{t.tabComparison}</span>
              </button>
              <button onClick={() => setActiveTab('why')} className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'why' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/40' : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}`}>
                <Info className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">{t.tabWhy}</span>
              </button>
            </nav>

            <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className={`flex items-center gap-1 px-3.5 py-2 rounded-2xl border text-xs font-black transition-all shadow-sm active:scale-95 ${isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20' : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'}`}>
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'zabaleen' && (
          <div className="space-y-6">
            <div className={`border rounded-3xl p-5 shadow-2xl relative transition-colors ${isDark ? 'bg-[#111827] border-slate-800/80 shadow-black/60' : 'bg-white border-emerald-100'}`}>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className={`text-lg font-black flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <Navigation className="w-5 h-5 text-emerald-500 animate-bounce" />
                    {t.routeTitle}
                  </h2>
                  <p className={`text-xs mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.routeSubtitle}</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-2xl border ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-amber-50/80 border-amber-200'}`}>
                    <Filter className="w-4 h-4 text-amber-500" />
                    <span className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-amber-900'}`}>{t.filterTimeLabel}</span>
                    <select
                      value={selectedTimeFilter}
                      onChange={(e) => setSelectedTimeFilter(e.target.value)}
                      className={`text-xs font-black rounded-xl px-2.5 py-1.5 focus:outline-none transition-colors border ${isDark ? 'bg-[#111827] border-slate-700 text-emerald-300' : 'bg-white border-amber-300 text-amber-900'}`}
                    >
                      <option value="all">🌟 {t.allTimeWindows}</option>
                      <option value={t.timeWin1}>⏰ {t.timeWin1}</option>
                      <option value={t.timeWin2}>⏰ {t.timeWin2}</option>
                      <option value={t.timeWin3}>⏰ {t.timeWin3}</option>
                      <option value={t.timeWin4}>⏰ {t.timeWin4}</option>
                      <option value={t.timeWin5}>⏰ {t.timeWin5}</option>
                    </select>
                  </div>

                  <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl border ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-emerald-50/80 border-emerald-200'}`}>
                    <span className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-emerald-900'}`}>{t.minCapacity}</span>
                    <input type="range" min="20" max="100" value={maxPayloadCapacity} onChange={(e) => setMaxPayloadCapacity(Number(e.target.value))} className="w-24 accent-emerald-500 cursor-pointer" />
                    <span className="text-xs font-black text-emerald-400 min-w-[35px]">{maxPayloadCapacity} {t.kg}</span>
                  </div>
                </div>
              </div>

              <div className="h-[420px]">
                <LeafletMapVisualizer stores={eligibleStores} selectedStoreId={selectedStore?.id} onStoreSelect={(store) => setSelectedStore(store)} onMapClick={(coords) => setCustomCoordinates(coords)} pendingCustomPin={customCoordinates} isDark={isDark} t={t} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800/60">
                <div className={`p-3.5 rounded-2xl border text-center transition-transform hover:scale-[1.02] ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-emerald-50/80 border-emerald-100'}`}>
                  <span className={`block text-[10px] font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-800'}`}>{t.totalCardboard}</span>
                  <span className={`text-lg font-black ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>{totalEligibleWeight} {t.kg}</span>
                </div>
                <div className={`p-3.5 rounded-2xl border text-center transition-transform hover:scale-[1.02] ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-amber-50/80 border-amber-100'}`}>
                  <span className={`block text-[10px] font-bold ${isDark ? 'text-amber-400' : 'text-amber-800'}`}>{t.expectedReturn}</span>
                  <span className={`text-lg font-black ${isDark ? 'text-amber-300' : 'text-amber-600'}`}>+{collectorNetProfit.toFixed(0)} {t.egp}</span>
                </div>
                <div className={`p-3.5 rounded-2xl border text-center transition-transform hover:scale-[1.02] ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-teal-50/80 border-teal-100'}`}>
                  <span className={`block text-[10px] font-bold ${isDark ? 'text-teal-400' : 'text-teal-800'}`}>{t.hourlyRate}</span>
                  <span className={`text-lg font-black ${isDark ? 'text-teal-300' : 'text-teal-700'}`}>{collectorHourlyNet.toFixed(0)} {t.egp}/h</span>
                </div>
                <div className={`p-3.5 rounded-2xl border text-center transition-transform hover:scale-[1.02] ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-sky-50/80 border-sky-100'}`}>
                  <span className={`block text-[10px] font-bold ${isDark ? 'text-sky-400' : 'text-sky-800'}`}>{t.fuelSaved}</span>
                  <span className={`text-lg font-black ${isDark ? 'text-sky-300' : 'text-sky-600'}`}>{estimatedFuelCost.toFixed(2)} {t.egp}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 p-4 rounded-3xl text-white shadow-xl shadow-emerald-950/40 flex items-center justify-between">
              <div>
                <h4 className="font-black text-sm flex items-center gap-2">
                  <Navigation2 className="w-5 h-5 text-amber-300 animate-pulse" />
                  <span>{t.launchFullRoute}</span>
                </h4>
                <p className="text-xs text-emerald-100 font-medium mt-0.5">{eligibleStores.map(s => s.name.split(' ')[0]).join(' ➔ ')}</p>
              </div>
              <button onClick={openGoogleMapsFullRoute} className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg transition-all active:scale-95 flex items-center gap-1.5">
                <ExternalLink className="w-4 h-4 text-slate-950" />
                <span>{t.openInGmaps}</span>
              </button>
            </div>

            <div className={`border rounded-3xl p-5 shadow-2xl transition-colors ${isDark ? 'bg-[#111827] border-slate-800/80 shadow-black/60' : 'bg-white border-slate-200'}`}>
              <h3 className={`text-md font-bold mb-4 flex items-center justify-between ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span className="flex items-center gap-2">
                  <Layers className="w-4.5 h-4.5 text-emerald-500" />
                  {t.routeStops} ({eligibleStores.length} {t.shops})
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'text-emerald-700 bg-emerald-100 border-emerald-200'}`}>{t.qualifiedCapacity}</span>
              </h3>

              <div className="space-y-3">
                {eligibleStores.map((store, index) => (
                  <div key={store.id} onClick={() => setSelectedStore(store)} className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${selectedStore?.id === store.id ? isDark ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-950/50' : 'bg-emerald-50 border-emerald-500 shadow-md' : isDark ? 'bg-[#0f172a] border-slate-800/80 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-md">{index + 1}</div>
                      <div>
                        <div className={`font-extrabold text-sm flex items-center gap-2 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                          <span>{store.name}</span>
                          <button type="button" onClick={(e) => { e.stopPropagation(); openGoogleMapsSingle(store); }} className={`px-2 py-0.5 rounded-lg font-bold text-[10px] flex items-center gap-1 border ${isDark ? 'bg-sky-500/10 border-sky-500/30 text-sky-300' : 'bg-sky-100 border-sky-300 text-sky-800'}`}>
                            <ExternalLink className="w-3 h-3 text-sky-400" />
                            <span>{t.openInGmaps}</span>
                          </button>
                        </div>
                        <div className={`text-xs flex flex-wrap items-center gap-2 mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-500" />{store.street}</span>
                          <span>•</span>
                          <span className={`flex items-center gap-1 font-bold px-2 py-0.5 rounded-lg border ${isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'text-amber-700 bg-amber-50 border-amber-200'}`}>
                            <Clock className="w-3.5 h-3.5 text-amber-500" />
                            {store.timeWindow}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-base font-black text-emerald-400 block">{store.weight} {t.kg}</span>
                        <span className={`text-[11px] font-extrabold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Payout: {store.weight * SHOP_BUY_PRICE_PER_KG} {t.egp}</span>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); handleCollectStore(store.id); }} className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-1 shadow-md active:scale-95 min-h-[44px]">
                        <Check className="w-4 h-4" />
                        <span>{t.collected}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shopkeeper' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className={`border rounded-3xl p-7 shadow-2xl transition-colors ${isDark ? 'bg-[#111827] border-slate-800/80 shadow-black/60' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-sm"><ShoppingBag className="w-6 h-6" /></div>
                <div>
                  <h2 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.shopFormTitle}</h2>
                  <p className={`text-xs mt-0.5 font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.shopFormSubtitle}</p>
                </div>
              </div>

              <form onSubmit={handleAddStoreRequest} className="space-y-6">
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t.shopNameLabel}</label>
                  <input type="text" required value={newStoreName} onChange={(e) => setNewStoreName(e.target.value)} placeholder={t.shopNamePlaceholder} className={`w-full border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors ${isDark ? 'bg-[#0f172a] border-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{t.areaLabel}</label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input type="text" required value={newStreet} onChange={(e) => setNewStreet(e.target.value)} placeholder={lang === 'ar' ? 'شارع عباس العقاد، مدينة نصر، القاهرة...' : 'Abbas El-Akkad St, Nasr City, Cairo...'} className={`w-full border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors ${isDark ? 'bg-[#0f172a] border-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />
                      <MapPin className="w-4 h-4 text-slate-500 absolute ltr:left-3 rtl:right-3 top-3.5" />
                    </div>
                    <button type="button" onClick={handleGeocodeSearch} disabled={isGeocoding} className={`px-4 py-3 rounded-2xl border font-bold text-xs flex items-center gap-1.5 whitespace-nowrap min-h-[48px] transition-all ${isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20' : 'bg-emerald-100 border-emerald-200 text-emerald-800 hover:bg-emerald-200'}`}>
                      <Search className="w-4 h-4 text-emerald-400" />
                      <span>{isGeocoding ? "..." : t.searchPlaceBtn}</span>
                    </button>
                  </div>
                </div>

                <div className="h-[260px]">
                  <LeafletMapVisualizer stores={eligibleStores} onMapClick={(coords) => setCustomCoordinates(coords)} pendingCustomPin={customCoordinates} isDark={isDark} t={t} />
                </div>

                <div className={`border p-4 rounded-2xl space-y-3 ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-emerald-50/60 border-emerald-200'}`}>
                  <div className="flex items-center justify-between">
                    <label className={`text-xs font-black flex items-center gap-2 ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                      <Scale className="w-4 h-4 text-emerald-500" />
                      <span>{t.weightLabel}</span>
                    </label>
                    <span className={`text-base font-black px-3 py-1 rounded-xl border shadow-sm ${isDark ? 'bg-[#111827] border-slate-700 text-emerald-400' : 'bg-white border-emerald-200 text-emerald-700'}`}>{newWeight} {t.kg}</span>
                  </div>
                  <input type="range" min="1" max="100" value={newWeight} onChange={(e) => setNewWeight(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg cursor-pointer accent-emerald-500" />
                  <div className="flex items-center gap-2 pt-1">
                    <span className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{lang === 'ar' ? 'أوزان سريعة:' : 'Quick Weights:'}</span>
                    {[5, 10, 20, 35, 50].map((wVal) => (
                      <button
                        key={wVal}
                        type="button"
                        onClick={() => setNewWeight(wVal)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all border ${newWeight === wVal ? 'bg-emerald-600 text-white border-emerald-500 shadow-md' : isDark ? 'bg-[#111827] border-slate-700 text-slate-300 hover:bg-slate-800' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}`}
                      >
                        {wVal} {t.kg}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`border p-4 rounded-2xl space-y-2 ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-amber-50/60 border-amber-200'}`}>
                  <label className={`text-xs font-black flex items-center gap-2 ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>{t.pickupTimeLabel}</span>
                  </label>
                  <select
                    value={newTimeWindow}
                    onChange={(e) => setNewTimeWindow(e.target.value)}
                    className={`w-full border rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-emerald-500 transition-colors ${isDark ? 'bg-[#111827] border-slate-700 text-white' : 'bg-white border-amber-200 text-slate-900'}`}
                  >
                    <option value={t.timeWin1}>⏰ {t.timeWin1}</option>
                    <option value={t.timeWin2}>⏰ {t.timeWin2}</option>
                    <option value={t.timeWin3}>⏰ {t.timeWin3}</option>
                    <option value={t.timeWin4}>⏰ {t.timeWin4}</option>
                    <option value={t.timeWin5}>🌅 {t.timeWin5}</option>
                  </select>
                </div>

                <button type="submit" className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-xl shadow-emerald-950/50 transition-all min-h-[50px]">{t.submitRequest}</button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className={`border rounded-3xl p-7 shadow-2xl text-center transition-colors ${isDark ? 'bg-[#111827] border-slate-800/80 shadow-black/60' : 'bg-white border-emerald-200'}`}>
              <span className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border ${isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-emerald-100 text-emerald-800 border-emerald-200'}`}>{t.beforeAfterTitle}</span>
              <h2 className={`text-xl font-black mt-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.beforeAfterSubtitle}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`border rounded-3xl p-6 shadow-sm space-y-4 transition-colors ${isDark ? 'bg-rose-950/20 border-rose-900/40' : 'bg-rose-50/60 border-rose-200'}`}>
                <div className="flex items-center gap-2 pb-3 border-b border-rose-900/40">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <h3 className={`font-black text-base ${isDark ? 'text-rose-300' : 'text-rose-950'}`}>{t.baselineHeader}</h3>
                </div>
                <div className="space-y-3 text-xs font-semibold">
                  <div className={`flex justify-between p-2.5 rounded-xl border ${isDark ? 'bg-[#0f172a] border-rose-950/50 text-slate-300' : 'bg-white border-rose-100 text-slate-600'}`}><span>{t.metricDist}</span><span className="font-black text-rose-400">16.2 km</span></div>
                  <div className={`flex justify-between p-2.5 rounded-xl border ${isDark ? 'bg-[#0f172a] border-rose-950/50 text-slate-300' : 'bg-white border-rose-100 text-slate-600'}`}><span>{t.metricTime}</span><span className="font-black text-rose-400">1.83 hours</span></div>
                  <div className={`flex justify-between p-2.5 rounded-xl border ${isDark ? 'bg-[#0f172a] border-rose-950/50 text-slate-300' : 'bg-white border-rose-100 text-slate-600'}`}><span>{t.metricFuel}</span><span className="font-black text-rose-400">EGP 13.45</span></div>
                  <div className={`flex justify-between p-2.5 rounded-xl border ${isDark ? 'bg-[#0f172a] border-rose-950/50 text-slate-300' : 'bg-white border-rose-100 text-slate-600'}`}><span>{t.metricNet}</span><span className="font-black text-rose-400">EGP 203.95</span></div>
                  <div className={`flex justify-between p-3 rounded-xl border text-sm font-black ${isDark ? 'bg-rose-950/40 border-rose-800/60 text-rose-200' : 'bg-rose-100 border-rose-200 text-rose-900'}`}><span>{t.metricHourly}</span><span>EGP 111.45/h</span></div>
                </div>
              </div>

              <div className={`border rounded-3xl p-6 shadow-md space-y-4 transition-colors ${isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50/60 border-emerald-300'}`}>
                <div className="flex items-center gap-2 pb-3 border-b border-emerald-500/30">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className={`font-black text-base ${isDark ? 'text-emerald-300' : 'text-emerald-950'}`}>{t.optimizedHeader}</h3>
                </div>
                <div className="space-y-3 text-xs font-semibold">
                  <div className={`flex justify-between p-2.5 rounded-xl border ${isDark ? 'bg-[#0f172a] border-emerald-950/50 text-slate-300' : 'bg-white border-emerald-100 text-slate-600'}`}><span>{t.metricDist}</span><span className="font-black text-emerald-400">3.8 km (-76.5%)</span></div>
                  <div className={`flex justify-between p-2.5 rounded-xl border ${isDark ? 'bg-[#0f172a] border-emerald-950/50 text-slate-300' : 'bg-white border-emerald-100 text-slate-600'}`}><span>{t.metricTime}</span><span className="font-black text-emerald-400">1.00 hour (-45.3%)</span></div>
                  <div className={`flex justify-between p-2.5 rounded-xl border ${isDark ? 'bg-[#0f172a] border-emerald-950/50 text-slate-300' : 'bg-white border-emerald-100 text-slate-600'}`}><span>{t.metricFuel}</span><span className="font-black text-emerald-400">EGP 3.15 (-EGP 10.30)</span></div>
                  <div className={`flex justify-between p-2.5 rounded-xl border ${isDark ? 'bg-[#0f172a] border-emerald-950/50 text-slate-300' : 'bg-white border-emerald-100 text-slate-600'}`}><span>{t.metricNet}</span><span className="font-black text-emerald-400">EGP 220.45 (+EGP 16.50)</span></div>
                  <div className="flex justify-between p-3 bg-emerald-600 rounded-xl border border-emerald-500 text-sm font-black text-white shadow-xl shadow-emerald-950/60"><span>{t.metricHourly}</span><span>EGP 220.45/h (+97.8%)</span></div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border text-center font-black text-sm shadow-sm ${isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-300 text-amber-900'}`}>{t.netGainBanner}</div>
          </div>
        )}

        {activeTab === 'why' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className={`border rounded-3xl p-7 shadow-2xl text-center transition-colors ${isDark ? 'bg-[#111827] border-slate-800/80 shadow-black/60' : 'bg-white border-emerald-100'}`}>
              <span className={`text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full border ${isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'text-emerald-800 bg-emerald-100 border-emerald-200'}`}>{t.whyBadge}</span>
              <h1 className={`text-2xl font-black mt-4 mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.whyMainTitle}</h1>
              <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.whyMainSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className={`border p-5 rounded-3xl transition-colors ${isDark ? 'bg-[#111827] border-amber-500/20' : 'bg-amber-50 border-amber-200'}`}>
                <div className="w-11 h-11 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mb-3 font-bold shadow-lg shadow-amber-500/20"><DollarSign className="w-6 h-6" /></div>
                <h3 className={`font-black text-sm mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.unitEconTitle}</h3>
                <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.unitEconDesc}</p>
              </div>
              <div className={`border p-5 rounded-3xl transition-colors ${isDark ? 'bg-[#111827] border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
                <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-3 font-bold shadow-lg shadow-emerald-600/20"><Heart className="w-6 h-6" /></div>
                <h3 className={`font-black text-sm mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.dignityTitle}</h3>
                <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.dignityDesc}</p>
              </div>
              <div className={`border p-5 rounded-3xl transition-colors ${isDark ? 'bg-[#111827] border-sky-500/20' : 'bg-sky-50 border-sky-200'}`}>
                <div className="w-11 h-11 rounded-2xl bg-sky-600 text-white flex items-center justify-center mb-3 font-bold shadow-lg shadow-sky-600/20"><ShieldCheck className="w-6 h-6" /></div>
                <h3 className={`font-black text-sm mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.environmentTitle}</h3>
                <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.environmentDesc}</p>
              </div>
            </div>

            <div className={`border rounded-3xl p-6 shadow-2xl transition-colors ${isDark ? 'bg-[#111827] border-slate-800/80 shadow-black/60' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center gap-2.5 mb-5">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className={`font-black text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.advantagesTitle}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2.5 font-bold"><Zap className="w-5 h-5" /></div>
                  <h4 className={`font-black text-xs mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.adv1Title}</h4>
                  <p className={`text-[11px] font-medium leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.adv1Desc}</p>
                </div>
                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2.5 font-bold"><Shield className="w-5 h-5" /></div>
                  <h4 className={`font-black text-xs mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.adv2Title}</h4>
                  <p className={`text-[11px] font-medium leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.adv2Desc}</p>
                </div>
                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-2.5 font-bold"><TrendingUp className="w-5 h-5" /></div>
                  <h4 className={`font-black text-xs mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.adv3Title}</h4>
                  <p className={`text-[11px] font-medium leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.adv3Desc}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
