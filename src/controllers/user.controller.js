import UserService from "../service/user.service.js";
import { ApiError, ApiResponse } from "../utils/api.utils.js";

class UserController {
    userService;
    constructor() {
        this.userService = new UserService();
    }

    register = async (req, res) => {
        try {
            const { name, email, password, phone, role } = req.body;
            if (!name || !email || !password) {
                return res
                    .status(400)
                    .json(new ApiError("All fields are required", 400));
            }
            const response = await this.userService.register({
                name,
                email,
                password,
                phone: phone || null,
                role,
            });
            return res
                .status(201)
                .cookie("token", response.token, {
                    httpOnly: true,
                    sameSite: "lax",
                    secure: process.env.NODE_ENV === "production",
                })
                .json(
                    new ApiResponse(
                        true,
                        "User registered successfully",
                        201,
                        response.user
                    )
                );
        } catch (error) {
            return res
                .status(error.status || 500)
                .json(new ApiError(error.message, error.status || 500));
        }
    };

    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res
                    .status(400)
                    .json(new ApiError("Email and password are required", 400));
            }
            const result = await this.userService.login(email, password);
            return res
                .status(200)
                .cookie("token", result.token, {
                    httpOnly: true,
                    sameSite: "lax",
                    secure: process.env.NODE_ENV === "production",
                })
                .json(new ApiResponse(true, "Login successful", 200, result));
        } catch (error) {
            return res
                .status(error.status || 500)
                .json(new ApiError(error.message, error.status || 500));
        }
    };

    logout = async (req, res) => {
        try {
            res.clearCookie("token", {
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
            });
            return res
                .status(200)
                .json(new ApiResponse(true, "Logout successful", 200));
        } catch (error) {
            return res.status(500).json(new ApiError(error.message, 500));
        }
    };

    adminLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res
                    .status(400)
                    .json(new ApiError("Email and password are required", 400));
            }

            const result = await this.userService.adminLogin(email, password);
            console.log(result);

            return res
                .status(200)
                .cookie("token", result.token, {
                    httpOnly: true,
                    sameSite: "lax",
                    secure: process.env.NODE_ENV === "production",
                })
                .json(new ApiResponse(true, "Login successful", 200, result));
        } catch (error) {
            return res
                .status(error.status || 500)
                .json(new ApiError(error.message, error.status || 500));
        }
    };

    adminLogout = async (req, res) => {
        try {
            res.clearCookie("token", {
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
            });
            return res
                .status(200)
                .json(new ApiResponse(true, "Logout successful", 200));
        } catch (error) {
            return res.status(500).json(new ApiError(error.message, 500));
        }
    };
}

export default UserController;
