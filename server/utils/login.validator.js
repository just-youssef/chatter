import Ajv from "ajv";
import ajvErrors from "ajv-errors";

const ajv = new Ajv({ allErrors: true, $data: true });
ajvErrors(ajv);

const schema = {
    type: "object",
    properties: {
        email: { type: "string", pattern: "^.+\@.+\..+$" },
        password: { type: "string", minLength: 5 },
    },
    required: ["email", "password"],
    errorMessage: {
        properties: {
            email: "email is not valid",
            password: 'password is too short',
        },
    },
}

export default ajv.compile(schema);