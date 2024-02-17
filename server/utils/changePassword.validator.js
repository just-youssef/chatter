import Ajv from "ajv";
import ajvErrors from "ajv-errors";

const ajv = new Ajv({ allErrors: true, $data: true });
ajvErrors(ajv);

const schema = {
    type: "object",
    properties: {
        old_password: { type: "string" },
        new_password: { type: "string", pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$" },
        confirm_new_password: { type: "string", const: { $data: "1/new_password" } },
    },
    required: ["old_password", 'new_password',"confirm_new_password"],
    errorMessage: {
        properties: {
            new_password: 'new password is not valid',
            confirm_new_password: "must match with password",
        },
    },
}

export default ajv.compile(schema);