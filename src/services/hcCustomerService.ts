import config from "config";
import { Flowgear } from "flowgear-webapp";

export module hcCustomerService {
  export const loadHcPanelUsers = async () => {
    try {
      let url = `${config.baseUrl}HCPOS/PanelUsers`;
      if (process.env.NODE_ENV === "development") {
        url = `${config.baseUrlDev}HCPOS/PanelUsers`;
      }
      const response = await Flowgear.Sdk.invoke<any>("GET", url);
      return response.Result.Table;
    } catch (ex: any) {
      console.log("API call failed!", ex);
      Flowgear.Sdk.setAlert(
        ex.message,
        Flowgear.Sdk.AlertMessageTypes.Error,
        Flowgear.Sdk.AlertDismissOptions.Auto
      );
    }
  };

  export const loadHcCustomerProducts = async (id) => {
    try {
      let url = `${config.baseUrl}HCPOS/PanelUsers/Products/?PanelUserID=${id}`;
      if (process.env.NODE_ENV === "development") {
        url = `${config.baseUrlDev}HCPOS/PanelUsers/Products/?PanelUserID=${id}`;
      }
      const response = await Flowgear.Sdk.invoke<any>("GET", url);
      return response.plans.plan;
    } catch (ex: any) {
      console.log("API call failed!", ex);
      Flowgear.Sdk.setAlert(
        ex.message,
        Flowgear.Sdk.AlertMessageTypes.Error,
        Flowgear.Sdk.AlertDismissOptions.Auto
      );
    }
  };

  export const loadHcCustomerProductsUsage = async (id, type) => {
    try {
      let url = `${config.baseUrl}HCPOS/PanelUsers/Report/?PanelUserID=${id}&Type=${type}`;
      if (process.env.NODE_ENV === "development") {
        url = `${config.baseUrlDev}HCPOS/PanelUsers/Report/?PanelUserID=${id}&Type=${type}`;
      }
      const response = await Flowgear.Sdk.invoke<any>("GET", url);
      return response.ReportResources;
    } catch (ex: any) {
      console.log("API call failed!", ex);
      Flowgear.Sdk.setAlert(
        ex.message,
        Flowgear.Sdk.AlertMessageTypes.Error,
        Flowgear.Sdk.AlertDismissOptions.Auto
      );
    }
  };

  export const addHcPanelUser = async (customer_id: string) => {
    try {
      let url = `${config.baseUrl}AddHCPanelUser`;
      if (process.env.NODE_ENV === "development") {
        url = `${config.baseUrlDev}AddHCPanelUser`;
      }
      const sendObject = {
        Company_ID: customer_id,
      };
      const response = await Flowgear.Sdk.invoke<any>(
        "POST",
        url,
        JSON.stringify(sendObject),
        { "Content-Type": "application/json" }
      );
      Flowgear.Sdk.setAlert(
        "Hosting Controller customer added.",
        Flowgear.Sdk.AlertMessageTypes.Success,
        Flowgear.Sdk.AlertDismissOptions.Auto
      );
    } catch (ex: any) {
      console.log("API call failed!", ex);
      Flowgear.Sdk.setAlert(
        ex.message,
        Flowgear.Sdk.AlertMessageTypes.Error,
        Flowgear.Sdk.AlertDismissOptions.Auto
      );
    }
  };

  export const loadConnectWiseCustomers = async () => {
    try {
      let url = `${config.baseUrl}GetCWCompanyForAPOS`;
      if (process.env.NODE_ENV === "development") {
        url = `${config.baseUrlDev}GetCWCompanyForAPOS`;
      }
      const response = await Flowgear.Sdk.invoke<any>("GET", url);
      return response.Result.Table;
    } catch (ex: any) {
      console.log("API call failed!", ex);
      Flowgear.Sdk.setAlert(
        ex.message,
        Flowgear.Sdk.AlertMessageTypes.Error,
        Flowgear.Sdk.AlertDismissOptions.Auto
      );
    }
  };

