export interface SpotifyUser {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: [];
  type: string;
  uri: string;
  followers: { href: string; total: number };
  email: string;
}
