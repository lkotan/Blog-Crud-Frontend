const inputValidation = {
    required: [
        v => !!v || 'Zorunlu alan.',
    ],
    email: [
        v => /.+@.+/.test(v) || 'E-Posta adresi doğru değil',
    ],
    phone: [
        v => (v != undefined ? v.replace(/\(/g,'').replace(/\-/g,'').replace(/\)/g,'').length==10 : "") || 'Telefon alanı 10 haneden oluşmalıdır',
    ],
}
export {
    inputValidation,
};