  export const loadConnectWiseCustomersForHC = async () => {
    try {
      let url = `${config.baseUrl}GetCWCompanyForHC`;
      if (process.env.NODE_ENV === "development") {
        url = `${config.baseUrlDev}GetCWCompanyForHC`;
      }
      const response = await Flowgear.Sdk.invoke<any>("GET", url);
      return response.Result.Table;
    } catch (ex: any) {
      console.log("API call failed!", ex);
      Flowgear.Sdk.setAlert(
        ex.message,
        Flowgear.Sdk.AlertMessageTypes.Error,
        Flowgear.Sdk.AlertDismissOptions.Auto
      );
    }
  };

  export const loadHcSkus = async (Username: string) => {
    try {
      let url = `${config.baseUrl}GetSkusForHC/?Username=${Username}`;
      if (process.env.NODE_ENV === "development") {
        url = `${config.baseUrlDev}GetSkusForHC/?Username=${Username}`;
      }
      const response = await Flowgear.Sdk.invoke<any>("GET", url);
      return response.Result.Table;
    } catch (ex: any) {
      console.log("API call failed!", ex);
      Flowgear.Sdk.setAlert(
        ex.message,
        Flowgear.Sdk.AlertMessageTypes.Error,
        Flowgear.Sdk.AlertDismissOptions.Auto
      );
    }
  };

  export const addHcProduct = async (data: {}) => {
    try {
      let url = `${config.baseUrl}AddHCProduct`;
      if (process.env.NODE_ENV === "development") {
        url = `${config.baseUrlDev}AddHCProduct`;
      }
      const response = await Flowgear.Sdk.invoke(
        "POST",
        url,
        JSON.stringify(data),
        { "Content-Type": "application/json" }
      );
      Flowgear.Sdk.setAlert(
        "Product added.",
        Flowgear.Sdk.AlertMessageTypes.Success,
        Flowgear.Sdk.AlertDismissOptions.Auto
      );
    } catch (ex: any) {
      console.log("API call failed!", ex);
      Flowgear.Sdk.setAlert(
        ex.message,
        Flowgear.Sdk.AlertMessageTypes.Error,
        Flowgear.Sdk.AlertDismissOptions.Auto
      );
    }
  };

  export const editHcProduct = async (type: string, data: {}) => {
    try {
      let url = "";
      let alertMessage = "";
      if (type === "addon") {
        url = `${config.baseUrl}EditHCAddon`;
        alertMessage = "Add-on modified.";
      } else {
        url = `${config.baseUrl}EditHCPlan`;
        alertMessage = "Plan modified.";
      }
      if (process.env.NODE_ENV === "development") {
        if (type === "addon") {
          url = `${config.baseUrlDev}EditHCAddon`;
        } else {
          url = `${config.baseUrlDev}EditHCPlan`;
        }
      }
      const response = await Flowgear.Sdk.invoke<any>(
        "PUT",
        url,
        JSON.stringify(data),
        { "Content-Type": "application/json" }
      );
      Flowgear.Sdk.setAlert(
        "Product modified.",
        Flowgear.Sdk.AlertMessageTypes.Success,
        Flowgear.Sdk.AlertDismissOptions.Auto
      );
    } catch (ex: any) {
      console.log("API call failed!", ex);
      Flowgear.Sdk.setAlert(
        ex.message,
        Flowgear.Sdk.AlertMessageTypes.Error,
        Flowgear.Sdk.AlertDismissOptions.Auto
      );
    }
  };

  export const cancelHcProduct = async (type: string, data: {}) => {
    try {
      let url = "";
      let alertMessage = "";
      if (type === "addon") {
        url = `${config.baseUrl}CancelHCAddon`;
        alertMessage = "Add-on cancelled.";
      } else {
        url = `${config.baseUrl}CancelHCPlan`;
        alertMessage = "Plan cancelled.";
      }
      if (process.env.NODE_ENV === "development") {
        if (type === "addon") {
          url = `${config.baseUrlDev}CancelHCAddon`;
        } else {
          url = `${config.baseUrlDev}CancelHCPlan`;
        }
      }
      const response = await Flowgear.Sdk.invoke<any>(
        "PUT",
        url,
        JSON.stringify(data),
        { "Content-Type": "application/json" }
      );
      Flowgear.Sdk.setAlert(
        alertMessage,
        Flowgear.Sdk.AlertMessageTypes.Success,
        Flowgear.Sdk.AlertDismissOptions.Auto
      );
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
