import {
  AttributeIds,
  MessageSecurityMode,
  OPCUAClient,
  SecurityPolicy,
  UserTokenType,
} from "node-opcua-client";

export async function getSteelcoChemData() {
  const connectionStrategy = {
    initialDelay: 1000,
    maxRetry: 1,
  };

  const options = {
    applicationName: "SteelcoChemClient",
    connectionStrategy: connectionStrategy,
    securityMode: MessageSecurityMode.None,
    securityPolicy: SecurityPolicy.None,
    endpointMustExist: false,
  };

  const client = OPCUAClient.create(options);

  const endpointUrl = process.env.STEELCO_CHEM_ENDPOINT;
  const steelcoChemRootNodeId = "ns=6;s=::SteelcoDat:steelcoData";
  const maxAge = 0; // https://reference.opcfoundation.org/Core/Part4/v104/docs/5.10.2 is this important?

  await client.connect(endpointUrl || "");
  console.log("connected !");

  const session = await client.createSession({
    userName: process.env.STEELCO_CHEM_USERNAME || "",
    password: process.env.STEELCO_CHEM_PASSWORD || "",
    type: UserTokenType.UserName,
  });
  console.log("session created !");

  const readResult = await session.read(
    {
      nodeId: steelcoChemRootNodeId,
      attributeId: AttributeIds.Value,
    },
    maxAge
  );

  //   console.log(
  //     "pumpStationCount:",
  //     readResult.value.value.configuration.pumpStationCount
  //   );

  await client.disconnect();
  console.log("done !");

  return readResult.value.value;
}
