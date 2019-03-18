export class Photo {
  public id: string;
  public created_at: Date;
  public updated_at: Date;
  public width: number;
  public height: number;
  public color: string;
  public description: string;
  public urls: Urls;
  public links: Links;
  public categories: string[];
  public sponsored: boolean;
  public sponsored_by: string;
  public sponsored_impressions_id: string;
  public likes: number;
  public liked_by_user: boolean;
  public current_user_collections: string[];
  public user: User;
}

export class Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export class Links {
  self: string;
  html: string;
  download: string;
  download_location: string;
  portfolio: string;
}

export class User {
  username: string;
  first_name: string;
  last_name: string;
  name: string;
  links: Links;
}
