import fetch from 'node-fetch'; // Use `import` instead of `require`

async function getAuthKey() {
  try {
    const response = await fetch('http://20.244.56.144/test/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyName: "AFFORD MEDICAL TECHNOLOGIES PVT. LTD.",
        ownerName: "Raghav Arora",
        rollNo: "220C2030060",
        ownerEmail: "raghav.arora.22cse@bmu.edu.in",
        accessCode: "PRoJlR"
      })
    });

    const data = await response.json();
    console.log('Auth response:', data);
  } catch (error) {
    console.error('Error fetching auth key:', error);
  }
}

getAuthKey();
