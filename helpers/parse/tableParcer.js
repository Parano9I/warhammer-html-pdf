module.exports = tableNode => {
  const headers = tableNode.querySelectorAll('th');
  const rows = tableNode.querySelectorAll('tr');

  const result = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.querySelectorAll('td');

    const rowData = {};

    for (let j = 0; j < headers.length; j++) {
      const header = headers[j].text.trim().toLowerCase();
      const cell = cells[j].text.trim();

      rowData[header] = cell;
    }

    result.push(rowData);
  }

  return result;
};
