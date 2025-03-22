async function getAuthToken() {
    try {
      const response = await fetch('http://20.244.56.144/test/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: "AFFORD MEDICAL TECHNOLOGIES PVT. LTD.",
          clientID: "1456eaa5-244b-4aa3-ba8a-b9b9a4117817", 
          clientSecret: "mfEXOCCXHplTFSlM",
          ownerName: "Raghav Arora",
          rollNo: "220C2030060",
          ownerEmail: "raghav.arora.22cse@bmu.edu.in"
        })
      });
  
      const data = await response.json();
  
      // Display the obtained auth token
      console.log('Auth Token response:', data);
    } catch (error) {
      console.error('Error fetching auth token:', error);
    }
  }
  
  getAuthToken();
  