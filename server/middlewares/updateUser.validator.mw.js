import validator from "../utils/updateUser.validtor.js";

const UpdateUserValidatorMW =  (req, res, nxt) => {
    let valid = validator(req.body);

    if (!valid) {
        let error_messages = {}
        for (let error of validator.errors){
            error_messages[error.instancePath.split("/")[1]] = error.message
        }

        console.log(error_messages);
        return res.status(403).json({ error: error_messages });
    }

    req.valid = 1;
    nxt();
}

export default UpdateUserValidatorMW;