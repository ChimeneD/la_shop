/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

// module.exports = nextConfig
module.exports = {
  //reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"]
  },
  env: {
    MONGODB_URI:
      "mongodb+srv://ShopAdmin:zdcoMxwUjf2Zrpva@test.oxk7vm9.mongodb.net/LASHOP?retryWrites=true&w=majority",
    BACKEND_URI: "https://la-shop.onrender.com/api",
    // BACKEND_URI: "http://localhost:5000/api",
    CLOUDINARY_UPLOAD:
      "https://api.cloudinary.com/v1_1/danny-cloud/image/upload"
  }
};
