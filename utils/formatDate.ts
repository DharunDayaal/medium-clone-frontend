export function formatDate(date: Date | string): string {

    const validDate = new Date(date)
    const now = new Date();
    const seconds = Math.floor((now.getTime() - validDate.getTime()) / 1000);

    const intervals: { [key: string]: number } = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    for(const unit in intervals) {
        const intervalValue = intervals[unit]
        const count = Math.floor(seconds / intervalValue)

        if(count >= 1) {

            // The unit variable is type of string so we need to cast it to keyof typeof  intervals to access it safely
            const intervalUnit = unit as keyof typeof intervals;

            if(count > 1) {
                return `${count} ${intervalUnit}s ago`
            }
            else {
                return `${count} ${intervalUnit} ago`
            }
        }
    }
    return "Just now"
}