export const daysToCalendarInterval = (days: number) => {
    const daysInYear = 365
    const daysInMonth = 30

    // Получаем количество полных лет
    const years = Math.floor(days / daysInYear)

    // Вычитаем дни, которые приходятся на полные годы
    days -= years  *  daysInYear

    // Получаем количество полных месяцев
    const months = Math.floor(days / daysInMonth)

    // Вычитаем дни, которые приходятся на полные месяцы
    days -= months  *  daysInMonth;


    // Возвращаем результат
    return {
        years: years,
        months: months,
        days
    };
}
export const humanizeDayValue = (dayCount?: number) => {
    if (!dayCount) return ''
    const data = daysToCalendarInterval(dayCount)
    let result = ''
    if (data.years > 0){
        result += `${data.years} год `
    }
    if (data.months > 0){
        result += `${data.months} месяц `
    }
    if (data.days > 0){
        result += `${data.days} день`
    }

    return result
}
