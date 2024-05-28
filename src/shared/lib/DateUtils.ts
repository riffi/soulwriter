import moment from "moment";
import 'moment/dist/locale/ru';

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

    const isNegative = dayCount < 0

    const data = daysToCalendarInterval(Math.abs(dayCount))
    let result = isNegative ? '-' : ''
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

export const getAbsoluteDate = (dateStart: string, dayCount: number) => {
    const date = moment(dateStart, 'DD.MM.YYYY').locale("ru")
    date.add(dayCount - 1, "days")
    return date.format('DD MMMM YYYY')
}
