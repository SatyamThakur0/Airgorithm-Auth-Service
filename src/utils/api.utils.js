export class ApiResponse {
    data;
    message;
    ok;
    status;
    constructor(ok = true, message = "success", status = 200, data = null) {
        this.data = data;
        this.message = message;
        this.status = status;
        this.ok = ok;
    }

    toJSON = () => {
        return {
            ok: this.ok,
            data: this.data,
            status: this.status,
            message: this.message,
        };
    };
}

export class ApiError extends Error {
    status;
    stack;
    errors;
    message;
    constructor(
        message = "Something went wrong",
        status = 500,
        errors = [],
        stack = ""
    ) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON = () => {
        return {
            ok: false,
            message: this.message,
            errors: this.errors,
            status: this.status,
        };
    };
}
