/**
 * URL de base du backend.
 * En dev  → http://localhost:5000  (défini dans .env)
 * En prod → changer VITE_API_URL dans le .env de production
 */
export const API_URL = import.meta.env.VITE_API_URL as string;
