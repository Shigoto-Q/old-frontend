const formatCron = (cron: Crontab): DropdownElement => {
    return {
        value: [
            cron.minute,
            cron.hour,
            cron.day_of_month,
            cron.month,
            cron.month_of_year,
        ].join(" "),
        id: cron.id,
    };
}


export default formatCron;