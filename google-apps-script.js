const SHEET_NAME = "Ответы";

const HEADERS = [
  "server_received_at",
  "received_at_client",
  "selected_date",
  "selected_time",
  "selected_ice",
  "public_ip",
  "ip_lookup_error",
  "page_url",
  "referrer",
  "timezone",
  "timezone_offset_minutes",
  "language",
  "languages",
  "user_agent",
  "platform",
  "screen",
  "viewport",
  "device_pixel_ratio",
  "consent_notice",
  "raw_body",
  "parse_error",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const payload = parsePayload(e);
    const sheet = getSheet();

    ensureHeaders(sheet);

    const row = HEADERS.map((header) => {
      if (header === "server_received_at") {
        return new Date();
      }

      return payload[header] || "";
    });

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService
    .createTextOutput("Google Sheets endpoint is running")
    .setMimeType(ContentService.MimeType.TEXT);
}

function parsePayload(e) {
  const contents = e && e.postData && e.postData.contents
    ? e.postData.contents
    : "";

  if (!contents) {
    return {};
  }

  try {
    return JSON.parse(contents);
  } catch (err) {
    return {
      raw_body: contents,
      parse_error: err.message,
    };
  }
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

function ensureHeaders(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasHeaders = firstRow.some((cell) => cell !== "");

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}
