import type { NextConfig } from "next";
const backend=(process.env.BACKEND_URL||"http://127.0.0.1:4000").replace(/\/$/,"");
const securityHeaders=[
  {key:'X-Content-Type-Options',value:'nosniff'},
  {key:'X-Frame-Options',value:'SAMEORIGIN'},
  {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
  {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=()'},
];
const config:NextConfig={trailingSlash:true,poweredByHeader:false,turbopack:{root:process.cwd()},experimental:{serverActions:{bodySizeLimit:'22mb'}},
  async rewrites(){return [{source:'/api/:path*/',destination:`${backend}/api/:path*`}];},
  async headers(){return [
    {source:'/:path*',headers:securityHeaders},
    {source:'/api/:path*',headers:[{key:'Cache-Control',value:'private, no-store'}]},
  ];}
};export default config;
