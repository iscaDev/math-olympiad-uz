import type { NextConfig } from "next";
const backend=(process.env.BACKEND_URL||"http://127.0.0.1:4000").replace(/\/$/,"");
const config:NextConfig={trailingSlash:true,turbopack:{root:process.cwd()},experimental:{serverActions:{bodySizeLimit:'22mb'}},
  async rewrites(){return [{source:'/api/:path*/',destination:`${backend}/api/:path*`}];},
  async headers(){return [{source:'/api/:path*',headers:[{key:'Cache-Control',value:'private, no-store'}]}];}
};export default config;
