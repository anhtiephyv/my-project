import { isEmail, isEmpty } from 'validator';
import React from 'react';
export const required = (value) => {
    if (isEmpty(value)) {
        return <small className="form-text text-danger">Trường này là bắt buộc</small>;
    }
}

export const email = (value) => {
    if (!isEmail(value)) {
        return <small className="form-text text-danger">Email không hợp lệ</small>;
    }
}

export const minLength = min => value => {
    if (value.trim().length < min) {
        return <small className="form-text text-danger">Số ký tự phải lớn hơn {min}</small>;
    }
}