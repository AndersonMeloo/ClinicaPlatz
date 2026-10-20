import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // A página de pedido de consulta mudou de /agendamento para /consulta.
  async redirects() {
    return [{ source: "/agendamento", destination: "/consulta", permanent: true }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
