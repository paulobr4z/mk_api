export interface ICharacter {
  _id: string;
  name: string;
  real_name: string;
  bio: string;
  gender: string;
  origin: string;
  species: string[];
  weapons: string;
  fighting_styles: string[];
  image: string;
  fatalities: string[];
}

export interface IPagination {
  limit: String | Number;
  offset: String | Number;
}