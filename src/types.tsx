type Crontab = {
    id: number, 
    minute: string
    hour: string, 
    day_of_month: string,
    month: string,
    month_of_year: string,
}

type DropdownElement = {
    id: number,
    value: string,
    name?: string
}