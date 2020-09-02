module.exports = {
    hostname: '127.0.0.1',
    port : 8030,
    getError(number) {
        const error = {
            404: 'Đường dẫn không tồn tại',
            4907: 'Lỗi SQL',
            4301: 'Tên tài khoản không tồn tại',
            4302: 'Tên tài khoản đã tồn tại',
            '4901': 'Mã hóa mật khẩu không thành công',
            4903: 'So sánh mật khẩu không đúng',
            '4902': 'Giải mã mật khẩu không thành công',
            '4904': 'Tạo mã token không thành công',
        }
        return {
            code: number,
            message: error[number]
        }
    },
    secretCode: 'secret',
    tokenLife: '15 days',
    saltRounds: 10,
}
