const { auth } = require('./auth/firebase');
const pool = require('./banco/bd');
const bcrypt = require('bcrypt');

// Registro de Usuário com Google
async function registerUserWithGoogle(idToken) {
    try {
        // Verifica o token de ID do Google e cria o usuário no Firebase
        const userCredential = await auth.signInWithCredential(credential);
        
        // Extrai informações do usuário
        const { uid, email, displayName } = userCredential.user;

        // Salva o usuário no MySQL
        const result = await pool.query(
            'INSERT INTO usuario (login_usuario, nome_usuario, email_usuario) VALUES (?, ?, ?)',
            [uid, displayName, email]
        );

        return {
            idusuario: result.insertId,
            nome_usuario: displayName,
            email_usuario: email,
            login_usuario: uid,
        };
    } catch (error) {
        throw new Error(`Erro ao registrar usuário: ${error.message}`);
    }
}

// Login de Usuário
async function loginUser(email_usuario, password) {
    try {
        // Encontra o usuário no MySQL
        const [rows] = await pool.query('SELECT * FROM usuario WHERE email_usuario = ?', [email_usuario]);
        const user = rows[0];

        if (!user) throw new Error('Usuário não encontrado');

        // Verifica a senha
        const match = await bcrypt.compare(password, user.senha_usuario);
        if (!match) throw new Error('Senha incorreta');

        return user;
    } catch (error) {
        throw new Error(`Erro ao fazer login: ${error.message}`);
    }
}

module.exports = { registerUserWithGoogle, loginUser };
