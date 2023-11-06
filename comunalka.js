// Добрий ранок
// За Жовтень
// Вода 310грн.
// Інтернет 248грн.
// Електроенергія: (день)2046 - 1970  = 76 х 1,68= 127,68грн
// (ніч) 590 - 568,8  = 21,2 х 0,84 = 17,8грн
// Усього за світло: 145грн.
// Всього = 703грн.
const englishToUkrainianMonths = {
  January: "Січень",
  February: "Лютий",
  March: "Березень",
  April: "Квітень",
  May: "Травень",
  June: "Червень",
  July: "Липень",
  August: "Серпень",
  September: "Вересень",
  October: "Жовтень",
  November: "Листопад",
  December: "Грудень",
};
const currentDate = new Date();
const hours = currentDate.getHours();
const englishMonth = currentDate.toLocaleString("en", { month: "long" });

let comunalka = {
  water: 310,
  internet: 248,
  cofDay: 1.68,
  cofNight: 0.84,
  whatTimeOfTheDay() {
    if (hours >= 4 && hours <= 11) {
      return "Ранок";
    } else if (hours >= 12 && hours <= 16) {
      return "День";
    }
    return "Вечір";
  },
  whatMonth() {
    const englishMonth = currentDate.toLocaleString("en", { month: "long" });
    return englishToUkrainianMonths[englishMonth];
  },
  summary(newDay, oldDay, newNight, oldNight, resultField) {
    let dayDiff = (newDay - oldDay).toFixed(1);
    let nightDiff = (newNight - oldNight).toFixed(1);
    let dayWithCoff = parseFloat(dayDiff * this.cofDay).toFixed(1);
    let nightWithCoff = parseFloat(nightDiff * this.cofNight).toFixed(1);
    let allForLight = Math.round(Number(dayWithCoff) + Number(nightWithCoff));
    let forEverything = Math.round(this.water + this.internet + allForLight);
    resultField.innerHTML = `
    Добрий ${this.whatTimeOfTheDay()}<br>
    За ${this.whatMonth()}<br>
    Вода ${this.water}грн.<br>
    Інтернет ${this.internet}грн.<br>
    Електроенергія: (день)${newDay} - ${oldDay} = ${dayDiff} * ${
      this.cofDay
    } = ${dayWithCoff}грн<br>
    (ніч) ${newNight} - ${oldNight}  = ${nightDiff} * ${
      this.cofNight
    } = ${nightWithCoff}грн<br>
    Усього за світло: ${allForLight}грн.<br>
    Всього = ${forEverything}грн.`;
  },
};
const resultMessage = document.querySelector(".result-message");
const button = document.getElementById("submitButton");
button.addEventListener("click", () => {
  const newDayIndicator = document.getElementById("newDayIndicators").value;
  const oldDayIndicator = document.getElementById("oldDayIndicators").value;
  const newNightIndicator = document.getElementById("newNightIndicators").value;
  const oldNightIndicator = document.getElementById("oldNightIndicators").value;

  comunalka.summary(
    newDayIndicator,
    oldDayIndicator,
    newNightIndicator,
    oldNightIndicator,
    resultMessage
  );
});
