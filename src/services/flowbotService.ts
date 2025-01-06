//flowbotServices.ts

import config from "config"; // Import config for base URLs or any configuration
import { Flowgear } from "flowgear-webapp"; // Import Flowgear SDK

// OpenAI Integration Module
export module OpenAIIntegration {
  const deploymentName = config.apiDeploymentName; // Update as needed
  const endpoint = config.flowgearEndpoint; // Update as needed
  const apiKey = config.apiKey; 
  // Use environment variable for API key, ensure to set it

  if (!apiKey) {
    throw new Error("An API key must be provided to invoke the endpoint");
  }

  // Helper function to get headers for API call
  const getHeaders = () => ({
    "Content-Type": "application/json",
    // Authorization: `Bearer ${apiKey}`,
    // "azureml-model-deployment": deploymentName,
  });

  export const sendMessageToOpenAI = async (data: any): Promise<any> => {
    try {
      const response = await Flowgear.Sdk.invoke<any>(
        "POST", // HTTP method
        endpoint, // OpenAI endpoint for message processing
        JSON.stringify(data), // Payload to send (your message data)
        getHeaders() // Headers including the Authorization token and deployment name
      );
      return response;
    } catch (ex: any) {
      console.error("OpenAI API call failed!", ex);
      Flowgear.Sdk.setAlert(
        ex.message,
        Flowgear.Sdk.AlertMessageTypes.Error,
        Flowgear.Sdk.AlertDismissOptions.Auto
      );
      throw new Error("Failed to call OpenAI API: " + ex.message);
    }
  };

  // Function to send message to OpenAI via a direct fetch call
  // export const sendMessageToOpenAI = async (data: any): Promise<any> => {
  //   try {
  //     // Fetch call to OpenAI API
  //     const response = await fetch(endpoint, {
  //       method: "POST",
  //       headers: getHeaders(),
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`OpenAI API call failed: ${response.statusText}`);
  //     }

  //     // Parse the response as JSON
  //     const result = await response.json();
  //     return result;
  //   } catch (ex: any) {
  //     console.error("OpenAI API call failed!", ex);
  
  //     // Optionally show error alert using Flowgear SDK
  //     Flowgear.Sdk.setAlert(
  //       ex.message,
  //       Flowgear.Sdk.AlertMessageTypes.Error,
  //       Flowgear.Sdk.AlertDismissOptions.Auto
  //     );

  //     throw new Error("Failed to call OpenAI API: " + ex.message); // Throw error to be handled downstream
  //   }
  // };

}

// Export the OpenAIIntegration to use elsewhere in the application
export default OpenAIIntegration;
