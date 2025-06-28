// Google Maps Debug Utility
// Use this in browser console to debug Google Maps issues

export const debugGoogleMaps = () => {
  console.log('=== Google Maps Debug Info ===');
  
  // Check API key
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  console.log('API Key present:', !!apiKey);
  console.log('API Key (first 10 chars):', apiKey ? apiKey.substring(0, 10) + '...' : 'Not found');
  
  // Check Google Maps API availability
  console.log('window.google exists:', !!(window as any).google);
  console.log('window.google.maps exists:', !!((window as any).google?.maps));
  
  // Check for Google Maps scripts in DOM
  const scripts = Array.from(document.querySelectorAll('script')).filter(script => 
    script.src.includes('maps.googleapis.com')
  );
  console.log('Google Maps scripts in DOM:', scripts.length);
  scripts.forEach((script, index) => {
    console.log(`Script ${index + 1}:`, script.src);
  });
  
  // Test geocoding if API is available
  if ((window as any).google?.maps?.Geocoder) {
    const geocoder = new (window as any).google.maps.Geocoder();
    geocoder.geocode({ 
      address: 'г. Астана, ул. Бейбітшілік, 33/1' 
    }, (results: any, status: any) => {
      console.log('Geocoding test status:', status);
      console.log('Geocoding test results:', results);
    });
  } else {
    console.log('Geocoder not available - API not loaded');
  }
  
  // Check for CORS errors in console
  console.log('Check browser console for CORS errors starting with "Cross-Origin Request Blocked"');
  
  console.log('=== End Debug Info ===');
};

// Make it available globally for console debugging
(window as any).debugGoogleMaps = debugGoogleMaps;
