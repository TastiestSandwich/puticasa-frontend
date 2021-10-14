
export interface Resident {
  id: number,
  user: number,
  house: number,
  type: number,
  status: 1,
  last_modified_date: string,
  start_date: string,
  end_date: string | null
}

export interface House {
  name: string,
  description: string,
  status: number,
  start_date: string,
  last_modified_date: string,
  end_date: string | null
}