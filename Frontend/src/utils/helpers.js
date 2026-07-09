export const generateAcademicYears = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); 
  const maxYear = currentMonth >= 5 ? currentYear : currentYear - 1;
  const years = [];
  for (let startYear = 2018; startYear <= maxYear + 1; startYear++) {
    years.push(`${startYear}-${startYear + 1}`);
  }
  return years.reverse();
};
