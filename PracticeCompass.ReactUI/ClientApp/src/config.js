const config = {
    baseUrl: process.env.NODE_ENV === "production" ? window.location.origin + "/PracticeCompassAPI/api" : "http://localhost:51044/api",
};
export default config;
