export default {
    get() {
        return JSON.parse(localStorage.getItem('SinhViens')) || [];
    },
    set(SinhViens) {
        return localStorage.setItem('SinhViens', JSON.stringify(SinhViens))
    }
}
