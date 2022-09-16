export function date(time: string) {
  const datePost = new Date(parseInt(time, 10));
  const dateNow = new Date();
  const months: {} = {
    "0": "January",
    "1": "February",
    "2": "March",
    "3": "April",
    "4": "May",
    "5": "June",
    "6": "July",
    "7": "August",
    "8": "September",
    "9": "October",
    "10": "November",
    "11": "December",
  };

  const yearDif = dateNow.getFullYear() - datePost.getFullYear();
  if (yearDif === 0) {
    const dayDif = dateNow.getDay() - datePost.getDay();
    if (dayDif === 0) {
      const hoursDif = dateNow.getHours() - datePost.getHours();
      if (hoursDif === 0) {
        const minuteDif = dateNow.getMinutes() - datePost.getMinutes();
        if (minuteDif < 1) return "1 минуту назад";
        if (minuteDif < 5) return "5 минут назад";
        if (minuteDif < 10) return "10 минут назад";
        return "30 минут назад";
      }
      return `${datePost.getHours()}:${datePost.getMinutes()}`;
    }
    return `${datePost.getDay()} ${
      months[datePost.getMonth() as keyof typeof months]
    }`;
  }

  return `${datePost.getDay()} ${
    months[datePost.getMonth() as keyof typeof months]
  } ${datePost.getFullYear()}`;
}
