export default class config {
  static baseUrl: string = "https://globalmicro.flowgear.net/";
  static baseUrlDev: string = "https://globalmicro-dev-globetra.flowgear.net/";
  // static adminAccounts: string[] = [
  //   "wayne.sachar@globalmicro.co.za",
  //   "brad@globalmicro.co.za",
  //   "jj@globalmicro.co.za",
  //   "mc.sonnekus@globalmicro.co.za",
  //   "jethro.alter@globalmicro.co.za",
  //   "gareth.owen@globalmicro.co.za",
  // ];

  static adminCancellations: string[] = [
    //"wayne.sachar@globalmicro.co.za",
    "brad@globalmicro.co.za",
    "jj@globalmicro.co.za",
    //"mc.sonnekus@globalmicro.co.za",
    //"jethro.alter@globalmicro.co.za",
    //"gareth.owen@globalmicro.co.za",
  ];

  ///openAi config
  static flowgearEndpoint =
    "https://globalmicro-dev-globetra.flowgear.net/FlowbotPost";
  static apiEndpoint =
    "https://flowgear-chatbot-official.eastus.inference.ml.azure.com/score";
  static apiDeploymentName = "flowgear-chatbot-official-1";
  static apiKey = "SJsKL3T1Q7dfMes8V11AFI8MOnmiAlvc";
}
