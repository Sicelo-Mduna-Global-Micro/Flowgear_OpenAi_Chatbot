import { openBlobDownloadUrl } from "components/common/utility";
import config from "config";
import { Flowgear } from "flowgear-webapp";

export module reportService {
  export const getCompliantTenantCount = async () => {
    try {
      let url = `${config.baseUrl}Reports/TenantCompliance/Total`;
      if (process.env.NODE_ENV === "development") {
        url = `${config.baseUrlDev}Reports/TenantCompliance/Total`;
      }
      const response = await Flowgear.Sdk.invoke<any>("GET", url);
      return response;
    } catch (ex: any) {
      console.log("API call failed!", ex);
      Flowgear.Sdk.setAlert(
        ex.message,
        Flowgear.Sdk.AlertMessageTypes.Error,
        Flowgear.Sdk.AlertDismissOptions.Auto
      );
    }
  };

  export const downloadExcelReport = async (key: string) => {
    try {
      let url = `${config.baseUrl}Reports/DownloadExcelReport?key=${key}`;
      if (process.env.NODE_ENV === "development") {
        url = `${config.baseUrlDev}Reports/DownloadExcelReport?key=${key}`;
      }
      const blobData = await Flowgear.Sdk.invoke<any>("GET", url);
      openBlobDownloadUrl(new Blob([blobData]), "Report.xlsx");
    } catch (ex: any) {
      console.log("API call failed!", ex);
      Flowgear.Sdk.setAlert(
        ex.message,
        Flowgear.Sdk.AlertMessageTypes.Error,
        Flowgear.Sdk.AlertDismissOptions.Auto
      );
    }
  };

  export const createExcelReport = async (data: any) => {
    try {
      let url = `${config.baseUrl}Reports/CreateExcelReport`;
      if (process.env.NODE_ENV === "development") {
        url = `${config.baseUrlDev}Reports/CreateExcelReport`;
      }
      const response = await Flowgear.Sdk.invoke<any>(
        "POST",
        url,
        JSON.stringify(data),
        { "Content-Type": "application/json" }
      );
      return response;
    } catch (ex: any) {
      console.log("API call failed!", ex);
      Flowgear.Sdk.setAlert(
        ex.message,
        Flowgear.Sdk.AlertMessageTypes.Error,
        Flowgear.Sdk.AlertDismissOptions.Auto
      );
    }
  };
}
