export interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
  onSocialLogin: (provider: SocialProvider) => void;
  isLoading?: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export type SocialProvider = "facebook" | "google" | "github";
