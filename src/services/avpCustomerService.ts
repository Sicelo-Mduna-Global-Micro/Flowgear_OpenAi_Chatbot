import config from "config";
import { Flowgear } from "flowgear-webapp";

export module avpCustomerService {
  export const loadAvpCustomers = async () => {
    try {
      let url = `${config.baseUrl}GetAPOSCustomers`;
      if (process.env.NODE_ENV === "development") {
        url = `${config.baseUrlDev}GetAPOSCustomers`;
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

  export const loadAvpCustomerSubscriptions = async (
    company_id: string | number
  ) => {
    try {
      let url = `${config.baseUrl}GetAgreementsForCustomer?CompanyID=${company_id}`;
      if (process.env.NODE_ENV === "development") {
        url = `${config.baseUrlDev}GetAgreementsForCustomer?CompanyID=${company_id}`;
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

  export const loadAvpSkus = async () => {
    try {
      let url = `${config.baseUrl}GetSkusForAPOS`;
      if (process.env.NODE_ENV === "development") {
        url = `${config.baseUrlDev}GetSkusForAPOS`;
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

  export const addAvePointCustomer = async (customer_id: string) => {
    try {
      let url = `${config.baseUrl}AddAPOSCustomer`;
      if (process.env.NODE_ENV === "development") {
        url = `${config.baseUrlDev}AddAPOSCustomer`;
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
        "AvePoint customer added.",
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

  export const addAvePointSubscription = async (data: {}) => {
    try {
      let url = `${config.baseUrl}AddAPOSSubscription`;
      if (process.env.NODE_ENV === "development") {
        url = `${config.baseUrlDev}AddAPOSSubscription`;
      }

      const response = await Flowgear.Sdk.invoke<any>(
        "POST",
        url,
        JSON.stringify(data),
        { "Content-Type": "application/json" }
      );
      Flowgear.Sdk.setAlert(
        "AvePoint subscription added.",
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

  export const editAvePointSubscription = async (data: {}) => {
    try {
      let url = `${config.baseUrl}UpdateAPOSQuantity`;
      if (process.env.NODE_ENV === "development") {
        url = `${config.baseUrlDev}UpdateAPOSQuantity`;
      }
      const response = await Flowgear.Sdk.invoke<any>(
        "POST",
        url,
        JSON.stringify(data),
        { "Content-Type": "application/json" }
      );
      Flowgear.Sdk.setAlert(
        "AvePoint subscription edited.",
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

  export const cancelAvpCustomerSubscription = async (data: {}) => {
    try {
      let url = `${config.baseUrl}CancelAPOSSubscription`;
      if (process.env.NODE_ENV === "development") {
        url = `${config.baseUrlDev}CancelAPOSSubscription`;
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
