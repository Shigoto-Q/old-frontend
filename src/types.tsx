type Crontab = {
    id: number, 
    minute: string
    hour: string, 
    day_of_month: string,
    month_of_year: string,
    day_of_week: string,
}

type DropdownElement = {
    id: number,
    value: string,
    name?: string
}