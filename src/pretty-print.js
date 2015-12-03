function toPercent(num) {
  return Math.round(num * 100);
}

module.exports = reports => {
  return reports.reduce((prev, report) => {
    var percent = toPercent(report.completion);
    var cur = `${report.title}: ${percent}%\n`;
    if (percent !== 100) {
      cur += report.langs.reduce((langs, lang) => {
        return langs + `  ${lang.title}: ${toPercent(lang.completion)}%\n`;
      }, '');
    }
    return prev + cur + '\n';
  }, '');
};
