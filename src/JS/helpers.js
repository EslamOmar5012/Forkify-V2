import { TIMEOUT_SEC } from "./config.js";

export const timeOut = (s) => {
  return new Promise((_, reject) => {
    setTimeout(function () {
      reject(new Error(`Respone took too long (${s} seconds)`));
    }, s * 1000);
  });
};

export const AJAX = async (query, uploadedData = undefined) => {
  try {
    const fetchPro = fetch(query, {
      method: uploadedData ? "POST" : "GET",
      headers: uploadedData
        ? { "Content-Type": "application/json" }
        : undefined,
      body: uploadedData ? JSON.stringify(uploadedData) : undefined,
    });

    const res = await Promise.race([fetchPro, timeOut(TIMEOUT_SEC)]);

    if (!res.ok)
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);

    const data = await res.json();
    return data;
  } catch (err) {
    throw err; // Rethrow the error for higher-level handling
  }
};
