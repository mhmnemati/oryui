import kratosClient from "@ory/kratos-client";
import hydraClient from "@ory/hydra-client";

export const kratos = new kratosClient.V0alpha2Api();
export const hydra = new hydraClient.AdminApi();
