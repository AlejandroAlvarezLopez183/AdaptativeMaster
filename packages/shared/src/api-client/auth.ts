import { apiFetch } from "./index";

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UserResponse {
  id: string;
  email: string;
  nombre: string;
  rol: string;
  created_at: string;
}

export const auth = {
  async login(email: string, password: string): Promise<TokenResponse> {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    return apiFetch<TokenResponse>("/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });
  },

  async register(nombre: string, email: string, password: string): Promise<UserResponse> {
    return apiFetch<UserResponse>("/usuarios/registro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email, password }),
    });
  },

  async getMe(token: string): Promise<UserResponse> {
    return apiFetch<UserResponse>("/usuarios/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  }
};
