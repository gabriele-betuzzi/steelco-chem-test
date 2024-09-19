import { AttributeIds, MessageSecurityMode, OPCUAClient, SecurityPolicy, UserTokenType } from 'node-opcua-client';
import express from 'express'
import { getSteelcoChemData } from './src/steelco-chem.service.js'

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.status(200).send('Server OK!')
})

app.get('/steelco-chem', async (req, res) => {
    const data = await getSteelcoChemData()
    res.status(200).json(data)
})

app.listen(port, () => {
    console.log('App is listening on port', port)
})

/*
(async async => {
    console.log('Hello')

    const connectionStrategy = {
        initialDelay: 1000,
        maxRetry: 1
    }

    const options = {
        applicationName: "SteelcoChemClient",
        connectionStrategy: connectionStrategy,
        securityMode: MessageSecurityMode.None,
        securityPolicy: SecurityPolicy.None,
        endpointMustExist: false,
    };

    const client = OPCUAClient.create(options);

    const endpointUrl = "opc.tcp://10.0.80.125:4840";
    const steelcoChemRootNodeId = 'ns=6;s=::SteelcoDat:steelcoData'
    const maxAge = 0; // https://reference.opcfoundation.org/Core/Part4/v104/docs/5.10.2 is this important?

    await client.connect(endpointUrl);
    console.log("connected !");

    const session = await client.createSession({
        userName: "SteelcoData",
        password: "St33lc0d4t4",
        type: UserTokenType.UserName,
    });
    console.log("session created !");

    const readResult = await session.read({
        nodeId: steelcoChemRootNodeId,
        attributeId: AttributeIds.Value
    }, maxAge)

    console.log('pumpStationCount:', readResult.value.value.configuration.pumpStationCount)

    await client.disconnect();
    console.log("done !");
})()

setInterval(() => {
    // pass
}, 1000)
*/