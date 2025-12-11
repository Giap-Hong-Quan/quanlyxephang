// trả về ở service hay controller khi có lỗi xảy ra
export default class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}