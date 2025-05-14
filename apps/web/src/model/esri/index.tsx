export type EsriSeason = '' | 'Spring' | 'Summer' | 'Fall' | 'Winter';

export const seasonOptions: EsriSeason[] = ['', 'Spring', 'Summer', 'Fall', 'Winter'];

export const isAllSeasons = (season: EsriSeason): boolean => season === '';

export const esriOutFields = ['PD_ID', 'Crop_Name', 'Volume_kg', 'Season', 'Country', 'Province'];

export interface EsriData {
  PD_ID: string;
  Crop_Name: string;
  Volume_kg: number;
  Country: string;
  Season: EsriSeason;
  Province: string;
}
