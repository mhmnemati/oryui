import oryKratos from "@ory/kratos-client";
import oryHydra from "@ory/hydra-client";

export const kratos = new oryKratos.V0alpha2Api();
export const hydra = new oryHydra.AdminApi();
