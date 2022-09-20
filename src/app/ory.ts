import * as kratosClient from "@ory/kratos-client";
import * as hydraClient from "@ory/hydra-client";

export const kratos = new kratosClient.V0alpha2Api(
    new kratosClient.Configuration({
        basePath: process.env.KRATOS_URL,
    })
);
export const hydra = new hydraClient.AdminApi();
