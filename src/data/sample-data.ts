export enum CampaignStatus {
  ON = 'on',
  OFF = 'off'
};

export interface Campaign {
  id: string;
  name: string;
  keywords: string[];
  bid: number;
  fund: number;
  status: CampaignStatus;
  town: string;
  radius: number;
}

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Kupujcie buty',
    keywords: ['buty', 'skarpety'],
    bid: 5,
    fund: 100,
    status: CampaignStatus.ON,
    town: 'Warszawa',
    radius: 10
  },
  {
    id: '2',
    name: 'Rowery',
    keywords: ['rower', 'narzędzia'],
    bid: 10,
    fund: 200,
    status: CampaignStatus.OFF,
    town: 'Kraków',
    radius: 20
  },
  {
    id: '3',
    name: 'Zabawa',
    keywords: ['zabawka', 'klocki', 'rower'],
    bid: 10,
    fund: 200,
    status: CampaignStatus.OFF,
    town: 'Kraków',
    radius: 20
  }
];
