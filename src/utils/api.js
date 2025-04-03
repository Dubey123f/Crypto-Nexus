// import axios from "axios";

// const API_URL = "https://api.coingecko.com/api/v3/coins/markets";

// export const fetchCryptoPrices = async () => {
//   try {
//     const response = await axios.get(API_URL, {
//       params: {
//         vs_currency: "usd",
//         order: "market_cap_desc",
//         per_page: 5,
//         page: 1,
//         sparkline: true,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching crypto data:", error);
//     return [];
//   }
// };


export const fetchCryptoPrices = async (cryptoIds = "bitcoin,ethereum,dogecoin") => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=usd`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const jsonData = await response.json();

    return Object.keys(jsonData).map((key) => ({
      id: key,
      name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize name
      symbol: key.toUpperCase(),
      current_price: jsonData[key].usd,
    }));
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return [];
  }
};
