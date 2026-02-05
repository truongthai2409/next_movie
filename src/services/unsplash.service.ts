// // import { BASEURL } from './../utils/index';
// import { API_UNSPLASH_CONFIG } from "@/config/api/api.config";

// class UnsplashService {
//   private readonly BASEURL  = 11;
//   private buildURL(endpoint: string, params?: Record<string, any>): string {
//     const url = new URL(endpoint, API_UNSPLASH_CONFIG.baseURL);

//     // Thêm client_id mặc định
//     url.searchParams.append("client_id", API_UNSPLASH_CONFIG.accessKey);

//     // Thêm các params khác
//     if (params) {
//       Object.entries(params).forEach(([key, value]) => {
//         url.searchParams.append(key, String(value));
//       });
//     }
//     console.log(params)

//     return url.toString();
//   }
//   async getListMovie(params?: { page: number }){
//     console.log(this.BASEURL);
//   }

// }
// export default new UnsplashService();
