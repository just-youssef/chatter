import Ajv from "ajv";
import ajvErrors from "ajv-errors";

const ajv = new Ajv({ allErrors: true, $data: true });
ajvErrors(ajv);

const schema = {
    type: "object",
    properties: {
        first_name: { type: "string", minLength: 3 },
        last_name: { type: "string", minLength: 3 },
        email: { type: "string", pattern: "^.+\@.+\..+$" },
        password: { type: "string", pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$" },
        confirm_password: { type: "string", const: { $data: "1/password" } },

    },
    errorMessage: {
        properties: {
            first_name: "first name is too short",
            last_name: "last name is too short",
            email: "email is not valid",
            password: 'password is not valid',
            confirm_password: "must match with password",
        },
    },
}

export default ajv.compile(schema);