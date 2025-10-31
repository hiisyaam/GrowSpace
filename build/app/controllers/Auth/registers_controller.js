import User from '#models/user';
import vine from '@vinejs/vine';
import { errors } from '@vinejs/vine';
export default class RegistersController {
    index({ view }) {
        return view.render('auth/register');
    }
    async store({ request, session, response }) {
        try {
            const registerSchema = vine.compile(vine.object({
                name: vine.string().trim(),
                email: vine
                    .string()
                    .trim()
                    .email()
                    .unique(async (db, value) => {
                    const user = await db.from('users').where('email', value).first();
                    return !user;
                }),
                password: vine.string().trim().minLength(6),
            }));
            const data = await registerSchema.validate(request.all());
            await User.create(data);
            session.flash({ success: 'Register Berhasil!' });
            return response.redirect().back();
        }
        catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                session.flash({ errors: error.messages });
                return response.redirect().back();
            }
            session.flash({ error: 'Terjadi kesalahan saat registrasi.' });
            return response.redirect().back();
        }
    }
}
//# sourceMappingURL=registers_controller.js.map