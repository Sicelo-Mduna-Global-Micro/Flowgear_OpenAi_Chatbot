import config from "config";
import { Flowgear } from "flowgear-webapp";

export module userService {
    export const getLoggedInUser = async () => {
      try {
        let url = `${config.baseUrl}CurrentUser`;
        if (process.env.NODE_ENV === "development") {
          url = `${config.baseUrlDev}CurrentUser`;
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
}