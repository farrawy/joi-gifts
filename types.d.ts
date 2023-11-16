// User Type

export interface User {
  name: string;
  date: string;
  time: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    building: string;
    floor: string;
    door: string;
    instructions?: string;
  };
  isCompleted: boolean;
}
