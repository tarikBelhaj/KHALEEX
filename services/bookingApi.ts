import { Hotel } from '../components/HotelCard';

// Use local API proxy routes to bypass CORS
// In Vercel development, this points to /api functions
const API_BASE_URL = '/api';

export const destinations = [
  { name: "Genève", location_key: "g188057", image: "🇨🇭" },
  { name: "Megève", location_key: "g187266", image: "⛷️" },
  { name: "Zurich", location_key: "g188113", image: "🏙️" },
  { name: "Lausanne", location_key: "g188107", image: "🌊" }
];

export interface XoteloReviewSummary {
  rating: number;
  count: number;
}

export interface XoteloPriceRange {
  minimum: number;
  maximum: number;
  currency: string;
}

export interface XoteloHotel {
  hotel_key: string;
  name: string;
  image?: string;
  accommodation_type?: string;
  review_summary?: XoteloReviewSummary;
  price_ranges?: XoteloPriceRange;
  mentions?: string[];
}

export interface XoteloRate {
  rate: number;
  tax: number;
  url: string;
  name: string; // e.g., "Booking.com", "Expedia"
  code: string;
}

// Helper to find hotel name by key (used for fallback deep linking)
const getHotelName = (key: string, hotels: XoteloHotel[]): string => {
    const hotel = hotels.find(h => h.hotel_key === key);
    return hotel ? hotel.name : "Hotel";
};

// Fetch list of hotels for a specific location via Vercel Proxy
export const fetchHotelList = async (locationKey: string): Promise<XoteloHotel[]> => {
    console.log(`Fetching hotels via Proxy for: ${locationKey}`);
    try {
        const response = await fetch(`${API_BASE_URL}/hotels?location_key=${locationKey}&limit=20&sort=best_value`);
        
        if (!response.ok) throw new Error('Proxy Request failed');
        
        const data = await response.json();
        if (data.result && data.result.list && data.result.list.length > 0) {
            return data.result.list;
        }
        return [];
    } catch (error) {
        console.warn("Proxy API Error (Hotels):", error);
        return [];
    }
};

// Fetch real-time rates for a specific hotel via Vercel Proxy
export const fetchHotelRates = async (
    hotelKey: string, 
    checkIn: string, 
    checkOut: string, 
    currency: string = 'EUR'
): Promise<XoteloRate[]> => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/rates?hotel_key=${hotelKey}&chk_in=${checkIn}&chk_out=${checkOut}&currency=${currency}`
        );

        if (!response.ok) throw new Error('Proxy Request failed');

        const data = await response.json();
        
        // If we get real rates, return them
        if (data.result && data.result.rates) {
            return data.result.rates;
        }

        // If API returns empty rates (common with CORS/Blocks), fallback to Smart Links
        // This ensures the user always has a "Book" button that works.
        // Note: We need the hotel Name here, but we don't have it passed to this function easily.
        // We will handle the fallback deep linking in the UI component if this returns empty.
        return [];

    } catch (error) {
        console.error("Proxy API Error (Rates):", error);
        return [];
    }
};

// Legacy compatibility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchHotels = async (): Promise<any[]> => { return []; };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const searchHotels = async (): Promise<any[]> => { return []; };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getHotelRates = async (): Promise<any> => { return { prices: {} }; };
