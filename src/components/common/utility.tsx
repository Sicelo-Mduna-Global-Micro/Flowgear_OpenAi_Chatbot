import _ from "lodash";

export function formatCurrency(
  number: number,
  locale: string = "en-ZA",
  currency: string = "ZAR"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  })
    .format(number)
    .toString();
}
export function formatAmount(number: string) {
  return Number(number).toFixed(2);
}
export function formatDate(date: string | number | Date) {
  return new Date(date).toLocaleDateString("en-ZA");
}

export function formatDateTime(date: string | number | Date) {
  return new Date(date).toLocaleString("en-ZA");
}

export function renderPaging(CurrentPage: number, Pages: number, onClick: any) {
  let pageButtons: Array<React.ReactElement> = [];
  if (Pages > 1) {
    for (let i = 1; i <= Pages; i++) {
      pageButtons.push(
        <li
          key={i}
          className={CurrentPage === i ? " page-item active" : "page-item"}
          onClick={onClick}
          value={i}
        >
          <a className="page-link" role="button">
            {i}
          </a>
        </li>
      );
    }
  }
  return pageButtons;
}

export function paginate(items: any, pageNumber: number, pageSize: number) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}

export function renderStatus(status: string) {
  switch (status) {
    case "succeeded":
      return (
        <span title="Last run succeeded">
          <svg
            height="16"
            role="img"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="8" fill="#60a165"></circle>
            <path
              d="M6.062 11.144l-.003-.002-1.784-1.785A.937.937 0 1 1 5.6 8.031l1.125 1.124 3.88-3.88A.937.937 0 1 1 11.931 6.6l-4.54 4.54-.004.004a.938.938 0 0 1-1.325 0z"
              fill="#fff"
            ></path>
          </svg>
        </span>
      );
    case "failed":
      return (
        <span title="Last run failed">
          <svg
            height="16"
            role="img"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="8" fill="#c45149"></circle>
            <path
              d="M10.984 5.004a.9.9 0 0 1 0 1.272L9.27 7.99l1.74 1.741a.9.9 0 1 1-1.272 1.273l-1.74-1.741-1.742 1.74a.9.9 0 1 1-1.272-1.272l1.74-1.74-1.713-1.714a.9.9 0 0 1 1.273-1.273l1.713 1.713 1.714-1.713a.9.9 0 0 1 1.273 0z"
              fill="#fff"
            ></path>
          </svg>
        </span>
      );
    case "inProgress":
      return (
        <span title="Running...">
          <svg
            className="status-inprogress"
            height="16"
            role="img"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="8" fill="#2f77d0"></circle>
            <path
              d="M4.75 8a3.25 3.25 0 0 1 1.917-2.965c.33-.148.583-.453.583-.814 0-.479-.432-.848-.881-.683A4.752 4.752 0 0 0 3.29 8.62c.064.49.616.697 1.043.45.303-.175.443-.528.423-.877A3.304 3.304 0 0 1 4.75 8zm6.5 0c0 .065-.002.13-.006.194-.02.349.12.702.422.877.428.247.98.04 1.044-.45a4.752 4.752 0 0 0-3.078-5.084c-.45-.164-.882.205-.882.684 0 .36.253.666.583.814A3.25 3.25 0 0 1 11.25 8zM8 11.25c.758 0 1.455-.26 2.008-.694.293-.23.696-.31 1.019-.123.402.233.51.77.167 1.083A4.733 4.733 0 0 1 8 12.75c-1.23 0-2.35-.467-3.194-1.234-.344-.312-.235-.85.168-1.083.322-.186.725-.108 1.018.123.553.435 1.25.694 2.008.694z"
              fill="#fff"
            ></path>
          </svg>
        </span>
      );
    case "canceled":
      return (
        <span title="Last run canceled">
          <svg
            height="16"
            role="img"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="7" fill="#fff"></circle>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-1.5 0a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0zM6.41 5.124a.9.9 0 1 0-1.274 1.272l4.385 4.385a.9.9 0 1 0 1.272-1.273L6.41 5.124z"
            ></path>
          </svg>
        </span>
      );
    case "loading":
      return (
        <span title="loading">
          <svg
            height="16"
            role="img"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            className="status-loading"
          >
            <circle cx="8" cy="8" r="8"></circle>
          </svg>
        </span>
      );

    default:
      return (
        <span title="Last run status unknown or never run">
          <svg
            height="16"
            role="img"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="8" fill="#444"></circle>
          </svg>
        </span>
      );
  }
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function openBlobDownloadUrl(blob: Blob, fileName: string) {

  var url = window.URL.createObjectURL(blob);

  // from https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link
  // this hack enables us to set a file name as there is no way to do that via createObjectURL
  var a = document.createElement("a");
  document.body.append(a);
  (a as any).style = "display:none";
  a.download = fileName;
  a.href = url;
  a.click();
  window.URL.revokeObjectURL(url);
}